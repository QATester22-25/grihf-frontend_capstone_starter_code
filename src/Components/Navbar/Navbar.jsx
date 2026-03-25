import React from 'react'
import "./Navbar.css";                       

const Navbar = () => {
    return (
        <>
<nav>
  <div class="nav__logo">

    <a href="/">
      Stay <img src="/" alt="logo" class="logo_icon"/> Healthy

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
      <a href="../Sign_Up/Sign_Up.html">
        <button class="btn1">Sign Up</button>
      </a>
    </li>

    <li class="btn">
      <a href="../Login/Login.html">
        <button class="btn1">Login</button>
      </a>
    </li>
  </ul>
</nav>
</>
    )
}

export default Navbar