import { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfo from "./DisplayInfo";

const Mycomponents = () => {
    const [listUser, setListUser] = useState([
        { id: 1, Name: "Toàn", Age: 49 },
        { id: 2, Name: "Tưởng", Age: 17 },
        { id: 3, Name: "Ý", Age: 32 },
    ]);

    const handleAddnewUser = (userObject) => {
        setListUser((prevList) => [userObject, ...prevList]);
    };

    const handleDeleteUser = (userID) => {
        setListUser(listUser.filter((item) => item.id !== userID));
    };

    const handleDeleteAllUsers = () => {
        setListUser([]); // Xóa toàn bộ danh sách
    };

    return (
        <div>
            <h2>Quản lý người dùng</h2>
            <AddUserInfor handleAddnewUser={handleAddnewUser} userCount={listUser.length} />
            <hr />
            <DisplayInfo listUser={listUser} handleDeleteUser={handleDeleteUser} />

            {listUser.length > 0 && (
                <button onClick={handleDeleteAllUsers} style={{ marginTop: "10px", padding: "8px", backgroundColor: "red", color: "white" }}>
                    Delete All
                </button>
            )}
        </div>
    );
};

export default Mycomponents;
