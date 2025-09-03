// src/components/layout/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFutbol,
  faHouse,
  faCalendar,
  faStar,
  faUser,
  faSignOutAlt,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("username");
    setUsername(name || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername("");
    navigate("/signin");
  };

  return (
    <>
      <header className="nav" id="nav">
        <ul className="navbar">
          {/* Hamburger + Logo */}
          <li className="navbar-item navleft">
            <FontAwesomeIcon
              icon={faBars}
              className="ss"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            <p className="nav-sanbong" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faFutbol} className="cc" />
              Sân bóng D2HT
            </p>
          </li>

          {/* Main menu */}
          <ul className={`menu ${menuOpen ? "show" : ""}`}>
            <li className="menu-item bb">
              <Link to="/" className="menu-item-bb" onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faHouse} className="cc" /> Trang chủ
              </Link>
            </li>
            <li className="menu-item bb">
              <Link to="/lichdat" className="menu-item-bb" onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faCalendar} className="cc" /> Quản lý lịch đặt
              </Link>
            </li>
            <li className="menu-item bb">
              <Link to="/danhgia" className="menu-item-bb" onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faStar} className="cc" /> Đánh giá chất lượng sân
              </Link>
            </li>
          </ul>

          {/* User dropdown */}
          <li className="navbar-item user-dropdown">
            <div className="user-display" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <FontAwesomeIcon icon={faUser} className="user-icon" />
              <span className="username">{username || "Chưa đăng nhập"}</span>
            </div>

            <div className={`user-menu ${userMenuOpen ? "show" : ""}`}>
              <div className="user-menu-header">
                <FontAwesomeIcon icon={faUser} className="user-icon-large" />
                <span className="username-large">{username || "Chưa đăng nhập"}</span>
              </div>
              <div className="user-menu-items">
                {username ? (
                  <>
                    <Link
                      to="/userin4"
                      className="user-menu-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                    </Link>
                    <div
                      className="user-menu-item"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
                      <span>Đăng xuất</span>
                    </div>
                  </>
                ) : (
                  <Link
                    to="/signin"
                    className="user-menu-item"
                    onClick={() => setUserMenuOpen(false)}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FontAwesomeIcon icon={faRightToBracket} className="menu-icon" />
                    <span>Đăng nhập</span>
                  </Link>
                )}
              </div>
            </div>
          </li>
        </ul>
      </header>

      {/* Overlay đóng menu */}
      <div
        className={`layout ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>
      <div
        className={`layout-user ${userMenuOpen ? "show" : ""}`}
        onClick={() => setUserMenuOpen(false)}
      ></div>
    </>
  );
};

export default Header;
