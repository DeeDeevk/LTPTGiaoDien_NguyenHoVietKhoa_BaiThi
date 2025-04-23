import React from 'react';

function StudentItem({ student, onEdit, onDelete }) {
  const { id, name, class: studentClass, age } = student;

  return (
    <tr className="transition duration-300 ease-in-out transform hover:bg-gray-100 hover:scale-105">
      <td className="border p-3 text-center text-gray-700">{id}</td>
      <td className="border p-3 text-center text-gray-700">{name}</td>
      <td className="border p-3 text-center text-gray-700">{studentClass}</td>
      <td className="border p-3 text-center text-gray-700">{age}</td>
      <td className="border p-3 flex justify-center space-x-4">
        <button
          className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 focus:outline-none transition transform duration-300 hover:scale-105"
          onClick={() => onEdit(student)}
        >
          Sửa
        </button>
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none transition transform duration-300 hover:scale-105"
          onClick={() => onDelete(id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}

export default StudentItem;
