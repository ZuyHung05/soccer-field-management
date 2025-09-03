import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFutbol, faDollarSign, faPeopleRoof, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import '../../styles/ManagerHeader.css';

const ManagerHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="nav" id="nav">
        <ul className="navbar">
          <li className="navbar-item navleft">
            <FontAwesomeIcon 
              icon={faBars} 
              className="ss" 
              onClick={toggleMenu} 
            />
            <p className="nav-sanbong" onClick={() => window.location.href='/manager'}>
              <FontAwesomeIcon icon={faFutbol} className="cc" />
              Sân bóng D2HT
            </p>
          </li>
          <ul className={`menu ${menuOpen ? 'show' : ''}`}>
            <li className="menu-item aa">
              <FontAwesomeIcon 
                icon={faBars} 
                className="aa" 
                onClick={toggleMenu} 
              />
              <p className="menu-item-aa">
                <FontAwesomeIcon icon={faFutbol} className="cc" />
                Sân bóng D2HT
              </p>
            </li>
            
            <li className="menu-item bb">
              <Link className="menu-item-bb" to="/manager/quanlysan" onClick={closeMenu}>
                <FontAwesomeIcon icon={faPeopleRoof} className="cc" />
                Quản lý sân/Quản lý đặt sân
              </Link>
            </li>
            <li className="menu-item bb">
              <Link className="menu-item-bb" to="/manager/quanlykhachhang" onClick={closeMenu}>
                <FontAwesomeIcon icon={faCircleUser} className="cc" />
                Quản lý khách hàng
              </Link>
            </li>
          </ul>
          <li className="navbar-item">
            <Link className="nav-signout" to="/signin">Đăng xuất</Link>
          </li>
        </ul>
      </header>
      <div 
        className={`layout ${menuOpen ? 'show' : ''}`} 
        onClick={closeMenu}
      ></div>
    </>
  );
};

export default ManagerHeader;
