import { useState } from "react";

const AddUserInfor = ({ handleAddnewUser, userCount }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (!name || !age) return alert("Vui lòng nhập đầy đủ thông tin!");
        
        // Kiểm tra nếu đã có 10 người dùng thì hiển thị cảnh báo
        if (userCount >= 10) {
            alert("Không thể thêm quá 10 người dùng!");
            return;
        }

        handleAddnewUser({
            id: Math.floor(Math.random() * 100) + 1, // ID ngẫu nhiên
            Name: name,
            Age: age
        });

        setName('');
        setAge('');
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="Age"
                value={age}
                onChange={(event) => setAge(event.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddUserInfor;
