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

  const [editStudent, setEditStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

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
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchTerm);
  };

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
    setEditStudent(null);
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
    <div className="container mx-auto p-8 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Danh Sách Sinh Viên</h2>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          className="border rounded-md p-3 flex-1 text-gray-700 focus:ring-2 focus:ring-blue-500"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <select
          className="border rounded-md p-3 flex-1 text-gray-700 focus:ring-2 focus:ring-blue-500"
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

      <div className="mb-6 flex gap-4">
        <input
          className="border rounded-md p-3 flex-1 text-gray-700 focus:ring-2 focus:ring-blue-500"
          type="text"
          name="name"
          value={newStudent.name}
          placeholder="Họ tên"
          onChange={handleInputChange}
        />
        <input
          className="border rounded-md p-3 flex-1 text-gray-700 focus:ring-2 focus:ring-blue-500"
          type="text"
          name="class"
          value={newStudent.class}
          placeholder="Lớp"
          onChange={handleInputChange}
        />
        <input
          className="border rounded-md p-3 w-24 text-gray-700 focus:ring-2 focus:ring-blue-500"
          type="number"
          name="age"
          value={newStudent.age}
          placeholder="Tuổi"
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
          onClick={handleAddStudent}
        >
          Thêm sinh viên
        </button>
      </div>

      {editStudent && (
        <div className="mb-6 p-6 bg-blue-100 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Chỉnh sửa thông tin sinh viên</h3>
          <input
            className="border rounded-md p-3 w-full text-gray-700 mb-4 focus:ring-2 focus:ring-blue-500"
            type="text"
            name="name"
            value={editStudent.name}
            onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
            placeholder="Họ tên"
          />
          <input
            className="border rounded-md p-3 w-full text-gray-700 mb-4 focus:ring-2 focus:ring-blue-500"
            type="text"
            name="class"
            value={editStudent.class}
            onChange={(e) => setEditStudent({ ...editStudent, class: e.target.value })}
            placeholder="Lớp"
          />
          <input
            className="border rounded-md p-3 w-full text-gray-700 mb-4 focus:ring-2 focus:ring-blue-500"
            type="number"
            name="age"
            value={editStudent.age}
            onChange={(e) => setEditStudent({ ...editStudent, age: e.target.value })}
            placeholder="Tuổi"
          />
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            onClick={handleUpdateStudent}
          >
            Lưu thay đổi
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 ml-4 focus:outline-none"
            onClick={() => setEditStudent(null)}
          >
            Hủy
          </button>
        </div>
      )}

      <table className="min-w-full bg-white rounded-lg shadow-md border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3 text-left text-gray-600">ID</th>
            <th className="border p-3 text-left text-gray-600">Tên</th>
            <th className="border p-3 text-left text-gray-600">Lớp</th>
            <th className="border p-3 text-left text-gray-600">Tuổi</th>
            <th className="border p-3 text-left text-gray-600">Hành động</th>
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
