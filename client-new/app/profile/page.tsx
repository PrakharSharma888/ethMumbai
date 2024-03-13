import AnonAdhar from "@/components/AnonAdhar";
import Dashboard from "@/components/Dashboard";
import React from "react";

const Profile = () => {
  const isAuth = true;
  return (
    <div>{isAuth ? <Dashboard/> : <AnonAdhar/>}</div>
  );
};

export default Profile;
