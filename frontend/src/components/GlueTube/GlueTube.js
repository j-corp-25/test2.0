import React from "react";
// import { useState } from 'react';
import "./GlueTube.css";
import NavBar from "../NavBar/NavBar";
import VideoList from "../VideoList/VideoList";


// import ProductTable from './ProductTable';

const GlueTube = () => {
  return (
    <div className="master-page">
      <NavBar/>
      <VideoList/>
    </div>
  );
};

export default GlueTube;
