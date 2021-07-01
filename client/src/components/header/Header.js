import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

function Header() {
  const { openModal } = useModal();
  return (
    <header className="container mx-auto flex justify-between items-center py-4 max-w-7xl">
      <Link to="/">Logo</Link>
      <nav>
        <ul className="flex items-center gap-8">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/how">How it works</NavLink>
          </li>
          <li>
            <NavLink to="/story">Our story</NavLink>
          </li>
          <li>
            <button className="btn-primary py-3" onClick={() => openModal("login")}>
              Login
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
