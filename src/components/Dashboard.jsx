import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Dashhome from "./Dashhome";
import { Payslip } from "./Payslip";
import Drawerp from "./Drawerp";
import { BASE_URL } from "./common";

const Dashboard = () => {
  const [info, setInfo] = useState({ name: "", email: "" });
  let navigate = useNavigate();
  let signoutHandler = () => {
    window.localStorage.clear();
    navigate("/signin");
    window.location.reload();
  };
  useEffect(() => {
    fetch(`${BASE_URL}/userData`, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: window.localStorage.getItem("token") }),
    })
      .then((res) => {
        return res.json();
      })
      .then((re) => {
        setInfo({ name: re.data.uname, email: re.data.email });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div className="mobileview">
        <Drawerp />
      </div>
      <div style={{ flex: "6.5", margin: "auto", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Dashhome />} />
          <Route path="/payslip" element={<Payslip />} />
        </Routes>
        <Button
          onClick={signoutHandler}
          sx={{ position: "fixed", right: "7px", top: "5px" }}
          color="warning"
          variant="contained"
        >
          signout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
