import React from 'react'
import "./Navbar.css";                       
import { Link } from 'react-router-dom';

const Navbar = () => {

    function handleClick() {
        const navLinks = document.querySelector(".nav__links");
        const navIcon = document.querySelector(".nav__icon i");
  
        
        navLinks.classList.toggle("active");
  
       
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

  </div>

  <div class="nav__icon">

    <i class="fa fa-times fa fa-bars"></i>
  </div>


  <ul class="nav__links active">

    <li class="link">
    <Link to="/">Home</Link>
    </li>

    <li class="link">
    <Link to="/Appointments">Appointments</Link>
    </li>

    <li class="link">
      <Link to="/SignUp">
       SignUp
     </Link>
    </li>
    <li class="link">
      <Link to="/Login" >
       Login
      </Link>
    </li>
  </ul>
</nav>
</>
    )
  
}

export default Navbar