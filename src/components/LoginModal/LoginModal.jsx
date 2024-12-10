import "./LoginModal.css";
import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({ onClose, onLogin, activeModal }) {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  useEffect(() => {
    if (activeModal) {
      resetInputs();
    }
  }, [activeModal]);

  return (
    <ModalWithForm
      activeModal={activeModal}
      buttonText="Log in"
      title="Log in"
      onClose={onClose}
      isOpen={activeModal === "login"}
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
    </ModalWithForm>
  );
}
