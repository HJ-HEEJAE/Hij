import React from "react";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";

// Navigation links
export default function Nav() {
  // const userToken = jwt.decode(localStorage.getItem("userSession"));
  // console.log(userToken);
  // let today = new Date();
  // let userInfo;
  // If there is userToken due to login of the user
  // if (userToken != null){
  //   let expireTime = new Date(userToken.exp*1000);
  //   console.log("Now "+today);
  //   console.log("Authorization until "+expireTime);
  //   // In case of the expiry of the authentication
  //   if (today > expireTime){
  //     alert("Please login again.");
  //     HandleLogout();
  //   } else {
  //     userInfo = <InfonLogout />;
  //   }
  // } else {
  //   userInfo = <LoginnRegister />
  // }

  // function HandleLogout(){
  //   localStorage.removeItem("userSession");
  //   window.location.assign('/stocks/symbols');
  // }

  // function InfonLogout() {
  //   return (
  //     <div className="LogBox UserInfoBox">
  //       <span className="logoutBtn NavBtn">
  //         <p>Welcome! {userToken.email}</p>
  //         {/* <button className="logoutBtn" onClick={HandleLogout}>Logout</button> */}
  //         <p className="aLogout" onClick={HandleLogout}>Logout</p>
  //       </span>
  //     </div>
  //   );
  // }
  // function LoginnRegister(){
  //   return (
  //     <div className="LogBox LoginRegister">
  //       <span className="loginBtn NavBtn">
  //         <Link to="/login">Login</Link>
  //       </span>
  //       <span className="registerBtn NavBtn">
  //         <Link to="/register">Register</Link>
  //       </span>
  //     </div>
  //   );
  // }

  return (
    <div>
      <nav className="container MenuBar">
        <div className="HomeBox">
          <div className="homeBtn NavBtn">
            <span>
              <Link to="/stocks/symbols">Home</Link>
            </span>
          </div>
        </div>
        
        {/* {userInfo} */}
        
      </nav>
    </div>
  );
}
