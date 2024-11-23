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
        'DATABASE=dbmsproj;'  # Replace with your database name
        'Trusted_Connection=yes;'  # Uses Windows Authentication
    )

# Fetch all users
@app.route('/api/users', methods=['GET'])
def fetch_users():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Users")
    rows = cursor.fetchall()
    conn.close()
    users = [{"UserID": row[0], "Name": row[1], "Email": row[2]} for row in rows]
    return jsonify(users)

# Add a new user
@app.route('/api/users', methods=['POST'])
def add_user():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Users (Name, Email) VALUES (?, ?)", (name, email))
    conn.commit()
    conn.close()
    return jsonify({"message": "User added successfully!"}), 201

# Delete a user
@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Users WHERE UserID = ?", (user_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "User deleted successfully!"})

if __name__ == "__main__":
    app.run(debug=True, port=5500)
