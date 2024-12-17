import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

export default function EditProfileModal({
  onClose,
  handleUpdateUser,
  activeModal,
}) {
  const [name, setName] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarUrlChange = (e) => setAvatarUrl(e.target.value);

  const resetInputs = () => {
    setName("");
    setAvatarUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, avatarUrl });
  };

  React.useEffect(() => {
    if (activeModal) {
      resetInputs();
    }
  }, [activeModal]);

  return (
    <ModalWithForm
      activeModal={activeModal}
      buttonText={"Save changes"}
      title={"Change profile data"}
      onClose={onClose}
      isOpen={activeModal === "edit-profile"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name *
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
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar *
        <input
          id="avatarUrl"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          onChange={handleAvatarUrlChange}
          value={avatarUrl}
        />
      </label>
    </ModalWithForm>
  );
}
