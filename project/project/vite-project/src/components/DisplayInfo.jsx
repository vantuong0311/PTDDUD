import "../index.css"; // Import CSS

const DisplayInfo = ({ listUser, handleDeleteUser }) => {
    return (
        <div>
            {listUser.length === 0 ? (
                <h3>Không có người dùng nào!</h3>
            ) : (
                listUser.map((user) => (
                    <div key={user.id} className={user.Age < 18 ? "red" : "blue"}>
                        <div>User name: {user.Name}</div>
                        <div>User Age: {user.Age}</div>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};

export default DisplayInfo;
