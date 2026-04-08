import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Секретное сообщение в консоли
console.log("%c💖 Привет, мой милый хороший мальчик! 💖", "color: #ff66cc; font-size: 16px; font-weight: bold;");
console.log("%cЯ тебя люблю. С днём рождения! ❤️", "color: #ffaa66; font-size: 14px;");
console.log("%cА теперь можешь закрыть консоль и просмотреть остальные предметы", "color: #aaffdd;");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);