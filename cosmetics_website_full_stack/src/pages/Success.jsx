import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";

const Success = () => {
  const location =useLocation()
  console.log(location)
  return (
    <div>
        successfull
    </div>
  )
};

export default Success;