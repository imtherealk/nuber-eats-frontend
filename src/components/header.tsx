import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/logo.svg";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <header className="py-5">
      <div className="w-full  px-5 xl:px-1 max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={nuberLogo} alt="nuber logo" className="w-36" />
        </Link>
        <span className="text-xs">
          <Link to="/my-profile">
            <FontAwesomeIcon icon={faUserAlt} className="text-lg" />
          </Link>
        </span>
      </div>
    </header>
  );
};
