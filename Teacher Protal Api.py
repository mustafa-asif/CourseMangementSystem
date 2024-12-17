from flask import Flask, jsonify, request
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

# Database connection
def get_connection():
    return pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=DESKTOP-ULD5VID\\MSSQLSERVER2024;'
        'DATABASE=DBMSProject;'
        'Trusted_Connection=yes;'
    )

# Teacher view for student details based on registration
@app.route('/api/teacher_view', methods=['GET'])
def teacher_view():
    teacher_id = request.args.get('teacher_id')  # TeacherID passed as a query parameter
    if not teacher_id:
        return jsonify({"message": "Teacher ID is required!"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    try:
        # Query to fetch student, course, semester, and program details based on TeacherID
        cursor.execute("""
            SELECT 
                S.StudentID, 
                S.Name AS StudentName,
                C.CourseID, 
                C.Name AS CourseName,
                SEM.SemesterName,
                P.ProgramName
            FROM 
                Student S
            INNER JOIN StudentCourse SC ON S.StudentID = SC.StudentID
            INNER JOIN Course C ON SC.CourseID = C.CourseID
            INNER JOIN Teacher T ON C.CourseID = T.CourseID
            INNER JOIN Semester SEM ON T.SemID = SEM.SemID
            INNER JOIN Program P ON T.ProgID = P.ProgID
            WHERE 
                T.TeacherID = ?
            ORDER BY S.StudentID
        """, (teacher_id,))

        rows = cursor.fetchall()
        conn.close()

        # Format results into JSON
        result = []
        for row in rows:
            result.append({
                "StudentID": row[0],
                "StudentName": row[1],
                "CourseID": row[2],
                "CourseName": row[3],
                "SemesterName": row[4],
                "ProgramName": row[5]
            })
        
        return jsonify(result)

    except Exception as e:
        return jsonify({"message": f"Error fetching data: {str(e)}"}), 500
    finally:
        conn.close()

if __name__ == "__main__":
    app.run(debug=True, port=5500)
