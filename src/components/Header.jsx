import React from "react";
import header_img from "../header_banner.svg"
import Nav from "./Nav";

// The Header
export default function Header() {
  return (
    <header>
      <div className="App-header">
        <img src={header_img} className="App-logo" alt="logo" />
        <div>
          <h1> Watch Stocks </h1>
        </div>
        <Nav />
      </div>

    </header>
  );
}
