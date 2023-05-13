import { Drawer, List } from "@mui/material";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { useNavigate } from "react-router-dom";

const Drawerp = () => {
  let nevigate = useNavigate();
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ marginTop: "2rem" }}
            onClick={() => nevigate("/home")}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary={"Add Employees"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ marginTop: "2rem" }}
            onClick={() => {
              nevigate("/home/payslip");
            }}
          >
            <ListItemIcon>
              <RequestQuoteIcon />
            </ListItemIcon>
            <ListItemText primary={"Genrate Payslip"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Drawerp;
