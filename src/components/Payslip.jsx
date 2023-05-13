import React, { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownCircleRoundedIcon from "@mui/icons-material/ArrowDropDownCircleRounded";
import "../styles/payslip.css";
import Addfields from "./Addfields";
//import { upload } from "@testing-library/user-event/dist/upload";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { BASE_URL } from "./common";



export const Payslip = () => {
  const [info, setInfo] = useState([]);
  const [epf, setEpf] = useState("");
  const [hra, setHra] = useState("");
  const [basic, setBasic] = useState("");
  const [incm, setIncm] = useState("");
  const [valcheck, setValCheck] = useState(false);
  const [totalearn, setTotalEarn] = useState("");
  const [inwords, setInWords] = useState("");
  const [pname, setPname] = useState("");
  const [pid, setPid] = useState("");
  const [paydays, setDay] = useState("");
  const [lop, setLop] = useState("");
  const [paydate, setPaydate] = useState("");
  const [imgg, setImgg] = useState("");
  const [comp, setComp] = useState("");
  const [adrr, setAdrr] = useState("");
  const [pinc, setPinc] = useState("");
  const [count, setCount] = useState("");
  const [extradata, setExtraData] = useState("");
  const [valcheck1, setValCheck1] = useState(false);

  var converter = require("number-to-words");
  const [infodetails, setInfoDetails] = useState({
    basicpay: "",
    HRA: "",
  });
  let drop = useRef("");
  let optn = useRef("");
  let incometax = useRef("");
  let pf = useRef("");
  let Hra = useRef("");
  let Basic = useRef("");
  let ttlded = useRef("");
  let ttlearn = useRef("");
  let grandtotal = useRef("");
  let upld = useRef("");
  useEffect(() => {
    const fetchinfo = async () => {
      let res = await fetch(`${BASE_URL}/addEmployee`);
      let data = await res.json();
      setInfo(data.data);
    };
    fetchinfo();
  }, []);

  let optionHandler = (id) => {
    let empdata = info.filter((i) => i.empid === id);

    setInfoDetails({
      basicpay: empdata[0].basicpay,
      HRA: empdata[0].HRA,
    });
    drop.current.style.visibility = "hidden";
    setPname(empdata[0].ename);
     let sum = empdata[0].basicpay + empdata[0].HRA;
     setPid(empdata[0].empid)
     setTotalEarn("₹" + sum.toString());
  };

  let navigate = useNavigate();
  const iconClickHandler = () => {
    drop.current.style.visibility = "visible";
  };

  useEffect(() => {
    let ded = parseInt(epf) + parseInt(incm);
    let res = (ded && ded) || "0";
    ttlded.current.value = "₹" + res;
  });

  useEffect(() => {
    let earnn = parseInt(Hra.current.value) + parseInt(Basic.current.value);
    let ded = parseInt(pf.current.value) + parseInt(incometax.current.value);
    let res = (ded && ded) || 0;
    let res2 = (earnn && earnn) || 0;
    let finalsum = res2 - res;
    grandtotal.current.textContent = "₹" + finalsum;
    setInWords(converter.toWords(finalsum));
  });

  let handleAddClick = () => { 
    setValCheck(true);
  };

  let uploadHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgg(URL.createObjectURL(e.target.files[0]));
      setValCheck1(true);
    }
  };

  let pdfDownld = () => {
    const doc = new jsPDF({ orientation: "portrait" });
    doc.autoTable({
      html: "#tbslip",
    });
    if(comp&&pname&&pid&&grandtotal.current.textContent){
      doc.save("Payslip.pdf");
    }
    else{
      alert("required field must have input value")
    }
  };

  let sendData = (extrainfo) => {
    setExtraData(extrainfo);
  };

  return (
    <div>
      <div className="sec1">
        <div className="sec1-A">
          <div className="upld">
            <div className="imgup">
              <input
                type="file"
                name=""
                id="ipup"
                onChange={uploadHandler}
                accept="image/png, image/jpg"
              />
            </div>
            <div className="frontimg">
              <CloudUploadIcon color="primary" />
              <div style={{ textAlign: "left" }}>Upload</div>
            </div>
            {valcheck1 && (
              <div className="imdelete">
                <DeleteIcon sx={{ color: "red", fontSize: 30 }} />
              </div>
            )}
            <div className="imgup-1">
              <img src={imgg} alt="" width={200} />
            </div>
            <div className="uptext">
              Upload Logo <br />
              <small>jpg/png</small>
            </div>
          </div>
          <div className="dat">
            <div style={{ paddingLeft: "115px", color: "#333333d7" }}>
              Payslip For the Month
            </div>
            <div>
              <input
                id="ip-Date"
                type="text"
                defaultValue={
                  new Date().toLocaleString("default", { month: "short" }) +
                  "" +
                  " " +
                  new Date().getFullYear()
                }
              />
            </div>
          </div>
        </div>
        <div className="sec1-B">
          <input
            type="text"
            onChange={(e) => {
              setComp(e.target.value);
            }}
            required
            placeholder=" Company Name*"
            className="ip-1-A"
          />
          <input
            type="text"
            onChange={(e) => {
              setAdrr(e.target.value);
            }}
            placeholder="Company Adress"
          />
          <input
            type="text"
            onChange={(e) => {
              setPinc(e.target.value);
            }}
            placeholder="City, Pincode"
          />
          <input
            type="text"
            onChange={(e) => {
              setCount(e.target.value);
            }}
            placeholder="India"
          />
        </div>
      </div>
      <div className="sec2">
        <h2 style={{ width: "100%", borderBottom: "1px solid gray" }}>
          Employee Pa Summary <sup style={{ color: "red" }}>*</sup>
        </h2>
        <div className="ip ip-A">
          <div className="ichild">
            <label htmlFor="name">Emploeee*</label>
            <span style={{ position: "relative", right: "-0.3rem" }}>:</span>
            <input
              type="text"
              name="pname"
              id=""
              ref={optn}
              value={pname}
               required
              style={{ position: "relative", left: "1.2rem" }}
              onChange={(e) => {
                setPname(e.target.value);
              }}
            />
            <div
              onClick={iconClickHandler}
              style={{ position: "relative", left: "20px", cursor: "pointer" }}
            >
              <ArrowDropDownCircleRoundedIcon />
            </div>
            <div
              className="dropdown"
              ref={drop}
              onMouseLeave={() => {
                drop.current.style.visibility = "hidden";
              }}
            >
              {info.map((emp) => (
                <div
                  value=""
                  className="opt"
                  onClick={() => optionHandler(emp.empid)}
                >
                  {emp.ename}
                </div>
              ))}
            </div>
          </div>
          <div className="ichild">
            <label htmlFor="">Employee ID*</label>
            <span style={{ position: "relative", right: "1rem" }}>:</span>
            <input
            required
              type="text"
              placeholder="Eg:1234*"
              name="empID"
              value={pid}
              onChange={(e) => {
                setPid(e.target.value);
              }}
            />
          </div>
          <div className="ichild">
            <label htmlFor="">Pay Period</label>
            <span style={{ position: "relative", right: "1rem" }}>:</span>{" "}
            <input type="date" />
          </div>
          <div className="ichild">
            <label htmlFor="">Paid Days</label>
            <span style={{ position: "relative", right: "1rem" }}>:</span>{" "}
            <input
              type="text"
              name="paydays"
              placeholder="Eg:22"
              onChange={(e) => {
                setDay(e.target.value);
              }}
            />
          </div>
          <div className="ichild">
            {" "}
            <label htmlFor="">Loss of Pay Days</label>
            <span style={{ position: "relative", right: "1rem" }}>:</span>{" "}
            <input
              type="text"
              name="lop"
              onChange={(e) => {
                setLop(e.target.value);
              }}
            />{" "}
          </div>
          <div className="ichild">
            <label htmlFor="">Paid Date</label>
            <span style={{ position: "relative", right: "1rem" }}>:</span>{" "}
            <input
              type="date"
              name="paiddate"
              onChange={(e) => {
                setPaydate(e.target.value);
              }}
            />
          </div>
          {!valcheck && (
            <button className="buttadd buttadd1" onClick={handleAddClick}>
              <AddCircleIcon color="primary" />
              Add another field
            </button>
          )}
        </div>
        {valcheck && <Addfields sendData={sendData} />}
        {valcheck && (
          <button className="buttadd buttadd1"> Remove all field</button>
        )}
      </div>
      <div className="sec2 sec3">
        <h2>
          Income Details <sup style={{ color: "red" }}>*</sup>
        </h2>
        <div className="ip ip1">
          <div className="ichild1">
            <label htmlFor="" style={{ fontWeight: "bold" }}>
              {" "}
              Earnings
            </label>{" "}
            <span style={{ fontWeight: "bold", marginRight: "1rem" }}>
              Amount
            </span>
          </div>
          <div className="ichild1">
            <label htmlFor="" style={{ fontWeight: "bold" }}>
              Deductions
            </label>{" "}
            <span style={{ fontWeight: "bold", marginRight: "1rem" }}>
              Amount
            </span>{" "}
          </div>
          <div className="ichild1">
            <label htmlFor="" defaultValue={infodetails.basicpay&&infodetails.basicpay}>
              Basic
            </label>{" "}
            <input
              onChange={(e) => {
                setBasic(e.target.value);
              }}
              ref={Basic}
              type="number"
              placeholder="0"
              defaultValue={infodetails.basicpay&&infodetails.basicpay}
            />
          </div>
          <div className="ichild1">
            <label htmlFor="">Income Tax</label>{" "}
            <input
              type="text"
              ref={incometax}
              onChange={(e) => {
                setIncm(e.target.value);
              }}
              placeholder="0"
            />
          </div>
          <div className="ichild1">
            <label htmlFor="">House Rent Allowance</label>{" "}
            <input
              onChange={(e) => {
                setHra(e.target.value);
              }}
              ref={Hra}
              type="number"
              placeholder="0"
              defaultValue={infodetails.HRA&&infodetails.HRA}
            />
          </div>
          <div className="ichild1">
            {" "}
            <label htmlFor="">Provident Fund</label>{" "}
            <input
              type="text"
              placeholder="0"
              ref={pf}
              onChange={(e) => {
                setEpf(e.target.value);
              }}
            />{" "}
          </div>
          <div className="ichild1" style={{ backgroundColor: "#f9f9fb" }}>
            <label htmlFor="">Gross Earnings*</label>{" "}
            <input
              type="text"
              className="grsearn"
              placeholder="₹0*"
              ref={ttlearn}
              value={totalearn}
              onChange={(e) => {
                setTotalEarn(e.target.value);
              }}
            />
          </div>
          <div className="ichild1" style={{ backgroundColor: "#f9f9fb" }}>
            <label htmlFor="">Total Deductions</label>{" "}
            <input
              type="text"
              style={{ textAlign: "end" }}
              placeholder="₹0"
              ref={ttlded}
            />
          </div>
        </div>
      </div>
      <div
        className="togbtn"
        style={{ position: "fixed", right: "7px", top: "48px" }}
      >
        <Button
          onClick={() => navigate("/home")}
          color="warning"
          variant="contained"
        >
          +Add user
        </Button>
      </div>
      <div className="grandtotal">
        <div className="s-1">
          <div
            className="tnp"
            style={{ fontWeight: 600, paddingBottom: "1rem" }}
          >
            Total Net Payable
          </div>
          <div>Gross Earnings- Total Deductions</div>
        </div>
        <div ref={grandtotal} className="s-2"></div>
      </div>
      <div className="ftr">
        <div>
          <button type="button" className="bt-A" onClick={pdfDownld}>
            Generate Payslip
          </button>
          <button
            type="reset"
            className="bt-B"
            onClick={() => {
              window.location.reload();
            }}
          >
            <svg
              data-name="Layer 1"
              viewBox="0 0 512 512"
              alt="reset"
              class="reset-svg"
            >
              <path
                d="M57.636 361.034a21.003 21.003 0 01-19.333-12.8A236.462 236.462 0 01365.857 46.656a21 21 0 11-19.545 37.176A194.774 194.774 0 00256 61.626C148.821 61.626 61.626 148.822 61.626 256a194.709 194.709 0 005.242 45.102l20.949-20.949a21 21 0 0129.699 29.698l-45.03 45.032a21 21 0 01-14.85 6.15zM256 492.374a236.725 236.725 0 01-112.685-28.541 21 21 0 1120.05-36.907A194.593 194.593 0 00256 450.374c107.178 0 194.374-87.196 194.374-194.374a194.685 194.685 0 00-5.2-44.922l-19.865 19.866a21 21 0 01-29.699-29.7l43.972-43.97a21 21 0 0134.188 6.664A236.43 236.43 0 01256 492.374z"
                fill="#010101"
              ></path>
            </svg>
            Reset
          </button>
        </div>
      </div>
      <div className="foot1">
        <span style={{ color: "gray" }}>Amount in words</span> : Indian Rupee{" "}
        {inwords} Only{" "}
      </div>
      <div className="tablediv" style={{ display: "none" }}>
        <table id="tbslip">
          <tr>
            <td>company Name:</td>
            <td>Payslip</td>
          </tr>
          <tr>
            <td>company Name:</td>
            <td>{comp}</td>
          </tr>
          <tr>
            <td>company Adress:</td>
            <td>{adrr}</td>
          </tr>
          <tr>
            <td>City/ Pincode</td>
            <td>{pinc}</td>
          </tr>
          <tr>
            <td>Country:</td>
            <td>{count}</td>
          </tr>
          <tr>
            <td>employeename:</td>
            <td>{pname}</td>
          </tr>
          <tr>
            <td>employeeID:</td>
            <td>{pid}</td>
          </tr>
          <tr>
            <td>Paydays:</td>
            <td>{paydays}</td>
          </tr>
          <tr>
            <td>Loss of days:</td>
            <td>{lop}</td>
          </tr>
          <tr>
            <td>Pay date:</td>
            <td>{paydate}</td>
          </tr>
          <tr>
            <td>epf:</td>
            <td>{pf.current.value}</td>
          </tr>
          <tr>
            <td>income:</td>
            <td>{incometax.current.value}</td>
          </tr>
          <tr>
            <td>hra:</td>
            <td>{Hra.current.value}</td>
          </tr>
          <tr>
            <td>basic:</td>
            <td>{Basic.current.value}</td>
          </tr>
          {extradata &&
            extradata.map((i) => (
              <tr>
                <td>{i.name}</td>
                <td>{i.value}</td>
              </tr>
            ))}

          <tr>
            <th>totalearning:</th>
            <td>{grandtotal.current.textContent}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
