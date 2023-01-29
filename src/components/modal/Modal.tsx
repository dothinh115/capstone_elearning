import React, { ReactElement, useEffect, useRef } from "react";

type Props = {
  title?: string;
  children: JSX.Element;
  show: boolean;
  toggle: any;
};

const Modal = ({ title, children, show, toggle }: Props): JSX.Element => {
  const modalOverlay = useRef<HTMLDivElement | null>(null);
  const toggleModal = (event: any): void => {
    if (event.target === modalOverlay.current) toggle();
  };
  useEffect(() => {
    document.addEventListener("click", toggleModal);
  }, []);
  if (show) {
    return (
      <>
        <div ref={modalOverlay} className="modal_overlay"></div>
        <div className="modal">
          <div className="modal_header">
            <h2>{title && title}</h2>
            <button onClick={toggle}>X</button>
          </div>
          <div className="modal_body">{children}</div>
        </div>
      </>
    );
  }
  return <></>;
};

export default Modal;
