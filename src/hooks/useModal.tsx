import { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState<boolean>(false);
  const toggle = (): void => {
    setShow(!show);
  };

  return { show, toggle };
};

export default useModal;
