import React, { useState } from "react";
import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  const [currentTempuratureUnit, handleToggleSwitchChange] = useState("C");

  function handleToggle() {
    if (currentTempuratureUnit === "C") handleToggleSwitchChange("F");
    if (currentTempuratureUnit === "F") handleToggleSwitchChange("C");
  }

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__input"
        onChange={handleToggle}
      />
      <span
        className={
          currentTempuratureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTempuratureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTempuratureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
}
