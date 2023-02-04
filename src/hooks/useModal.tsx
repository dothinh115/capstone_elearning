import React, { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState<boolean>(false);
  const toggle = (): void => {
    if (window.innerWidth <= 600 && show === true) {
      setTimeout(() => {
        setShow(!show);
      }, 100);
    } else setShow(!show);
  };
  const forceToggle = (bool: boolean): void => {
    if (window.innerWidth <= 600 && show === true) {
      setTimeout(() => {
        setShow(bool);
      }, 100);
    } else setShow(bool);
  };
  return { show, toggle, forceToggle };
};

export default useModal;
