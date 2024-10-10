import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <main className="flex-row">
      <Sidebar />
      <div className="flex-col ml-[250px]">
        <Header />
        <div
          style={{ height: "100vh" }}
          className="w-[100%]  pt-[70px] bg-[#f6f6f6]"
        >
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Admin;
