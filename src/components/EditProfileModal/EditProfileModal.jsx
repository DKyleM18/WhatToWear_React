import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

export default function EditProfileModal({
  onClose,
  handleUpdateUser,
  activeModal,
}) {
  const currentUser = React.useContext(CurrentUserContext);

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
      <label htmlFor="editProfileName" className="modal__label">
        Name *
        <input
          id="editProfileName"
          type="text"
          className="modal__input"
          placeholder={currentUser.name}
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>
      <label htmlFor="editProfileAvatar" className="modal__label">
        Avatar *
        <input
          id="editProfileAvatar"
          type="url"
          className="modal__input"
          placeholder={currentUser.avatar}
          onChange={handleAvatarUrlChange}
          value={avatarUrl}
        />
      </label>
    </ModalWithForm>
  );
}
