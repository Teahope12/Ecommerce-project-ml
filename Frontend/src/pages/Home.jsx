import React, { useContext, useEffect } from "react";
import Hero from "../component/Hero";
import LeadingProduct from "../component/LeadingProduct";
import Policy from "../component/Policy";
import { useNavigate } from "react-router-dom";
import BestSeller from "../component/BestSeller";

function Home() {
  
  const navigate = useNavigate();
 
  return (
    <>
      <Hero />
      <LeadingProduct />
      <BestSeller/>
      <Policy />
    </>
  );
}

export default Home;
