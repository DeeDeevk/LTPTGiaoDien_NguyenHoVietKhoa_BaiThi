import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import SinhVienList from './components/SinhVienList';
import './App.css';

function App() {
  return (
    <div className="container mx-auto p-4">
      <form className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Quản lý Sinh Viên</h2>
        
        {/* Bạn có thể thêm các trường khác ở đây */}
        
        <SinhVienList />
        
      </form>
    </div>
  );
}

export default App;
