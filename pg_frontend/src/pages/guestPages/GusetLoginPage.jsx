// import React, { use, useState } from 'react'
// import { useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom'; 

// function GusetLoginPage() {
//   const [guestLogin,setGuestLogin]=useState({
//     "username":"",
//     "password":""
//   })


//  const {id}=useParams();
//   const navigate=useNavigate();

//   const handleChanges=(e)=>{
//     const {name,value}=e.target;
//     setGuestLogin({...guestLogin  ,[name]:value});
//   }

//   const handleSubmit=(e)=>{
//     e.preventDefault();

//     fetch(`http://localhost:8080/api/auth/login`,{
//       method:"POST",
//       credentials: 'include',
//       headers:{
        
//         'Content-Type': 'application/json'
        
//       },
//       body:JSON.stringify(guestLogin)
//     })
//     .then((response)=>{
//       if(!response.ok)
//         throw new Error("Login failed");
//       return response.json();
//     })
//     .then((data)=>{
//       const token = data.token;
//       localStorage.setItem("token", `Bearer ${token}`);
//       navigate(`/guest/tenant/${id}`);

//     })
//     .catch((error)=>{
//       console.error("Error during login:",error);
//       alert("Login failed. Please check your credentials and try again.");
//     });
//   }

// useEffect(()=>{
//   const token=localStorage.getItem("token");
//   if(token){
//     navigate(`/guest/tenant/${id}`);

//   }
// },[])
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-2xl px-8 py-10 w-96 border border-gray-200"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Guest Login
//         </h2>

//         <div className="flex flex-col gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               value={guestLogin.username}
//               onChange={handleChanges}
//               placeholder="Enter your username"
//               required
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={guestLogin.password}
//               onChange={handleChanges}
//               placeholder="Enter your password"
//               required
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             />
//           </div>

//           <button
//             type="submit"
//             className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-sm"
//           >
//             Login
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default GusetLoginPage









