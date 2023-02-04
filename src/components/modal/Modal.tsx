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
  const modal = useRef<HTMLDivElement | null>(null);
  const { pathname, state } = useLocation();

  const outModalHandle = (): void => {
    if (
      pathname.indexOf("/profile/courses_manage/") !== -1 &&
      state?.from === "/profile/courses_manage"
    )
      history.back();
    else {
      history.push("/profile/courses_manage");
    }
    toggle();
    modal.current!.style.transform = "translateY(100%)";
  };

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
        <div ref={modal} className="modal">
          <div className="modal_header">
            <h2>{title && title}</h2>
            <button onClick={outModalHandle}>X</button>
          </div>
          <div className="modal_body">{children}</div>
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
