import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Scrapper from "../partials/Scrapper";

const Dashboard = ({ user }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header user={user} />
      {/*  Page content */}
      <main className="flex-grow py-20">
        <Scrapper />
      </main>
      {/*  Site footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
