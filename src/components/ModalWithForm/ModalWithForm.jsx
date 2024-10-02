import "./ModalWithForm.css";

export default function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  onClose,
  isOpen,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form action="" className="modal__form">
          {children}
          <button type="submit" className="modal__submit" disabled>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
