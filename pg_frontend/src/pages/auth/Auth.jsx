import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../../components/Loader";

function Auth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // const navigate=useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      // navigate("/login");
      return;
    }

    if (token.startsWith("Bearer ")) {
      fetch(`http://localhost:8080/api/auth/verify-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          console.log(data.role);
          if (data.role == "ROLE_ADMIN") {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
          //   navigate("/login");
          setIsAdmin(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
  }, []);

  if (loading) return <Loader />;

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
}

export default Auth;
