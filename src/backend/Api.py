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
              "ProgID":row[4],"SemID":row[5],"TeacherID" : row[6]} 
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
        TeacherID =data.get('TeacherID')

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Course (CourseID, CourseName ,CreditHrTh,CreditHrLab,ProgID,SemID,TeacherID)  VALUES (?, ?,?,?,?,?,?)", (CourseID, CourseName,CreditHrTh,CreditHrLab,ProgID,SemID,TeacherID))
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
            Teacher.TeacherName,
            Teacher.Job,                      
            Semester.SemesterName,
            Program.ProgName     
        FROM 
            Course
        INNER JOIN 
            Semester
        ON 
            Course.SemID = Semester.SemesterID
        INNER JOIN
            Program
        ON
            Course.ProgID = Program.ProgID
        INNER JOIN
            Teacher
        ON
            Course.CourseID = Teacher.CourseID """)
        
        rows = cursor.fetchall()
        conn.close()

        # Format the result into a list of dictionaries
        common_courses = [
            {
                "CourseID": row[0],
                "CourseName": row[1],
                "TeacherName": row[2],
                "Job": row[3],
                "SemesterName": row[4],
                "ProgName": row[5]
            } for row in rows
        ]

        # Return the JSON response
        return jsonify(common_courses), 200

    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500
    

#add student info
@app.route('/api/Admin/Student', methods=['POST'])
def add_student_info():
    try :
        data=request.json
        print("recieved data ",data)
        StudentID=data.get('StudentID')
        StudentName=data.get('StudentName')
        DOB=data.get('DOB')
        Address=data.get('Address')
        Phone=data.get('Phone')
        
        ProgID=data.get('ProgID')
        SemID=data.get('SemID')
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Student (StudentID,StudentName,DOB,Address,Phone,ProgID,SemID) VALUES (?,?,?,?,?,?,?)",
                        (StudentID,StudentName,DOB,Address,Phone,ProgID,SemID))
        conn.commit()
        conn.close()
        response = make_response(jsonify({"message": "Student added successfully!"}), 201)
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("access_control_allow_credentials",True)
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS,PUT")
        return response
    except Exception as e:
        print("error occured:" ,str(e))
        return jsonify({"message": "Error internal server"}), 500
    

    # fetch all students
@app.route('/api/Admin/Student', methods=['GET'])
def fetch_Students():
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Student")
        rows = cursor.fetchall()
        conn.close()
        print(rows)
        Students = [
            {"StudentID": row[0], "StudentName": row[1],"DOB":row[2],
             "Address":row[3],"Phone":row[4],"ProgID":row[5],
             "SemID":row[6]
             } 
                for row in rows]
        return jsonify(Students)


# Update an existing student
@app.route('/api/Admin/Student/<int:StudentID>', methods=['PUT'])
def update_student(StudentID):
    data = request.json
    StudentName = data.get('StudentName')
    DOB = data.get('DOB')
    Address = data.get('Address')
    Phone = data.get('Phone')

    ProgID = data.get('ProgID')
    SemID = data.get('SemID')
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE Student SET StudentName = ?, DOB = ?, Address = ?, Phone = ?, ProgID = ?, SemID = ? WHERE StudentID = ?", 
        (StudentName, DOB, Address, Phone, ProgID, SemID, StudentID)
    )
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"Student {StudentID} updated successfully!"})

# delete student
@app.route('/api/Admin/Student/<int:StudentID>', methods=['DELETE'])
def delete_Student(StudentID):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Student WHERE StudentID = ?", (StudentID,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Student deleted successfully!"})



# Fetch all teachers
@app.route('/api/Admin/teachers', methods=['GET'])
def fetch_teachers():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Teacher")
    rows = cursor.fetchall()
    conn.close()
    teachers = [
        {
            
            "TeacherID": row[0],
            "TeacherName": row[1],
            "DOJ": row[2],
            "Status": row[3],
            "Salary": row[4],
            "Job": row[5],
            "CourseID": row[6],
            "ProgID": row[7],
            "SemID": row[8],
        }
        for row in rows
    ]
    return jsonify(teachers)

# Add a new teacher
@app.route('/api/Admin/teachers', methods=['POST'])
def add_teacher():
    data = request.json
    TeacherID = data.get('TeacherID')
    TeacherName = data.get('TeacherName')
    DOJ = data.get('DOJ')  # Date of Joining
    Status = data.get('Status')
    Salary = data.get('Salary')
    Job = data.get('Job')
    CourseID = data.get('CourseID')
    ProgID = data.get('ProgID')  # Program ID
    SemID = data.get('SemID')  # Semester ID

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Teacher (TeacherID, TeacherName, DOJ, Status, Salary, Job, CourseID,ProgID, SemID ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (TeacherID, TeacherName, DOJ, Status, Salary, Job, CourseID, ProgID, SemID )
    )
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Teacher added successfully!"}), 201

# Update an existing teacher
@app.route('/api//Admin/teachers/<int:TeacherID>', methods=['PUT'])
def update_teacher(TeacherID):
    data = request.json
    CourseID = data.get('CourseID')
    TeacherName = data.get('TeacherName')
    DOJ = data.get('DOJ')
    Status = data.get('Status')
    Salary = data.get('Salary')
    Job = data.get('Job')
    ProgID=data.get('ProgID')
    SemID=data.get('SemID')
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE Teacher SET TeacherName = ?, DOJ = ?, Status = ?, Salary = ?, Job = ?,  CourseID = ?, SemID=?, ProgID=? WHERE TeacherID = ?", 
        (TeacherName, DOJ, Status, Salary, Job, CourseID,ProgID,SemID, TeacherID)
    )
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"Teacher {TeacherID} updated successfully!"})

# Delete a teacher
@app.route('/api/Admin/teachers/<int:TeacherID>', methods=['DELETE'])
def delete_teacher(TeacherID):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Teacher WHERE TeacherID = ?", (TeacherID,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Teacher deleted successfully!"})




# Get courses and register courses
@app.route('/api/Student/RegisterCourses', methods=['GET', 'POST'])
def RegisterCourses():
    conn = get_connection()
    cursor = conn.cursor()
    student_id = request.args.get('StudentID')
    
    if request.method == 'GET':
        # Fetch all courses from the Course table
        cursor.execute("""SELECT CourseID, CourseName
         FROM 
         Course
         INNER JOIN 
         Student ON Student.ProgID = Course.ProgID 
         WHERE
            Student.StudentID = ?
        """,(student_id))
        rows = cursor.fetchall()
        conn.close()
        
        # Return courses as JSON
        courses = [{"CourseID": row[0], "CourseName": row[1]} for row in rows]
        return jsonify(courses)
    
    elif request.method == 'POST':
        # Register courses for a student
        data = request.json
        # StuCourseID=data.get('StuCourseID')
        StudentID = data.get('StudentID')
        CourseID = data.get('CourseID')  # List of selected course IDs
        
        if not StudentID or not CourseID:
            return jsonify({"message": "Student ID and Course IDs are required!"}), 400

        registered_courses = []

        try:
            for CourseID in CourseID:
                # Check if the student is already registered for the course
                cursor.execute(
                    "SELECT * FROM StudentCourse WHERE StudentID = ? AND CourseID = ?",
                    (StudentID, CourseID)
                )
                if cursor.fetchone():
                    continue  # Skip if already registered
                
                # Register the student for the course
                cursor.execute(
                    "INSERT INTO StudentCourse (StudentID, CourseID) VALUES ( ?,?)",
                    (StudentID, CourseID)
                )
                registered_courses.append(CourseID)

            conn.commit()
            return jsonify({
                "message": "Student registered for courses successfully!",
                "registered_courses": registered_courses
            }), 201
        except Exception as e:
            conn.rollback()
            return jsonify({"message": f"Error registering courses:"}), 500
        finally:
            conn.close() 


# # View student-course registrations
@app.route('/api/Student/viewCourses', methods=['GET'])
def view_student_courses():
    conn = get_connection()
    cursor = conn.cursor()
    
    # Get StudentID from query parameters
    student_id = request.args.get('StudentID')
    
    if not student_id:
        return jsonify({"message": "StudentID is required as a query parameter!"}), 400
    
    # Query to get student information and their registered courses
    cursor.execute("""
        SELECT 
            Student.StudentID, 
            Student.StudentName AS StudentName,
            Course.CourseID, 
            Course.CourseName AS CourseName,
            Course.CreditHrTh, 
            Course.CreditHrLab,
            Program.ProgName,
            Semester.SemesterName
        FROM 
            Student
        INNER JOIN 
            StudentCourse ON Student.StudentID = StudentCourse.StudentID
        INNER JOIN 
            Course ON StudentCourse.CourseID = Course.CourseID
        INNER JOIN
            Program ON Course.ProgID = Program.ProgID
        INNER JOIN
            Semester ON Course.SemID = Semester.SemesterID
        WHERE
            Student.StudentID = ?
    """, (student_id,))
    
    rows = cursor.fetchall()
    conn.close()
    
    if not rows:
        return jsonify({"message": "No courses found for the specified StudentID."}), 404
    
    # Group courses by student ID
    student_courses = {
        "StudentID": rows[0][0],
        "StudentName": rows[0][1],
        "Courses": [],
        "Program": rows[0][6],
        "Semester": rows[0][7]
    }
    
    for row in rows:
        course_details = {
            "CourseID": row[2],
            "CourseName": row[3],
            "CreditHrTh": row[4],
            "CreditHrLab": row[5]
        }
        student_courses["Courses"].append(course_details)
    
    return jsonify(student_courses)


# Teacher Panel Course Registered view
@app.route('/api/Teacher/RegisterCourses', methods=['GET'])
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
                S.StudentName AS StudentName,
                C.CourseID,       
                C.CourseName AS CourseName,
                SEM.SemesterName,
                P.ProgName,
                T.TeacherName
            FROM 
                Student S
            INNER JOIN StudentCourse SC ON S.StudentID = SC.StudentID
            INNER JOIN Course C ON SC.CourseID = C.CourseID
            INNER JOIN Teacher T ON C.CourseID = T.CourseID
            INNER JOIN Semester SEM ON T.SemID = SEM.SemesterID
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
                "ProgramName": row[5],
                "TeacherName": row[6]
            })
        
        return jsonify(result)

    except Exception as e:
        return jsonify({"message": f"Error fetching data: {str(e)}"}), 500
    
          
if __name__ == "__main__":
    app.run(debug=True, port=5500)
