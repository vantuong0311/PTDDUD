import React from "react";
import { Link } from "react-router-dom";
import "../css/UserList.css"; 

const users = [
    { id: 1, name: "Nguyễn Văn A" },
    { id: 2, name: "Trần Thị B" },
    { id: 3, name: "Lê Văn C" }
];

function UserList() {
    return (
        <div>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Người Dùng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;
