import React from "react";
import { useNavigate } from "react-router-dom";
import Head from "./head";
import Footer from "./Footer";
// import WithAuth from "../layout/WithAuth";
// import { UserData } from "../App";

function Test() {
  const navigate = useNavigate();

  const HandleTest = () => {
    setTimeout(() => {
      console.log("Form Submitted");
      navigate("/");
    }, 3000);
  };

  // const userInfo = useContext(UserData);
  // console.log(userInfo.name);

  return (
    <div>
      <Head />
      <div className="page">
        <div> Test Page</div>
        {/* <p>{userInfo.name}</p> */}
        <div>
          <input />
          <button type="submit" onClick={HandleTest}>
            submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Test;
