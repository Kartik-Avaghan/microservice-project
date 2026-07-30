import React, { use } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import Loader from '../../components/Loader';

function GuestAuth() {

const[isGuest,setIsGuest]=useState(false);
const[loading,setLoading]=useState(true);
const navigate=useNavigate();

const token=localStorage.getItem("token");

useEffect(()=>{
  if(!token){
    setLoading(false);
    // navigate('/guestlogin');
    return;
  }
  if(token.startsWith("Bearer ")){
    fetch('http://localhost:8080/api/auth/verify-token',{
      method:"GET",
      headers:{
        'Content-Type':'application/json',
        Authorization:token
      }
    })
    .then((response)=>{
      if(!response.ok)
        throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data)=>{
     console.log(data.role);
      if(data.role==="ROLE_GUEST"){
        setIsGuest(true);
        
      }
     
    })
    .catch((error)=>{
      console.log("Error verifying token:",error);
      localStorage.removeItem("token");
      // navigate("/guestlogin");
      setIsGuest(false);
    })
    .finally(()=>{
      setLoading(false);
    })
  }
  else{
    setIsGuest(false);
    setLoading(false);
  }
  


},[]);

  if (loading) return <Loader />;

  return isGuest ? <Outlet/> : <Navigate to="/login"/>
}

export default GuestAuth