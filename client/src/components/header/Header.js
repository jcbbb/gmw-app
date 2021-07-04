import React from "react";
import ProfileIcon from "../icons/profile";
import GiftIcon from "../icons/gift";
import CalendarIcon from "../icons/calendar";
import UsersIcon from "../icons/users";
import InboxIcon from "../icons/inbox";
import LogoutIcon from "../icons/logout";
import { NavLink, Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { useUser } from "../../hooks/useUser";
import { useClickOutside } from "../../hooks/useClickOutside";

function Header() {
  const { openModal } = useModal();
  const { isAuthenticated, user } = useUser();
  const [menuOpen, setMenuOpen] = React.useState();
  const menuRef = React.useRef();

  const handleToggle = (ev) => {
    ev.preventDefault();
    setMenuOpen((open) => !open);
  };

  useClickOutside(menuRef, () => setMenuOpen(false));

  return (
    <header className="container mx-auto flex justify-between items-center p-4 max-w-7xl xl:px-0">
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
            <details className="relative" open={menuOpen} ref={menuRef}>
              <summary className="cursor-pointer" onClick={handleToggle}>
                <img
                  src={user.avatar.url}
                  alt="avatar"
                  className="inline object-cover w-12 h-12 rounded-full"
                />
              </summary>
              <ul className="dropdown max-w-xs right-0">
                <li>
                  <Link
                    to="/profile"
                    className="flex h-14 px-4 items-center text-gray-600 bg-white hover:bg-gray-50 duration-200"
                  >
                    <ProfileIcon />
                    <span className="ml-2 text-gray-600">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-events"
                    className="flex h-14 px-4 items-center text-gray-600 bg-white hover:bg-gray-50 duration-200"
                  >
                    <GiftIcon />
                    <span className="ml-2 text-gray-600">My events</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/friends-events"
                    className="flex h-14 px-4 items-center text-gray-600 bg-white hover:bg-gray-50 duration-200"
                  >
                    <CalendarIcon />
                    <span className="ml-2 text-gray-600">Friends' events</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/friends"
                    className="flex h-14 px-4 items-center text-gray-600 bg-white hover:bg-gray-50 duration-200"
                  >
                    <UsersIcon />
                    <span className="ml-2 text-gray-600">Friends</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/messages"
                    className="flex h-14 px-4 items-center text-gray-600 bg-white hover:bg-gray-50 duration-200"
                  >
                    <InboxIcon />
                    <div className="ml-2 text-gray-600 flex items-center justify-between w-full">
                      <span>Messages</span>
                      <span className="inline-block w-6 h-6 text-center bg-purple-600 rounded-full text-white font-xs">
                        2
                      </span>
                    </div>
                  </Link>
                </li>
                <hr className="border-t-2 border-gray-100" />
                <li>
                  <Link
                    to="/logout"
                    className="flex h-14 px-4 items-center text-gray-600 bg-white hover:bg-gray-50"
                  >
                    <LogoutIcon color="text-red-400" />
                    <span className="ml-2 text-red-400">Logout</span>
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
