

# Course Management System

A full-stack course management system built with React (frontend) and Flask (backend), using MySQL for data storage.

## Features

- Student and teacher portals
- Course enrollment and management
- API endpoints for course and user data
- MySQL-based backend with Flask
- React-based frontend with Create React App

## Prerequisites

- Node.js and npm
- Python 3.x
- MySQL Server

## Setup Instructions

1. Clone the repository:

   
   git clone https://github.com/mustafa-asif/CourseMangementSystem.git
   
   cd CourseMangementSystem
   


3. Install frontend dependencies:

   
   npm install
   


4. Set up the MySQL database:

   - Create a new MySQL database.
   - Import the provided SQL schema and data:
     - MySQL.txt`
   
   - This files contain the necessary table structures and sample data.

5. Configure the Flask backend:

   - Open the Flask backend file ( Api.py).
   - Update the MySQL connection settings with your server name, username, password, and database name.

6. Run the Flask backend server:

   
   python src\ backend\ Api.py
   


7. Start the React frontend:

   
   npm start
   


   This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Additional Notes

- Ensure that the backend server is running before starting the frontend to allow API calls to function correctly.


## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Flask Documentation](https://flask.palletsprojects.com/)

