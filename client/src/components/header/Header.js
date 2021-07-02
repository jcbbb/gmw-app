import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { useUser } from "../../hooks/useUser";

function Header() {
  const { openModal } = useModal();
  const { isAuthenticated, user } = useUser();
  return (
    <header className="container mx-auto flex justify-between items-center py-4 max-w-7xl">
      <Link to="/">Logo</Link>
      <nav>
        <ul className="flex items-center space-x-8">
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
          {!isAuthenticated ? (
            <li>
              <button className="btn-primary py-3" onClick={() => openModal("login")}>
                Login
              </button>
            </li>
          ) : (
            <details className="relative">
              <summary className="cursor-pointer">
                <img
                  src="https://i.pravatar.cc/300"
                  alt="avatar"
                  className="inline object-cover w-12 h-12 rounded-full"
                />
              </summary>
              <ul className="absolute shadow-md w-screen max-w-xs right-0 rounded-lg">
                <li>
                  <Link
                    to="/profile"
                    className="flex p-4 text-gray-600 bg-white hover:bg-gray-50 duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="ml-2 text-gray-600">Profile</span>
                  </Link>
                </li>
              </ul>
            </details>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
