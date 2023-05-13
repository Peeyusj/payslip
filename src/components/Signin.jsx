import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BASE_URL } from "./common";

const Signin = (props) => {
  let navigate = useNavigate();

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  let ipHandler1 = (e) => {
    setInput1(e.target.value);
  };

  let ipHandler2 = (e) => {
    setInput2(e.target.value);
  };

  let submitHandler = (e) => {
    e.preventDefault();

    if (input1.length <= 0 || input2.length <= 0) {
      alert("all fields are required");
      return;
    }
    let data = {
      email: input1,
      password: input2,
    };
    fetch(`${BASE_URL}/login`, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((re) => {
        let { status } = re;

        status && alert("login successful");
        status && navigate("/home");
        !status && alert(re.error);
        window.localStorage.setItem("token", re.data);
        window.localStorage.setItem("islogedin", true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  window.addEventListener("popstate", (e) => {
    e.srcElement.location.pathname === "/signin" && navigate("/home/");
  });

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          maxWidth={500}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={10}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h3" padding={3} textAlign={"center"}>
            Signin{" "}
          </Typography>
          <TextField
            variant="outlined"
            name="email"
            placeholder="Email..."
            type={"email"}
            margin={"normal"}
            sx={{ width: "70%" }}
            onChange={ipHandler1}
          />
          <TextField
            variant="outlined"
            name="password"
            placeholder="Password..."
            type={"password"}
            margin={"normal"}
            sx={{ width: "70%" }}
            onChange={ipHandler2}
          />
          <Button color="success" variant="contained" type={"submit"}>
            Signin
          </Button>
          <Link to="/payslip"  style={{margin:"1%",color:"black"}}>Register here</Link>
        </Box>
        
      </form>
      
    </div>
  );
};

export default Signin;
