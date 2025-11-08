import { Button, Paragraph, SideSheet } from "evergreen-ui";
import { MenuIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const user = localStorage.getItem("user");
  const userJson = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#08123b70] backdrop-blur-md border-b border-[#FFD400]/30 shadow-[0_0_10px_rgba(255,212,0,0.2)]">
      <div className="w-[90%] lg:w-[80%] mx-auto flex justify-between items-center py-4 lg:py-3 text-white">
        {/* Logo */}
        <Link
          to="/"
          className="font-[Stylish] text-[22px] md:text-[26px] tracking-wide hover:text-[#FFD400] transition-colors duration-300"
        >
          HACKFEST ’25
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 font-[Stylish] text-[18px]">
           <Link
          to="/" className="hover:text-[#FFD400] transition">
            Home
          </Link>
          <a href="#about" className="hover:text-[#FFD400] transition">
            About
          </a>
          <a href="#rules" className="hover:text-[#FFD400] transition">
            Rules
          </a>
             <a href="#faq" onClick={() => setIsShown(false)}>
                FAQ
              </a>
          <a href="#contact" className="hover:text-[#FFD400] transition">
            Contact
          </a>

          {user ? (
            userJson?.email === "admin@mail.sjctni.edu" ? (
              <Link to="/admin" className="hover:text-[#FFD400] transition">
                Admin
              </Link>
            ) : (
              <Link to="/profile" className="hover:text-[#FFD400] transition">
                Profile
              </Link>
            )
          ) : (
            <></>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="hover:text-[#FFD400] transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#FFD400] transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-[#FFD400] transition">
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <Button
            onClick={() => setIsShown(true)}
            border="none"
            background="transparent"
          >
            <MenuIcon className="text-white" size={28} />
          </Button>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <SideSheet
        isShown={isShown}
        onCloseComplete={() => setIsShown(false)}
        width={260}
        className="bg-[#08123B]"
        shouldCloseOnOverlayClick={true}
      >
        <Paragraph
          height="100vh"
          backgroundColor="#08123B"
          className="flex flex-col items-center justify-center py-12"
        >
          <ul className="flex flex-col items-center gap-5 text-white text-[18px] font-[Stylish]">
            <li>
              <Link to="/" onClick={() => setIsShown(false)}>
                    Home
                  </Link>
            </li>
            <li>
              <a href="#about" onClick={() => setIsShown(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#rules" onClick={() => setIsShown(false)}>
                Rules
              </a>
            </li>
            {/* Mobile FAQ trigger */}
            <li>
              <a href="#faq" onClick={() => setIsShown(false)}>
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setIsShown(false)}>
                Contact
              </a>
            </li>

            {user ? (
              userJson?.email === "admin@mail.sjctni.edu" ? (
                <li>
                  <Link to="/admin" onClick={() => setIsShown(false)}>
                    Admin
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/profile" onClick={() => setIsShown(false)}>
                    Profile
                  </Link>
                </li>
              )
            ) : (
              <></>
            )}

            {user ? (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsShown(false);
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsShown(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setIsShown(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </Paragraph>
      </SideSheet>
    </header>
  );
};

export default Navbar;
