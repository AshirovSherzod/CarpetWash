import { NavLink, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { GrServices, GrShop } from "react-icons/gr";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <section className="w-[250px] h-[100vh] fixed bg-[#232627]">
      <div className="h-[70px] flex items-center px-[20px]">
        <h1 className="font-bold text-[24px] text-white">Your Logo</h1>
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <NavLink
          className={`flex flex-row items-center gap-2 text-[16px] text-white rounded-[10px] mx-2 px-5 py-3 ${
            pathname.includes("company") ? "bg-[#656868]" : ""
          }`}
          to={"/admin/company"}
        >
          <FaRegBuilding /> Company
        </NavLink>
        <NavLink
          className={`flex flex-row items-center gap-2 text-[16px] text-white rounded-[10px] mx-2 px-5 py-3 ${
            pathname.includes("orders") ? "bg-[#656868]" : ""
          }`}
          to={"/admin/orders"}
        >
          <GrShop /> Orders
        </NavLink>
        <NavLink
          className={`flex flex-row items-center gap-2 text-[16px] text-white rounded-[10px] mx-2 px-5 py-3 ${
            pathname.includes("services") ? "bg-[#656868]" : ""
          }`}
          to={"/admin/services"}
        >
          <GrServices /> Services
        </NavLink>
        <NavLink
          className={`flex flex-row items-center gap-2 text-[16px] text-white rounded-[10px] mx-2 px-5 py-3 ${
            pathname.includes("users") ? "bg-[#656868]" : ""
          }`}
          to={"/admin/users"}
        >
          <MdOutlineLocationOn /> Address
        </NavLink>
      </div>
    </section>
  );
};

export default Sidebar;
