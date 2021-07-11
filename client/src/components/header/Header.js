import React from "react";
import ProfileIcon from "../icons/profile";
import GiftIcon from "../icons/gift";
import CalendarIcon from "../icons/calendar";
import UsersIcon from "../icons/users";
import InboxIcon from "../icons/inbox";
import LogoutIcon from "../icons/logout";
import HamburgerIcon from "../icons/hamburger";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { useUser } from "../../hooks/useUser";
import { useClickOutside } from "../../hooks/useClickOutside";
import { DEFAULT_GIFT_THUMB_URL } from "../../data/static";

function Header() {
  const { openModal, closeModal } = useModal();
  const { isAuthenticated, user, logout } = useUser();
  const [menuOpen, setMenuOpen] = React.useState();
  const [hamOpen, setHamOpen] = React.useState();
  const history = useHistory();
  const menuRef = React.useRef();

  const handleToggle = (ev) => {
    ev.preventDefault();
    setMenuOpen((open) => !open);
  };

  useClickOutside(menuRef, () => setMenuOpen(false));

  const onLogout = React.useCallback(() => {
    logout();
    closeModal();
    history.push("/");
  }, [logout, closeModal, history]);

  return (
    <header className="container mx-auto flex justify-between items-center p-4 max-w-7xl xl:px-0">
      <Link to="/">Logo</Link>
      <div className="flex items-center space-x-6">
        <div
          className="border border-gray-600 rounded-lg p-2 md:hidden cursor-pointer"
          onClick={() => setHamOpen((prev) => !prev)}
        >
          <HamburgerIcon />
        </div>
        <nav
          className={`fixed top-20 right-0 bg-purple-600 text-white p-4 rounded-tl-lg rounded-bl-lg transform transition-transform duration-200 ${
            hamOpen ? "translate-x-0" : "translate-x-full"
          } md:static md:transform-none md:bg-white md:text-gray-600 md:p-0`}
        >
          <ul className="flex items-center flex-col md:flex-row">
            <li>
              <NavLink to="/" className="header-link" activeClassName="header-link-active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/create" className="header-link">
                Create
              </NavLink>
            </li>
            <li>
              <NavLink to="/how" className="header-link">
                How it works
              </NavLink>
            </li>
            <li>
              <NavLink to="/story" className="header-link">
                Our story
              </NavLink>
            </li>
          </ul>
        </nav>
        {!isAuthenticated ? (
          <button className="btn-primary py-3" onClick={() => openModal("login")}>
            Login
          </button>
        ) : (
          <details className="relative" open={menuOpen} ref={menuRef}>
            <summary className="cursor-pointer" onClick={handleToggle}>
              <img
                src={user.avatar.url || DEFAULT_GIFT_THUMB_URL}
                alt="avatar"
                className="inline object-cover w-12 h-12 rounded-full"
              />
            </summary>
            <ul className="dropdown max-w-xs right-0">
              <li>
                <Link
                  to="/profile/general"
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
              <li
                className="flex h-14 px-4 items-center cursor-pointer text-gray-600 bg-white hover:bg-gray-50"
                onClick={() =>
                  openModal("confirmation", {
                    heading: "Logout",
                    text: "Are you sure you want to log out of your account?",
                    onConfirm: onLogout,
                    onCancel: closeModal,
                  })
                }
              >
                <LogoutIcon color="text-red-400" />
                <span className="ml-2 text-red-400">Logout</span>
              </li>
            </ul>
          </details>
        )}
      </div>
    </header>
  );
}

export default Header;
