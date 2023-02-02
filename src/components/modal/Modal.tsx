import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { history } from "../../App";
type Props = {
  title?: string;
  children: JSX.Element;
  show: boolean;
  toggle: any;
};

const Modal = ({
  title,
  children,
  show,
  toggle,
}: Props): JSX.Element | null => {
  const modalOverlay = useRef<HTMLDivElement | null>(null);
  const { pathname, search } = useLocation();
  const toggleModal = (): void => {
    history.push(pathname + search);
    toggle();
  };
  useEffect(() => {
    if (show) document.getElementById("root")?.classList.add("noscroll");
    else document.getElementById("root")?.classList.remove("noscroll");
  });
  if (show) {
    return (
      <>
        <div
          ref={modalOverlay}
          className="modal_overlay"
          onMouseDown={(event: React.MouseEvent<HTMLDivElement>): void => {
            if (event.target === modalOverlay.current) {
              toggleModal();
            }
          }}
        >
          <div className="modal">
            <div className="modal_header">
              <h2>{title && title}</h2>
              <button onClick={toggleModal}>X</button>
            </div>
            <div className="modal_body">{children}</div>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default Modal;
