import os
import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split


def load_and_prepare_data(hist_env: str, hist_fires: str):
	# load historical environmental and fire data
	historical_env = pd.read_csv(hist_env)
	historical_fires = pd.read_csv(hist_fires)
	
	# create a binary column for fire occurrence
	historical_env['fire_occurred'] = 0
	for _, fire in historical_fires.iterrows():
		# match environmental data with fire incidents based on location and time
		mask = (historical_env['timestamp'] == fire['timestamp']) & (historical_env['latitude'] == fire['latitude']) & (historical_env['longitude'] == fire['longitude'])
		historical_env.loc[mask, 'fire_occurred'] = 1
	
	return historical_env

def train_model(data):
	# define features for the model
	features = ['temperature', 'humidity', 'wind_speed', 'precipitation', 'vegetation_index', 'human_activity_index']
	X = data[features]
	y = data['fire_occurred']
	
	# split data into training and testing sets
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
	
	# standardize features to have zero mean and unit variance
	scaler = StandardScaler()
	X_train_scaled = scaler.fit_transform(X_train)
	X_test_scaled = scaler.transform(X_test)
	
	# initialize and train random forest classifier
	model = RandomForestClassifier(n_estimators=100, random_state=42)
	model.fit(X_train_scaled, y_train)
	
	# save model and scaler for future use
	joblib.dump(model, 'fire_prediction_model.joblib')
	joblib.dump(scaler, 'feature_scaler.joblib')
	
	# evaluate model performance
	y_pred = model.predict(X_test_scaled)
	print("\nModel Performance:")
	print(classification_report(y_test, y_pred))
	
	return model, scaler

def predict_future_fires(future_data, model, scaler):
	# select features for prediction
	features = ['temperature', 'humidity', 'wind_speed', 'precipitation', 'vegetation_index', 'human_activity_index']
	
	# standardize features using saved scaler
	X_future_scaled = scaler.transform(future_data[features])
	
	# get probability predictions for each location
	predictions = model.predict_proba(X_future_scaled)
	
	# identify high-risk locations using 0.5 probability threshold
	high_risk_mask = predictions[:, 1] >= 0.5
	high_risk_data = future_data[high_risk_mask].copy()
	high_risk_data['fire_risk'] = 1
	
	return high_risk_data[[
		'timestamp', 'temperature', 'humidity', 'wind_speed', 'precipitation', 'vegetation_index', 'human_activity_index', 'latitude', 'longitude', 'fire_risk'
	]]

def train(hist_env: str, hist_fires: str):
	try:
		# prepare data and train the model
		data = load_and_prepare_data(hist_env, hist_fires)
		train_model(data)
		
		print('Model trained successfully')
	except Exception as e:
		print(f"Error: {str(e)}")

def predict(future_env: str):
	try:
		# load saved model and scaler
		model = joblib.load('fire_prediction_model.joblib')
		scaler = joblib.load('feature_scaler.joblib')
		
		# load new data for predictions
		future_data = pd.read_csv(future_env)
		
		# generate and format predictions
		predictions = predict_future_fires(future_data, model, scaler)
	
		# add the original index as _id
		predictions['_id'] = predictions.index
	
		# convert to json with index-based _id and return
		return predictions.to_dict(orient='records')
	except Exception as e:
		print(f"Error: {str(e)}")

def main():
	# get saved file
	hist_env = os.path.join(os.path.dirname(__file__), 'uploads', 'historical_environmental_data.csv')
	hist_fires = os.path.join(os.path.dirname(__file__), 'uploads', 'historical_wildfiredata.csv')
	future_env = os.path.join(os.path.dirname(__file__), 'uploads', 'future_environmental_data.csv')
	
	train(hist_env, hist_fires)
	return predict(future_env)


if __name__ == '__main__':
	main()
	