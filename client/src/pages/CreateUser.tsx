import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const walletAddress = location.state?.walletAddress || null;
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!walletAddress) {
      navigate("/");
    }
  }, [walletAddress, navigate]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    walletAddress: walletAddress,
  });

  const CreateNewUser = async () => {
    axios.post("http://localhost:8080/createUser", newUser).then((res) => {
      console.log(res.data);
      // TODO : idhr se navigate krna hai dashboard pr
      // User Validation (if already exist or not)
      // OTP wali cheez
    });
  };

  return (
    <>
      <div className="bg-gray-800 text-white flex flex-col gap-5 justify-center items-center h-screen">
        <div className="w-1/2">
          {/* <div className="bg-white p-2 text-black rounded-xl cursor-pointer">
            <p> {walletAddress || "Address nhi h"}</p>
          </div> */}

          <div>Create New Account</div>
          <div className="flex flex-col bg-white text-black p-2 gap-4 rounded-xl w-full">
            <input
              type="text"
              placeholder="Wallet Address"
              value={newUser.walletAddress}
              disabled={true}
              className=" p-1  rounded-xl"
            />
            <input
              type="text"
              placeholder="Enter Account Holder Name"
              className=" p-1  rounded-xl"
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              value={newUser.name}
            />
            <input
              type="text"
              placeholder="Enter Email ID"
              className="p-1 rounded-xl"
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              value={newUser.email}
            />
            <button
              className="bg-blue-500 p-2 rounded-xl"
              onClick={CreateNewUser}
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
