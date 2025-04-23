import { useState } from 'react';
import './SinhVienList.css';
import StudentItem from './StudentItem';

function SinhVienList() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyen Van A', class: 'DHKTPM18ATT', age: 21 },
    { id: 2, name: 'Tran Thi B', class: 'DHKTPM18BTT', age: 21 },
    { id: 3, name: 'Le Van C', class: 'DHKTPM18CTT', age: 21 },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    age: ''
  });

  const [editStudent, setEditStudent] = useState(null); // Để lưu sinh viên đang chỉnh sửa
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(''); // Lưu lớp được chọn

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.age) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const studentToAdd = { ...newStudent, id: newId, age: parseInt(newStudent.age) };

    setStudents([...students, studentToAdd]);
    setNewStudent({ name: '', class: '', age: '' });
  };

  const handleDeleteStudent = (id) => {
    const studentToDelete = students.find((student) => student.id === id);
    const confirmDelete = window.confirm(`Bạn có chắc muốn xóa sinh viên: ${studentToDelete?.name}?`);
    if (confirmDelete) {
      setStudents(students.filter((student) => student.id !== id));
      console.log("Đã xóa sinh viên:", studentToDelete);
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchTerm);
  };

  const handleEditStudent = (student) => {
    setEditStudent({ ...student }); // Lưu thông tin sinh viên đang chỉnh sửa
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
    setEditStudent(null); // Đóng form chỉnh sửa
  };

  const handleClassFilterChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    (student.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedClass ? student.class === selectedClass : true)
  );

  const classes = [...new Set(students.map(student => student.class))];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Danh Sách Sinh Viên</h2>

      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
      </div>

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
            <StudentItem
              key={student.id}
              student={student}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SinhVienList;
