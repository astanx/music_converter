import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../state/useUserStore.ts';

const Header = () => {
  const userName = useUserStore((state) => state.userName);
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleUsernameClick = () => {
    setModalOpen((prev) => !prev);
  };

  const handleBlur = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...");
  };

  return (
    <header className='row align-items-center p-3'>
      <div className='col-3'>
        <Link to='/' className='btn btn-link text-dark'>
          <i className='fas fa-home icon-large'></i> 
        </Link>
        <Link to='/history' className='btn btn-link text-dark'>
          <i className='fas fa-history icon-large'></i>
        </Link>
      </div>
      <h1 className='col-6'>Преобразователь музыки</h1>
      <div className="col-3 text-end">
        <span 
          className="fs-4" 
          style={{ cursor: 'pointer' }} 
          onClick={handleUsernameClick} 
          onBlur={handleBlur}
          tabIndex="0" // Makes the span focusable
        >
          {userName}
        </span>
        {isModalOpen && (
          <div 
            ref={modalRef} 
            className="modal" 
            style={{
              position: 'absolute',
              right: '100px',
              backgroundColor: 'white',
              border: '1px solid gray',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              padding: '10px',
              zIndex: '1000',
            }}
          >
            <p>Вы хотите выйти?</p>
            <button onClick={handleLogout} className="btn btn-danger">Выйти</button>
            <button onClick={() => setModalOpen(false)} className="btn btn-secondary">Отмена</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;