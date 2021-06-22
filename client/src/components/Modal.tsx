import React from 'react';

interface ModalProps {
  isLoading: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirmAction: () => void;
  actionName: string;
  actionDescription: string;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const Modal: React.FC<ModalProps> = ({
  isLoading,
  setOpenModal,
  confirmAction,
  actionName,
  actionDescription,
}) => {
  return (
    <div className="background" onClick={() => setOpenModal(false)}>
      <div className="modal">
        <div className="modal__container" onClick={(e) => e.stopPropagation()}>
          <button
            className="modal__close-btn"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
          <h1 className="modal__title">
            Are You Sure You Want to {capitalizeFirstLetter(actionName)}?
          </h1>
          <div className="modal__body">
            <p>{capitalizeFirstLetter(actionDescription)}</p>
          </div>
          <div className="modal__footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              className="modal__cancel-btn"
            >
              Cancel
            </button>
            <button
              className="modal__confirm-btn"
              onClick={confirmAction}
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'Loading...' : 'Yes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
