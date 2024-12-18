import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { removeToken } from "../../utils/token";
import "./SideBar.css";

export default function SideBar({ handleEditClick, handleLogoutClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__avatar-wrapper">
        {currentUser?.avatar ? (
          <img src={currentUser?.avatar} alt="" className="header__avatar" />
        ) : (
          <p className="header__default-avatar">
            {currentUser?.name.charAt(0).toUpperCase() || "T"}
          </p>
        )}
        <p className="sidebar__user">
          {currentUser?.name || "Terrence Tegegne"}
        </p>
      </div>
      <div className="sidebar__buttons">
        <button
          type="button"
          className="sidebar__button"
          onClick={handleEditClick}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__button"
          onClick={handleLogoutClick}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
