import React, { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (show) document.body.classList.add("noscroll");
    else document.body.classList.remove("noscroll");
  }, [show]);
  if (show) {
    return (
      <div
        ref={modalOverlay}
        className="modal_overlay"
        onMouseDown={(event: React.MouseEvent<HTMLDivElement>): void => {
          if (event.target === modalOverlay.current) {
            toggle();
          }
        }}
      >
        <div className="modal">
          <div className="modal_header">
            <h2>{title && title}</h2>
            <button onClick={toggle}>X</button>
          </div>
          <div className="modal_body">{children}</div>
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
