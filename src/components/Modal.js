import React from "react";

const Modal = ({openModal, hideModal, children}) => {
  return (
      openModal && (
        <div className="modalBackground" onClick={hideModal}>
          <div className="modalContainer">
             {children}
          </div>
        </div>)    
  )
};
export default Modal;