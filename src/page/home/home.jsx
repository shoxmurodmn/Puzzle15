import React from "react";
import { FaHome } from "react-icons/fa";
import { Outlet, NavLink } from "react-router-dom";
import { IoStatsChart } from "react-icons/io5";
import "./home.css";

const Home = () => {
  return (
    <div>
      <h1 className="title_name ">Puzzle</h1>
      <Outlet />
      <div className="Home_page-control">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "Home__page_control_link Home__page_control_link-active"
              : "Home__page_control_link  "
          }
        >
          <FaHome className="Home__page_control_link_icon" />
          <div className="Home__page_control_link-text"> Home</div>
        </NavLink>

        <NavLink
          to="/result"
          className={({ isActive }) =>
            isActive
              ? "Home__page_control_link Home__page_control_link-active"
              : "Home__page_control_link  "
          }
        >
          <IoStatsChart className="Home__page_control_link_icon" />
          <div className="Home__page_control_link-text"> Result</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
