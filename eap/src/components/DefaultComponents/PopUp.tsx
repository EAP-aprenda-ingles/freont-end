"use client";
import { useEffect, useState } from "react";
import style from "../../../styles/DefaultComponents/popup.module.scss";

const PopUp = (props: {
  className?: string;
  children: string | JSX.Element | JSX.Element[] | React.ReactNode;
  cancelcallback: () => void;
}) => {
  const [show, setShow] = useState(false);

  const cancellFunction = () => {
    setShow(false);
    setTimeout(() => {
      props.cancelcallback();
    }, 200);
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 50);

    return () => {
      setShow(true);
    };
  }, []);

  return (
    <div
      className={`${style.globalPopup} ${show && style.show} ${
        props.className
      }`}
      onClick={(e) => {
        e.stopPropagation();
        cancellFunction();
      }}
    >
      <div className={style.childrenArea} onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};
export default PopUp;
