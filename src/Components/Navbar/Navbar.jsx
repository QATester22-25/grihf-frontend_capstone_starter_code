/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeDropdownView, setActiveDropdownView] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    // remove email phone
    localStorage.removeItem("doctorData");
    setIsLoggedIn(false);
    // setUsername("");

    // Remove the reviewFormData from local storage
    localStorage.removeItem('reviewFormDataMap');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("reviewFormData_")) {
        localStorage.removeItem(key);
      }
    }
    setEmail("");
    window.location.reload();
  };
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (showDropdown) {
      setActiveDropdownView(null);
    }
  };
  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");

    if (storedName) {
      setIsLoggedIn(true);
      setUsername(storedName);
      setEmail(storedEmail);
      setPhone(sessionStorage.getItem("phone") || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // On route change, hide dropdown content to avoid stale UI.
    setActiveDropdownView(null);
    setShowDropdown(false);
  }, [location]);
  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">StayHealthy</Link>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={click ? "nav__links active" : "nav__links"}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/search/doctors">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/healthblog">Health Blog</Link>
        </li>
        <li className="link">
          <Link to="/reviews">Reviews</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="link profile-dropdown-wrapper">
              <button className="profile-dropdown-btn username-display" onClick={handleDropdown} type="button">
                Hi, {username}
              </button>

              {showDropdown && (
                <div className="profile-dropdown-menu">
                  <div className="profile-dropdown-tabs">
                    <button
                      type="button"
                      className={activeDropdownView === 'profile' ? 'active' : ''}
                      onClick={() => setActiveDropdownView('profile')}
                    >
                      Your Profile
                    </button>
                    <button
                      type="button"
                      className={activeDropdownView === 'reports' ? 'active' : ''}
                      onClick={() => {
                        setActiveDropdownView('reports');
                        setShowDropdown(false);
                        navigate('/reports');
                      }}
                    >
                      Your Reports
                    </button>
                  </div>

                  <div className="profile-dropdown-content">
                    {activeDropdownView === 'profile' && (
                      <ProfileCard name={username} email={email} phone={phone} />
                    )}
                  </div>
                </div>
              )}
            </li>
            <li className="link">
              <button className="btn1" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>

    </nav>
  );
};

export default Navbar;
