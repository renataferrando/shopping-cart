import React from "react";
import Drawer from "../drawer/Drawer";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import "./_success-modal.scss";

const SuccessModal = ({ isOpen, onClose, title, text, onClick, btnLabel }) => {
  const navigate = useNavigate();
  return (
    <Drawer
      className="succes-registration"
      position="center"
      width="200px"
      isOpen={isOpen}
      onClose={onClose}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1"
        viewBox="0 0 309 275"
        height="150px"
        width="150px"
      >
        <path
          id="circle"
          d="M127.5 18.5c-27.3 3.7-50.7 16.2-70.7 37.3-15 16-24.5 34.4-29.4 56.7-2.4 11.1-2.4 36 0 47 5.9 26.8 18.1 47.7 38.6 66 30.7 27.3 77 36.6 116.5 23.3 34.6-11.6 63.2-39.8 74.8-73.8 4.6-13.5 6.2-23.3 6.2-39 0-35.7-13.5-65.3-40.6-89.5-25.2-22.5-60.6-32.9-95.4-28zm40 6c11.2 2.3 18.5 5 29.7 10.7 49.9 25.4 73.8 84.3 55.6 137.3-13.2 38.7-44.8 66.4-85.8 75.2-11.6 2.5-33.4 2.5-45 0-11.6-2.5-18.9-5.1-30.1-10.8C29 204.8 10.6 123.4 53.6 67c5.5-7.3 19.5-20.6 26.4-25.1 13.7-9.1 30.9-15.8 47-18.4 10.6-1.8 29.6-1.3 40.5 1z"
        ></path>
        <path
          id="check"
          d="M169.5 131l-39 39-20.1-20.1c-16.5-16.5-20.5-20-22.5-19.7-1.7.2-2.5 1-2.7 2.8-.2 2.1 3.5 6.2 22.2 24.8 19.3 19.3 22.6 22.2 24.2 21.4 1.1-.6 20.3-19.5 42.8-42 37.5-37.6 40.7-41.1 39.7-43.1-2.6-4.8-4.4-3.3-44.6 36.9z"
        ></path>
      </svg>
      <h4>{title}</h4>
      <p>{text}</p>
      <Button onClick={onClick} label={btnLabel} />
    </Drawer>
  );
};

export default SuccessModal;
