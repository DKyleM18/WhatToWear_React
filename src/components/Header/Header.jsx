import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";

export default function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <div className="header__locale">
        <p className="header__date">{currentDate},&nbsp;</p>
        <p className="header__place">{weatherData.city}</p>
      </div>
      <div className="header__wrapper">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          className="header__button"
          type="button"
        >
          + Add Clothes
        </button>
        <p className="header__user">Terrence Tegegne</p>
        <img src={avatar} alt="" className="header__avatar" />
      </div>
    </header>
  );
}
