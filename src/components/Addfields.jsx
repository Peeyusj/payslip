import React, { useState, useRef } from "react";
import "../styles/addfields.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function Addfields(props) {
  const [inputList, setInputList] = useState([{ name: "", value: "" }]);
  let bt = useRef("");
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { name: "", value: "" }]);
  };
  props.sendData(inputList);

  return (
    <div className="addfields">
      {inputList.map((x, i) => {
        return (
          <div className="box id1">
            <div className="pp">
              <input
                className="ml10 ipone"
                name="name"
                placeholder="Name"
                value={x.name}
                onChange={(e) => handleInputChange(e, i)}
              />
              <span
                style={{
                  position: "relative",
                  right: "0.7rem",
                  marginLeft: "14px",
                }}
              >
                :
              </span>
              <input
                className="ml10 iptwo"
                name="value"
                placeholder="Value"
                value={x.value}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>

            <div className="btn-box">
              {inputList.length !== 1 && (
                <button
                  className="mr10"
                  ref={bt}
                  onClick={() => handleRemoveClick(i)}
                >
                  <RemoveCircleOutlineIcon sx={{ color: "red" }} />
                </button>
              )}
              {inputList.length - 1 === i && (
                <button className="buttadd" onClick={handleAddClick}>
                  <AddCircleIcon color="primary" />
                  Add another field
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Addfields;
