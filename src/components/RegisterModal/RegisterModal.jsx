import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

export default function RegisterModal({
  onClose,
  handleRegistration,
  activeModal,
}) {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleAvatarUrlChange = (e) => {
    setAvatar(e.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({ email, password, name, avatar });
  };

  useEffect(() => {
    if (activeModal) {
      resetInputs();
    }
  }, [activeModal]);

  return (
    <ModalWithForm
      activeModal={activeModal}
      buttonText="Next"
      title="Sign Up"
      onClose={onClose}
      isOpen={activeModal === "register"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          id="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          id="password"
          type="password"
          className="modal__input"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
      </label>
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
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
        <input
          id="avatar"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          onChange={handleAvatarUrlChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}
