import { useState, useEffect } from 'react';
import './SinhVienList.css';

function SinhVienList() {
  const [students, setStudents] = useState(() => {
    // Lấy danh sách sinh viên từ localStorage khi load trang
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [
      { id: 1, name: 'Nguyen Van A', class: 'DHKTPM18ATT', age: 21 },
      { id: 2, name: 'Tran Thi B', class: 'DHKTPM18BTT', age: 21 },
      { id: 3, name: 'Le Van C', class: 'DHKTPM18CTT', age: 21 },
    ]; // Nếu không có, sử dụng giá trị mặc định
  });

  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    age: ''
  });

  const [editStudent, setEditStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  // Cập nhật sinh viên mới khi nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Thêm sinh viên vào danh sách và lưu vào localStorage
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.age) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const studentToAdd = { ...newStudent, id: newId, age: parseInt(newStudent.age) };

    const updatedStudents = [...students, studentToAdd];
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents)); // Lưu vào localStorage

    setNewStudent({ name: '', class: '', age: '' });
  };

  // Xóa sinh viên và cập nhật vào localStorage
  const handleDeleteStudent = (id) => {
    const studentToDelete = students.find((student) => student.id === id);
    const confirmDelete = window.confirm(`Bạn có chắc muốn xóa sinh viên: ${studentToDelete?.name}?`);
    if (confirmDelete) {
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents)); // Lưu vào localStorage
    }
  };

  // Chỉnh sửa thông tin sinh viên
  const handleEditStudent = (student) => {
    setEditStudent({ ...student });
  };

  const handleUpdateStudent = () => {
    if (!editStudent.name || !editStudent.class || !editStudent.age) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const updatedStudents = students.map((student) =>
      student.id === editStudent.id ? editStudent : student
    );

    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents)); // Lưu vào localStorage
    setEditStudent(null);
  };

  // Lọc sinh viên theo lớp
  const handleClassFilterChange = (e) => {
    setSelectedClass(e.target.value);
  };

  // Lọc danh sách sinh viên theo lớp và tìm kiếm
  const filteredStudents = students.filter((student) =>
    (student.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedClass ? student.class === selectedClass : true)
  );

  // Lấy tất cả các lớp có trong danh sách sinh viên để đưa vào dropdown
  const classes = [...new Set(students.map(student => student.class))];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Danh Sách Sinh Viên</h2>

      {/* Input tìm kiếm */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Dropdown lọc theo lớp */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <select
          className="border p-2 flex-1"
          value={selectedClass}
          onChange={handleClassFilterChange}
        >
          <option value="">Chọn lớp</option>
          {classes.map((className, index) => (
            <option key={index} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      {/* Nhập sinh viên mới */}
      <div className="mb-4 flex gap-2 flex-wrap">
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

      {/* Form chỉnh sửa sinh viên */}
      {editStudent && (
        <div className="mb-4 p-4 border border-blue-500 bg-blue-100">
          <h3 className="text-xl font-bold mb-2">Chỉnh sửa thông tin sinh viên</h3>
          <input
            className="border p-2 flex-1 mb-2"
            type="text"
            name="name"
            value={editStudent.name}
            onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
            placeholder="Họ tên"
          />
          <input
            className="border p-2 flex-1 mb-2"
            type="text"
            name="class"
            value={editStudent.class}
            onChange={(e) => setEditStudent({ ...editStudent, class: e.target.value })}
            placeholder="Lớp"
          />
          <input
            className="border p-2 w-24 mb-2"
            type="number"
            name="age"
            value={editStudent.age}
            onChange={(e) => setEditStudent({ ...editStudent, age: e.target.value })}
            placeholder="Tuổi"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleUpdateStudent}
          >
            Lưu thay đổi
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
            onClick={() => setEditStudent(null)}
          >
            Hủy
          </button>
        </div>
      )}

      {/* Bảng sinh viên */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Lớp</th>
            <th className="border p-2">Tuổi</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="border p-2">{student.id}</td>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.class}</td>
              <td className="border p-2">{student.age}</td>
              <td className="border p-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  onClick={() => handleEditStudent(student)}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                  onClick={() => handleDeleteStudent(student.id)}
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
