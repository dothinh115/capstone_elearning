import React, { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState<boolean>(false);
  const toggle = (): void => {
    if (window.innerWidth <= 600 && show === true) {
      setTimeout(() => {
        setShow(!show);
      }, 300);
    } else setShow(!show);
  };
  return { show, toggle };
};

export default useModal;
