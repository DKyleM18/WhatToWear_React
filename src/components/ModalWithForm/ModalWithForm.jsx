import "./ModalWithForm.css";

export default function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  onClose,
  isOpen,
  onSubmit,
  register,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form action="" onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            <button
              type="button"
              className="modal__register-button"
              onClick={register}
            >
              or Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
