# wild watch 🚒
a real-time wildfire analysis and prediction dashboard that helps monitor, analyze, and predict wildfire incidents in 
quebec using machine learning.

## tech stack ✨
- **frontend:** vite + react with tailwind css and framer motion for smooth animations
- **backend:** flask with scikit-learn for ml predictions
- **data processing:** pandas for data manipulation and analysis
- **deployment:** frontend hosted on vercel; backend deployed on render.

## features 👾
- **smart file upload:** handles multiple csv files with validation and progress tracking
- **resource management:** tracks firefighting resources and optimizes their allocation
- **incident analysis:** comprehensive reporting of fire incidents with severity levels
- **risk prediction:** machine learning-based prediction of future fire risks using environmental data
- **geospatial visualization:** displays incident locations and resources on interactive maps using latitude and longitude coordinates
- **cost analysis:** detailed breakdown of operational and damage costs
- **interactive dashboard:** real-time visualization of fire incident data and predictions

## 💭 what I learned
- **ml implementation:** building and deploying a random forest classifier for fire risk prediction
- **resource optimization:** developing algorithms for efficient firefighting resource allocation
- **data processing:** handling and analyzing complex environmental and incident data
- **google maps integration:** implementing the google maps api to create interactive location-based features

## limitations 🚨
- **data dependencies:** requires specific csv file formats for proper functionality
- **resource constraints:** fixed resource allocation limits for firefighting units
- **model scope:** predictions limited to available environmental parameters

## improvements 🌱
- **real-time updates:** implement websocket for live data updates
- **advanced ml models:** explore deep learning models for improved predictions
- **resource scheduling:** add dynamic resource allocation optimization
- **historical analysis:** include trend analysis and seasonal pattern detection

## .env file 📄
this project requires `.env` files for both the server and client, located in their respective folders. rename the 
`.env.example` file in each folder to `.env`, and update it with the necessary values. ensure these files are configured
properly and not committed to version control.

## running the project 🏁
to get the project up and running on your local machine, follow these steps:

- **ensure [python](https://www.python.org/downloads/) and [node.js](https://nodejs.org/en) are installed.**
1. **clone the repository:**
```bash
git clone https://github.com/barbaraeguche/wild-watch.git
```

2. **navigate to the project directory:**
```bash
cd wild-watch
```

3. **run the backend:**
    1. **navigate to server directory:**
   ```bash
   cd server
   ```
    2. **install and activate virtual environment:**
   ```bash
   python3 -m venv venv
   source ./venv/bin/activate
   ```
    3. **run the flask app:**
   ```bash
   python3 app.py
   ```
    4. open [http://127.0.0.1:5000](http://127.0.0.1:5000) with your browser.

4. **run the frontend:**
    1. **navigate to client directory:**
   ```bash
   cd client
   ```
    2. **install dependencies:**
   ```bash
   pnpm install
   ```
    3. **start the development server:**
   ```bash
   pnpm run dev
   ```
    4. open [http://localhost:5173/](http://localhost:5173/) with your browser.

## preview 📸
https://github.com/user-attachments/assets/46a4d3d0-05e3-4b80-a85d-f1a3e45a0eca
