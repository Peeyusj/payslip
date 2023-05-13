import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Dashhome = () => {
  let navigate = useNavigate();

  useEffect(() => {
    let loged = window.localStorage.getItem("islogedin");
    !loged && navigate("/signin");
  }, []);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");

  let ipHandler1 = (e) => {
    setInput1(e.target.value);
  };
  let ipHandler2 = (e) => {
    setInput2(e.target.value);
  };
  let ipHandler3 = (e) => {
    setInput3(e.target.value);
  };
  let ipHandler4 = (e) => {
    setInput4(e.target.value);
  };

  let submitHandler = (e) => {
    e.preventDefault();
    if (
      input1.length <= 0 ||
      input2.length <= 0 ||
      input3.length <= 0 ||
      input4.length <= 0
    ) {
      alert("all fields are required");
      return;
    }
    let data = {
      ename: input1,
      empid: input2,
      basicpay: input3,
      HRA: input4,
    };
    console.log(data);

    fetch("http://localhost:5000/addEmployee", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res.json());
      })
      .catch((e) => {
        console.log(e.error);
      });
    setInput1("");
    setInput2("");
    setInput3("");
    setInput4("");

    alert("Employee created");
  };

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
            backgroundColor: "white",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h3" padding={3} textAlign={"center"}>
            +Add Employee
          </Typography>
          <TextField
            name="ename"
            variant="outlined"
            placeholder="Name"
            value={input1}
            type={"text"}
            margin={"normal"}
            sx={{ width: "70%" }}
            onChange={ipHandler1}
          />
          <TextField
            name="empid"
            variant="outlined"
            placeholder="Emp Id"
            value={input2}
            type={"text"}
            margin={"normal"}
            sx={{ width: "70%" }}
            onChange={ipHandler2}
          />
          <TextField
            name="basicpay"
            variant="outlined"
            placeholder="Basic pay INR"
            value={input3}
            type={"number"}
            max={10}
            margin={"normal"}
            sx={{ width: "70%" }}
            onChange={ipHandler3}
          />
          <TextField
            name="HRA"
            variant="outlined"
            placeholder="HRA in INR"
            value={input4}
            type={"number"}
            margin={"normal"}
            sx={{ width: "70%" }}
            onChange={ipHandler4}
          />
          <Button color="primary" variant="contained" type="submit">
            Add to list
          </Button>
        </Box>
      </form>
      <div
        className="togbtn"
        style={{ position: "fixed", right: "7px", top: "48px" }}
      >
        <Button
          onClick={() => navigate("/home/payslip")}
          style={{ fontSize: "0.8rem", padding: "0,2rem" }}
          color="warning"
          variant="contained"
        >
          Payslip
        </Button>
      </div>
    </div>
  );
};

export default Dashhome;
