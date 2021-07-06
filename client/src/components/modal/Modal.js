import React from "react";
import Portal from "../portal/Portal";
import modalComponents from "../../hooks/useModalComponents";
import { useModal } from "../../hooks/useModal";

function Modal({ children }) {
  const { modal, closeModal } = useModal();
  const [active, setActive] = React.useState(false);
  const lockBodyScroll = () => {
    const prevWidth = document.body.offsetWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = Math.abs(prevWidth - document.body.offsetWidth) + "px";
  };

  const unlockBodyScroll = () => {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = 0;
  };

  const clickHandler = (ev) => {
    if (ev.target === ev.currentTarget) closeModal();
  };

  const transitionEnd = () => setActive(modal.open);

  React.useEffect(() => {
    const keyHandler = (ev) => ev.which === 27 && closeModal();

    if (modal.open) {
      window.setTimeout(() => {
        document.activeElement.blur();
        setActive(true);
        document.querySelector("#root").setAttribute("inert", "true");
      }, 10);
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }

    window.addEventListener("keyup", keyHandler);

    return () => {
      window.removeEventListener("keyup", keyHandler);
    };
  }, [modal.open, closeModal]);

  return (
    <Portal>
      {(modal.open || active) && (
        <div
          onClick={clickHandler}
          onTransitionEnd={transitionEnd}
          className={`fixed w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-50 top-0 left-0 transform transition-transform duration-200 ${
            active && modal.open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {modalComponents[modal.name]?.(modal.props) || children}
        </div>
      )}
    </Portal>
  );
}

export default React.memo(Modal);
