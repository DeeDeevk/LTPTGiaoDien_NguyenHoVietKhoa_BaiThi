import { useState } from 'react';
import './SinhVienList.css';

function SinhVienList() {
  const [students] = useState([
    { id: 1, name: 'Nguyen Van A', class: '12A1', age: 17 },
    { id: 2, name: 'Tran Thi B', class: '12A2', age: 18 },
    { id: 3, name: 'Le Van C', class: '12A1', age: 17 },
  ]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Danh Sách Sinh Viên</h2>
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
