import React, { useEffect, useRef } from "react";
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
              history.push(window.location.pathname);
              toggle();
            }
          }}
        >
          <div className="modal">
            <div className="modal_header">
              <h2>{title && title}</h2>
              <button
                onClick={(): void => {
                  history.push(window.location.pathname);
                  toggle();
                }}
              >
                X
              </button>
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
