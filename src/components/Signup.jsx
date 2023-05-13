import React,{useState} from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from './common'


const Signup = () => {
    let nevigate=useNavigate();
const[input,setInput]=useState({
    name:"",
    email:"",
    mobileNo:"",
    password:"",
    designation:"",

})
let ipHandler=(e)=>{
    setInput((prev)=>({
        ...prev,
        [e.target.name]:e.target.value,
        [e.target.email]:e.target.value,
        [e.target.mobileNo]:e.target.value,
        [e.target.password]:e.target.value,
        [e.target.designation]:e.target.value,
    }));
   }
let submitHandler=(e)=>{
    e.preventDefault();   
if(input.name.length<=0||input.email.length<=0||input.mobileNo.length<=0||input.password.length<=0||input.designation.length<=0){
        alert("all fields are required");
        return;
}     
fetch(`${BASE_URL}/register`,{method:'Post',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)}).then((res)=>{
    console.log(res);
}).catch((e)=>{console.log(e.error)})
  alert(" Successful you can signin");
 nevigate('/signin')
}


    return (
        <div >
            <form onSubmit={submitHandler}>
                <Box display={"flex"} flexDirection={"column"} maxWidth={500} alignItems={"center"}
                    justifyContent={"center"} margin={"auto"} marginTop={10} padding={3} borderRadius={5} boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc"
                        }
                    }}
                >
                    <Typography variant="h3" padding={3} textAlign={"center"}>Signup </Typography>
                    <TextField name='name' variant='outlined' placeholder='Name...' type={'text'} margin={"normal"} sx={{ width: "70%" }} onChange={ipHandler}/>
                    <TextField name='email' variant='outlined' placeholder='Email...' type={'email'} margin={"normal"} sx={{ width: "70%" }} onChange={ipHandler} />
                    <TextField name='mobileNo' variant='outlined' placeholder='mobileNo...' type={'number'} max="10" margin={"normal"} sx={{ width: "70%" }} onChange={ipHandler} />
                    <TextField name='password' variant='outlined' placeholder='Password...' type={'password'} margin={"normal"} sx={{ width: "70%" }} onChange={ipHandler} />
                    <TextField name='designation' variant='outlined' placeholder='Designation...' type={'text'} margin={"normal"} sx={{ width: "70%" }} onChange={ipHandler} />
                    <Box display={"flex"} justifyContent={"space-between"} sx={{ width: "70%" }}><Button color="primary" variant="contained" type='submit' >Register</Button>
                     <Button sx={{ fontSize: "0.7rem",  
                        ":hover": {
                           textDecoration:"underline"
                        }
                     }}  type='button' onClick={()=>{nevigate('/signin')}} >Already a user Signin</Button> </Box>

                </Box>
            </form>
        </div>
    )
}

export default Signup