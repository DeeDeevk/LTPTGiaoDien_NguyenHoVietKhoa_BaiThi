import { useState } from 'react';
import './SinhVienList.css';

function SinhVienList() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyen Van A', class: '12A1', age: 17 },
    { id: 2, name: 'Tran Thi B', class: '12A2', age: 18 },
    { id: 3, name: 'Le Van C', class: '12A1', age: 17 },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    age: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.age) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    const studentToAdd = { ...newStudent, id: newId, age: parseInt(newStudent.age) };

    setStudents([...students, studentToAdd]);
    setNewStudent({ name: '', class: '', age: '' });
    console.log("Them sinh vien thanh cong!") // reset form
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Danh Sách Sinh Viên</h2>

      {/* Form thêm sinh viên */}
      <div className="mb-4 flex gap-2">
        <input
          className="border p-2 flex-1"
          type="text"
          name="name"
          value={newStudent.name}
          placeholder="Họ tên"
          onChange={handleInputChange}
        />
        <input
          className="border p-2 flex-1"
          type="text"
          name="class"
          value={newStudent.class}
          placeholder="Lớp"
          onChange={handleInputChange}
        />
        <input
          className="border p-2 w-24"
          type="number"
          name="age"
          value={newStudent.age}
          placeholder="Tuổi"
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddStudent}
        >
          Thêm sinh viên
        </button>
      </div>

      {/* Bảng sinh viên */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Tên</th>
            <th className="border p-2">Lớp</th>
            <th className="border p-2">Tuổi</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.class}</td>
              <td className="border p-2">{student.age}</td>
              <td className="border p-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => alert(`Xóa ${student.name}`)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SinhVienList;
