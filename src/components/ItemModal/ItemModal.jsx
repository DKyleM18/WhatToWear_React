import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

export default function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = card.owner === currentUser?._id;

  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwner ? "" : "modal__delete-button_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-description">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={onDelete}
            type="button"
            className={itemDeleteButtonClassName}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
