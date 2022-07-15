import { useRef, useEffect, forwardRef } from 'react';
import { createPortal } from "react-dom";
import cn from 'classnames';
import './_drawer.scss'
import useMountTransition from "./useMountTransition";

function createPortalRoot() {
    
    const drawerRoot = document.createElement("div");
    drawerRoot.setAttribute("id", "drawer-root");
  
    return drawerRoot;
  }

const Drawer = forwardRef(
  ({
  isOpen,
  children,
  className,
  onClose,
  position = {position},
  width = {width},
  removeWhenClosed = true,
  positionCloseRight,
  closeBtn,
  ...r
  }, ref,
) => {

  
  const bodyRef = useRef(document.querySelector('body'));
  const portalRootRef = useRef(
    document.getElementById("drawer-root") || createPortalRoot()
    );
  const isTransitioning = useMountTransition(isOpen, 300);

  useEffect(() => {
    bodyRef.current.appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    const bodyEl = bodyRef.current;

    return () => {
      // Clean up the portal when drawer component unmounts
      // portal.remove(); 
      // Ensure scroll overflow is removed
      bodyEl.style.overflow = "";
    };
  }, []);

  useEffect(() => {
  const updatePageScroll = () => {
        if (isOpen) {
        bodyRef.current.style.overflow = 'scroll'; //cambiar a hidden en caso de no querer que mueva
        } else {
        bodyRef.current.style.overflow = '';
        }
    };
    updatePageScroll();
    }, [isOpen]);

    useEffect(() => {
    const onKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keyup", onKeyPress);
    }

    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }
  
  return createPortal(
      <>
      <div
        aria-hidden={isOpen ? "false" : "true"}
        className={cn("drawer-container", {
          open: isOpen,
          in: isTransitioning,
          className
        })}
      >
        <div className={cn("drawer", position, width, className, children)} role="dialog">
                {closeBtn && <svg onClick={onClose} className={positionCloseRight ? "close-right" : "close-left"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  width="28" height="28">
                  <path
                      fill="#272727"
                      fillRule="evenodd"
                      d="M12 10.586l4.243-4.243a1 1 0 111.414 1.414L13.414 12l4.243 4.243a1 1 0 11-1.414 1.414L12 13.414l-4.243 4.243a1 1 0 11-1.414-1.414L10.586 12 6.343 7.757a1 1 0 111.414-1.414L12 10.586z"
                      clipRule="evenodd"
                ></path>
                </svg>}
          { children }
        </div>
        <div className="backdrop" onClick={onClose} />
      </div>
      </>,
      portalRootRef.current 
  );
},
);
export default Drawer;


  
