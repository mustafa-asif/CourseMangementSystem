from flask import Flask, jsonify, request,make_response
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)




# app.config['CORS_HEADERS'] ='*'

CORS( resources={r"/*": {
    "origins": "http://localhost:3000",  # Allow all origins
    "methods": "*",  # Allow only GET and POST
    "allow_headers": "*"  # Specify allowed headers
}})


# Database connection
def get_connection():
    return pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=MUSTAFA;'  # Your SQL Server instance
        'DATABASE=DBMSProject;'  # Replace with your database name
        'Trusted_Connection=yes;'  # Uses Windows Authentication
    )


# fetch all courses
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

    try:

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
        response = make_response(jsonify({"message": "Course added successfully!"}), 201)
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response
    
    except Exception as e:
        print("error occured:" ,str(e))
        return jsonify({"message": "Error internal server"}), 500




# Delete a Course
@app.route('/api/Admin/Course/<int:CourseID>', methods=['DELETE'])
def delete_Course(CourseID):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Course WHERE CourseID = ?", (CourseID,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Course deleted successfully!"})

#fetch all semester
@app.route('/api/Admin/Semesters', methods=['GET'])
def fetch_Semester():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Semester")
    rows = cursor.fetchall()
    conn.close()
    print(rows)
    Semesters = [{"SemesterID": row[0], "SemesterName": row[1]} 
              for row in rows]
    return jsonify(Semesters)


#add semester
@app.route('/api/Admin/Semesters', methods=['POST'])
def add_Semester():
    try :
        data=request.json
        print("recieved data ",data)
        SemesterID=data.get('SemesterID')
        SemesterName=data.get('SemesterName')
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Semester (SemesterID, SemesterName) VALUES (?,?)", (SemesterID,SemesterName))
        conn.commit()
        conn.close()
        response = make_response(jsonify({"message": "Semester added successfully!"}), 201)
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("access_control_allow_credentials",True)
    
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response
    except Exception as e:
        print("error occured:" ,str(e))
        return jsonify({"message": "Error internal server"}), 500
    
    # delete a semester
@app.route('/api/Admin/Semesters/<int:SemesterID>', methods=['DELETE'])
def delete_Semester(SemesterID):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Semester WHERE SemesterID = ?", (SemesterID,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Semester deleted successfully!"})

# get programms offered
@app.route('/api/Admin/Program', methods=['GET'])
def fetch_Program():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Program")
    rows = cursor.fetchall()
    conn.close()
    print(rows)
    Programs = [{"ProgID": row[0], "ProgName": row[1]} 
              for row in rows]
    return jsonify(Programs)

# add programm
@app.route('/api/Admin/Program', methods=['POST'])
def add_Program():
    try :
        data=request.json
        print("recieved data ",data)
        ProgID=data.get('ProgID')
        ProgName=data.get('ProgName')
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Program (ProgID, ProgName) VALUES (?,?)", (ProgID,ProgName))
        conn.commit()
        conn.close()
        response = make_response(jsonify({"message": "Semester added successfully!"}), 201)
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("access_control_allow_credentials",True)
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response
    except Exception as e:
        print("error occured:" ,str(e))
        return jsonify({"message": "Error internal server"}), 500

# delete programm
@app.route('/api/Admin/Program/<int:ProgID>', methods=['DELETE'])
def delete_Program(ProgID):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Program WHERE ProgID = ?", (ProgID,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Programm deleted successfully!"})

# return courses of same semesters
@app.route('/api/Admin/CommonCourses', methods=['GET'])
def fetch_common_courses():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        # Execute the INNER JOIN query
       
        cursor.execute("""     SELECT 
            Course.CourseID, 
            Course.CourseName, 
            Course.CreditHrTh, 
            Course.CreditHrLab, 
            Semester.SemesterID, 
            Semester.SemesterName
        FROM 
            Course
        INNER JOIN 
            Semester
        ON 
            Course.SemID = Semester.SemesterID""")
        rows = cursor.fetchall()
        conn.close()

        # Format the result into a list of dictionaries
        common_courses = [
            {
                "CourseID": row[0],
                "CourseName": row[1],
                "CreditHrTh": row[2],
                "CreditHrLab": row[3],
                "SemesterID": row[4],
                "SemesterName": row[5]
            } for row in rows
        ]

        # Return the JSON response
        return jsonify(common_courses), 200

    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500
    



    

#     # Endpoint to register courses for a student
# @app.route('/api/Student/RegisterCourses', methods=['POST'])
# def register_course():
#     data = request.json
#     student_id = data.get('student_id')
#     course_ids = data.get('course_ids')
    
#     if not student_id or not course_ids:
#         return jsonify({"message": "Invalid data, student_id and course_ids are required"}), 400
    
#     conn = get_connection()
#     cursor = conn.cursor()
    
#     # Insert course registrations into the 'StudentCourse' table (or whatever table you're using)
#     for course_id in course_ids:
#         cursor.execute("INSERT INTO StudentCourse (StudentID, CourseID) VALUES (?, ?)", (student_id, course_id))
    
#     conn.commit()
#     conn.close()
    
#     return jsonify({"message": "Courses registered successfully!"}), 201


# Endpoint to fetch all registered courses for a student
# @app.route('/api/Student/RegisterCourses/<int:student_id>', methods=['GET'])
# def get_student_courses(student_id):
#     conn = get_connection()
#     cursor = conn.cursor()
    
#     # Fetch courses registered by the student
#     cursor.execute("""
#         SELECT c.CourseID, c.Name 
#         FROM Course c 
#         JOIN StudentCourse sc ON c.CourseID = sc.CourseID 
#         WHERE sc.StudentID = ?
#     """, (student_id,))
    
#     courses = cursor.fetchall()
#     conn.close()
    
#     # Convert rows into a list of dictionaries
#     registered_courses = [{"CourseID": row[0], "Name": row[1]} for row in courses]
#     return jsonify(registered_courses)









if __name__ == "__main__":
    app.run(debug=True, port=5500)
