import { useEffect, useRef } from "react";
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
  const { pathname, state, search } = useLocation();

  const outModalHandle = () => {
    const urlSplit: string[] = pathname.split("/");

    if (state?.inside) {
      history.back();
    } else if (search) {
      toggle();
    } else {
      urlSplit.pop();
      const urlJoin: string | undefined = urlSplit?.join("/");
      if (urlJoin === "") toggle();
      else history.push(urlSplit.join("/"));
    }
  };

  useEffect(() => {
    if (show) document.body.classList.add("noscroll");
    else document.body.classList.remove("noscroll");
  }, [show]);

  useEffect(() => {
    document.addEventListener("mousedown", (event: any) => {
      if (event.target === modalOverlay.current!) outModalHandle();
    });
    return () => {
      document.body.classList.remove("noscroll");
    };
  }, []);

  if (show) {
    return (
      <div ref={modalOverlay} className="modal_overlay">
        <div className="modal">
          <div className="modal_header">
            <button onClick={outModalHandle}>
              {state?.inside ? <i className="fa-solid fa-arrow-left"></i> : "X"}
            </button>
            <h2>{title && title}</h2>
          </div>
          <div className="modal_body">{children}</div>
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
