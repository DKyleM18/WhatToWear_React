import "./LoginModal.css";
import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  onClose,
  handleLogin,
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

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  useEffect(() => {
    if (activeModal) {
      resetInputs();
    }
  }, [activeModal]);

  return (
    <ModalWithForm
      activeModal={activeModal}
      buttonText={isLoading ? "Logging In..." : "Log In"}
      title="Log in"
      onClose={onClose}
      isOpen={activeModal === "login"}
      onSubmit={handleSubmit}
      altButtonClick={handleRegisterClick}
      altButtonText="Or Sign Up"
    >
      <label htmlFor="loginEmail" className="modal__label">
        Email{" "}
        <input
          id="loginEmail"
          type="email"
          className="modal__input"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email || ""}
          required
        />
      </label>
      <label htmlFor="loginPassword" className="modal__label">
        Password{" "}
        <input
          id="loginPassword"
          type="password"
          className="modal__input"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password || ""}
          required
        />
      </label>
    </ModalWithForm>
  );
}
