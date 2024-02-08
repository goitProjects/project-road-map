import { useEffect, useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  const open = content => {
    setData(content);
  };

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [isOpen]);
  return { isOpen, close, toggle, open, data };
};

export default useModal;
