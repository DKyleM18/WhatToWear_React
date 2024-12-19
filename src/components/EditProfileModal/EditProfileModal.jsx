import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

export default function EditProfileModal({
  onClose,
  handleUpdateUser,
  activeModal,
  isLoading,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarUrlChange = (e) => setAvatarUrl(e.target.value);

  const fillInputs = () => {
    setName(currentUser.name);
    setAvatarUrl(currentUser.avatar);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, avatar: avatarUrl });
  };

  React.useEffect(() => {
    if (activeModal) {
      fillInputs();
    }
  }, [activeModal]);

  return (
    <ModalWithForm
      activeModal={activeModal}
      buttonText={isLoading ? "Saving..." : "Save changes"}
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
          onChange={handleNameChange}
          value={name || ""}
          required
        />
      </label>
      <label htmlFor="editProfileAvatar" className="modal__label">
        Avatar *
        <input
          id="editProfileAvatar"
          type="url"
          className="modal__input"
          onChange={handleAvatarUrlChange}
          value={avatarUrl || ""}
        />
      </label>
    </ModalWithForm>
  );
}
