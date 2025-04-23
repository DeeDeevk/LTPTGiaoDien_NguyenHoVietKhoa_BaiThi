import React from 'react';

function StudentItem({ student, onEdit, onDelete }) {
  const { id, name, class: studentClass, age } = student;

  return (
    <tr className="hover:bg-gray-50">
      <td className="border p-2">{id}</td>
      <td className="border p-2">{name}</td>
      <td className="border p-2">{studentClass}</td>
      <td className="border p-2">{age}</td>
      <td className="border p-2">
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          onClick={() => onEdit(student)}
        >
          Sửa
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
          onClick={() => onDelete(id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}

export default StudentItem;
