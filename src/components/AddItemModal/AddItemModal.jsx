import "./AddItemModal.css";
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({ onClose, onAddItem, activeModal }) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, weather, imageUrl }).then(
      () => setName(""),
      setImageUrl(""),
      setWeather("")
    );
  };

  return (
    <ModalWithForm
      activeModal={activeModal}
      buttonText="Add garment"
      title="New garment"
      onClose={onClose}
      isOpen={activeModal === "add-garment"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          id="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          id="imageUrl"
          type="url"
          className="modal__input"
          placeholder="Image URL"
          onChange={handleUrlChange}
          value={imageUrl}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            id="hot"
            value="hot"
            className="modal__radio-input"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
            required
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            id="warm"
            value="warm"
            className="modal__radio-input"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
            required
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            id="cold"
            value="cold"
            className="modal__radio-input"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
            required
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
