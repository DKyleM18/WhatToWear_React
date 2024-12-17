import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export default function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginClick,
  handleRegisterClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <div className="header__locale">
        <p className="header__date">{currentDate},&nbsp;</p>
        <p className="header__place">{weatherData.city}</p>
      </div>
      <div className="header__wrapper">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              className="header__button"
              type="button"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__profile">
                <p className="header__user">
                  {currentUser?.name || "Terrence Tegegne"}
                </p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser?.avatar}
                    alt=""
                    className="header__avatar"
                  />
                ) : (
                  <p className="header__default-avatar">
                    {currentUser?.name[0].toUpperCase() || "T"}
                  </p>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__buttons">
            <button
              onClick={handleRegisterClick}
              className="header__button"
              type="button"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              className="header__button"
              type="button"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
