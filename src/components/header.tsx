import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/logo.svg";

export const Header: React.FC = () => {
  const { data } = useMe();
  const onScroll = () => {
    const header = document.getElementById("main-header");
    const sticky = header?.offsetTop || 0;

    if (header) {
      if (window.pageYOffset > sticky) {
        header.style.position = "fixed";
        header.style.zIndex = "30";
      } else {
        header.style.position = "static";
        header.style.zIndex = "0";
      }
    }
  };
  useEffect(() => {
    window.onscroll = () => onScroll();
  });
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-trueGray-200 text-base text-center z">
          <span>Please verify your email.</span>
        </div>
      )}
      <header id="main-header" className="py-5 bg-white w-full transition-all">
        <div className="px-5 lg:px-16 mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={nuberLogo} alt="nuber logo" className="w-36" />
          </Link>
          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUserAlt} className="text-lg" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
