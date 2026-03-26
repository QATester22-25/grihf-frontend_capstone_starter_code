import React from 'react'
import "./Navbar.css";                       
import { Link } from 'react-router-dom';

const Navbar = () => {

    function handleClick() {
        const navLinks = document.querySelector(".nav__links");
        const navIcon = document.querySelector(".nav__icon i");
  
        // Toggle the 'active' class on the navigation links
        navLinks.classList.toggle("active");
  
        // Toggle the Font Awesome icons (bars and times)
        if (navLinks.classList.contains("active")) {
          navIcon.classList.remove("fa-bars");
          navIcon.classList.add("fa-times");
        } else {
          navIcon.classList.remove("fa-times");
          navIcon.classList.add("fa-bars");
        }
      }
      
    return (
        <>
<nav>
  <div class="nav__logo">

    <a href="/">
      Stay Healthy
    </a>

    <span></span>
  </div>

  <div class="nav__icon">

    <i class="fa fa-times fa fa-bars"></i>
  </div>


  <ul class="nav__links active">

    <li class="link">
      <a href="../Landing_Page/LandingPage.html">Home</a>
    </li>

    <li class="link">
      <a href="#">Appointments</a>
    </li>

    <li class="btn">
      <Link to="/SignUp">
        <button class="btn1" onClick={handleClick}>SignUp</button>
     </Link>
    </li>
    <li class="btn">
      <Link to="/Login" >
        <button class="btn1" onClick={handleClick}>Login</button>
      </Link>
    </li>
  </ul>
</nav>
</>
    )
  
}

export default Navbar