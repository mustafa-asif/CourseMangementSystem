from flask import Flask, jsonify, request
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

# Database connection
def get_connection():
    return pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=MUSTAFA;'  # Your SQL Server instance
        'DATABASE=DBMSProject;'  # Replace with your database name
        'Trusted_Connection=yes;'  # Uses Windows Authentication
    )



@app.route('/api/Admin/Course', methods=['GET'])
def fetch_Courses():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Course")
    rows = cursor.fetchall()
    conn.close()
    Courses = [{"CourseID": row[0], "CourseName": row[1], "CreditHrTh": row[2],"CreditHrLab":row[3],
              "ProgID":row[4],"SemID":row[5]} 
              for row in rows]
    return jsonify(Courses)



# Add a new Course
@app.route('/api/Admin/Course', methods=['POST'])
def add_Course():
    data = request.json
    CourseID = data.get('CourseID')
    CourseName = data.get('CourseName')
    CreditHrTh =data.get('CreditHrTh')
    CreditHrLab = data.get('CreditHrLab')
    ProgID = data.get('ProgID')
    SemID = data.get('SemID')

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Course (CourseID, CourseName ,CreditHrTh,CreditHrLab,ProgID,SemID)  VALUES (?, ?,?,?,?,?)", (CourseID, CourseName,CreditHrTh,CreditHrLab,ProgID,SemID))
    conn.commit()
    conn.close()
    return jsonify({"message": "Course added successfully!"}), 201



# Delete a Course
@app.route('/api/Admin/Course/<int:CourseID>', methods=['DELETE'])
def delete_Course(CourseID):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Course WHERE CourseID = ?", (CourseID,))
    conn.commit()
    conn.close()
    return jsonify({"message": "User deleted successfully!"})

if __name__ == "__main__":
    app.run(debug=True, port=5500)
