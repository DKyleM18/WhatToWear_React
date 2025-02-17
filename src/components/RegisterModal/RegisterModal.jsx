import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

export default function RegisterModal({
  onClose,
  handleRegistration,
  activeModal,
  setActiveModal,
  isLoading,
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

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  useEffect(() => {
    if (activeModal) {
      resetInputs();
    }
  }, [activeModal]);

  return (
    <ModalWithForm
      activeModal={activeModal}
      buttonText={isLoading ? "Signing up..." : "Next"}
      title="Sign Up"
      altButtonText="Log In"
      onClose={onClose}
      isOpen={activeModal === "register"}
      onSubmit={handleSubmit}
      altButtonClick={handleLoginClick}
    >
      <label htmlFor="registerEmail" className="modal__label">
        Email{" "}
        <input
          id="registerEmail"
          type="email"
          className="modal__input"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email || ""}
          required
        />
      </label>
      <label htmlFor="registerPassword" className="modal__label">
        Password{" "}
        <input
          id="registerPassword"
          type="password"
          className="modal__input"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password || ""}
          required
        />
      </label>
      <label htmlFor="registerName" className="modal__label">
        Name{" "}
        <input
          id="registerName"
          type="text"
          className="modal__input"
          placeholder="Name"
          onChange={handleNameChange}
          value={name || ""}
          required
        />
      </label>
      <label htmlFor="registerAvatar" className="modal__label">
        Avatar URL{" "}
        <input
          id="registerAvatar"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          onChange={handleAvatarUrlChange}
          value={avatar || ""}
        />
      </label>
    </ModalWithForm>
  );
}
