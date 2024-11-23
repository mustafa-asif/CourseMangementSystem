import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Fetch users from backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Add a user
    const addUser = async () => {
        try {
            await axios.post("http://localhost:5500/api/users", { name, email });
            fetchUsers(); // Refresh user list
            setName("");
            setEmail("");
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    // Delete a user
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5500/api/users/${userId}`);
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User Management</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addUser();
                }}
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Add User</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.UserID}>
                            <td>{user.UserID}</td>
                            <td>{user.Name}</td>
                            <td>{user.Email}</td>
                            <td>
                                <button onClick={() => deleteUser(user.UserID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
