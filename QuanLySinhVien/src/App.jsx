import React, { useState, useEffect, useRef, useMemo, useReducer } from "react";
import "./App.css"; // Import CSS

const studentReducer = (state, action) => {
  switch (action.type) {
    case "ADD_STUDENT":
      return state.some(student => student.name === action.payload.name)
        ? state.map(student =>
            student.name === action.payload.name
              ? { ...student, scores: [...student.scores, action.payload.score] }
              : student
          )
        : [...state, { name: action.payload.name, scores: [action.payload.score] }];

    case "EDIT_STUDENT":
      return state.map(student =>
        student.name === action.payload.name
          ? { ...student, scores: action.payload.scores }
          : student
      );

    case "DELETE_STUDENT":
      return state.filter(student => student.name !== action.payload);

    default:
      return state;
  }
};

const StudentApp = () => {
  const [students, dispatch] = useReducer(
    studentReducer,
    JSON.parse(localStorage.getItem("students")) || []
  );

  const nameRef = useRef(null);
  const scoreRef = useRef(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newScores, setNewScores] = useState("");

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleAddStudent = () => {
    const name = nameRef.current.value.trim();
    const score = parseFloat(scoreRef.current.value);
    if (!name || isNaN(score) || score < 0 || score > 10) return;

    dispatch({ type: "ADD_STUDENT", payload: { name, score } });

    nameRef.current.value = "";
    scoreRef.current.value = "";
  };

  const handleDelete = (name) => {
    dispatch({ type: "DELETE_STUDENT", payload: name });
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setNewScores(student.scores.join(", "));
  };

  const handleSaveEdit = () => {
    if (!editingStudent) return;

    const updatedScores = newScores
      .split(",")
      .map(score => parseFloat(score.trim()))
      .filter(score => !isNaN(score) && score >= 0 && score <= 10);

    if (updatedScores.length === 0) return;

    dispatch({
      type: "EDIT_STUDENT",
      payload: { name: editingStudent.name, scores: updatedScores }
    });

    setEditingStudent(null);
    setNewScores("");
  };

  const studentsWithAvg = useMemo(() => {
    return students.map(student => {
      const avgScore =
        student.scores.length > 0
          ? student.scores.reduce((sum, score) => sum + score, 0) / student.scores.length
          : 0;
      return { ...student, avgScore: avgScore.toFixed(2) };
    });
  }, [students]);

  return (
    <div className="container">
      <h1 className="title">📚 Quản lý Sinh viên</h1>

      {/* Form nhập liệu */}
      <div className="input-group">
        <input ref={nameRef} placeholder="Tên sinh viên" />
        <input ref={scoreRef} type="number" placeholder="Điểm (0-10)" min="0" max="10" />
        <button onClick={handleAddStudent}>➕ Thêm</button>
      </div>

      {/* Form chỉnh sửa */}
      {editingStudent && (
        <div className="edit-group">
          <h3>✏️ Chỉnh sửa điểm cho: {editingStudent.name}</h3>
          <input
            type="text"
            value={newScores}
            onChange={(e) => setNewScores(e.target.value)}
            placeholder="Nhập danh sách điểm, cách nhau bằng dấu phẩy"
          />
          <button onClick={handleSaveEdit} className="save-btn" >💾 Lưu</button>
          <button onClick={() => setEditingStudent(null)} className="cancel-btn">❌ Hủy</button>
        </div>
      )}

      {/* Bảng danh sách sinh viên */}
      {students.length > 0 ? (
        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>Tên sinh viên</th>
                <th>Danh sách điểm</th>
                <th>Điểm trung bình</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {studentsWithAvg.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.scores.join(", ")}</td>
                  <td className="text-bold">{student.avgScore}</td>
                  <td>
                    <button onClick={() => handleEdit(student)} className="edit-btn">Sửa</button>
                    <button onClick={() => handleDelete(student.name)} className="delete-btn">❌ Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">📭 Chưa có sinh viên nào.</p>
      )}
    </div>
  );
};

export default StudentApp;
