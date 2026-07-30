import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Wifi, BedDouble, Shield, Tv, Utensils, MapPin, Phone } from "lucide-react";

function MainWebPage() {
  const pgDetails = {
    name: "PG Management",
    area: "Rajajinagar, Bangalore",
    contact: "+91 98765 43210",
  };

  const facilities = [
    { icon: <Wifi size={40} />, title: "High-Speed WiFi" },
    { icon: <BedDouble size={40} />, title: "Fully Furnished Rooms" },
    { icon: <Shield size={40} />, title: "24×7 Security" },
    { icon: <Tv size={40} />, title: "CC-TV Surveillance" },
    { icon: <Utensils size={40} />, title: "Hygienic Food" },
  ];

  const rules = [
    "Maintain cleanliness in rooms and common areas.",
    "No loud music or disturbance after 10 PM.",
    "Visitors allowed only during visiting hours.",
    "Respect staff and other tenants.",
    "No smoking or alcohol inside the premises.",
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans  text-[#08363A]">


       <div className="relative w-full h-[80vh] sm:h-[100vh]">
        <Swiper
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="w-full h-full"
        >
          {[
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=80",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1500&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=80",
          ].map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute  inset-0 bg-gradient-to-b from-[#004E64]/90 via-[#0B7261]/10 to-[#25A18E]/20 flex flex-col justify-center items-center text-gray-100 text-center px-6 z-50">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to {pgDetails.name}
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed">
            A premium living space in {pgDetails.area}. Experience comfort, safety,
            and homely food — all under one roof.
          </p>
          <Link
            to="/register"
            className="mt-6 bg-[#FFD166] text-[#004E64] px-8 py-3 rounded-xl font-semibold hover:bg-[#FFE699] transition"
          >
            Get Started
          </Link>
        </div>
     
      {/* Navbar */}
      
     
      <nav className="absolute  px-6 py-4 text-[#faf9f8] top-0 w-full   z-99">
         <div className="flex justify-between items-center mx-10">
        <Link to="/">
          <p className="text-3xl sm:text-[35px] font-bold tracking-wide hover:text-[#FFD166] transition">
            {pgDetails.name}
          </p>
        </Link>
        <ul className="hidden sm:flex gap-x-10 text-xl font-semibold">
          <Link to="/" className="hover:text-[#FFD166] transition">
            Home
          </Link>
          <Link to="/register" className="hover:text-[#FFD166] transition">
            Register
          </Link>
          <Link to="/login" className="hover:text-[#FFD166] transition">
            Login
          </Link>
        </ul>
        <div className="sm:hidden text-lg font-semibold">☰</div>
       </div>
      </nav>
      
      </div>

      {/* Hero Section */}
     

      {/* About Section */}
      <section className="py-20 bg-[#E8F6F3] text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#004E64] mb-6">
          About Our PG
        </h2>
        
        <p className="max-w-3xl mx-auto text-[#114D4B] text-lg leading-relaxed">
          {pgDetails.name} provides a cozy, professional, and home-like stay for
          students and working professionals. Enjoy comfort with fully furnished
          rooms, top-notch facilities, and a safe environment designed for your
          peace of mind.
        </p>

       
           <p className="text-[#0b6060] mt-4 flex justify-center gap-4 items-center font-semibold">
        <MapPin/> Located in {pgDetails.area} | <Phone/> Contact us: {pgDetails.contact}
        </p>
        
       
       
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-gradient-to-r from-[#F8FBFA] via-[#E8F6F3] to-[#F8FBFA] text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#004E64] mb-10">
          Facilities We Provide
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-8">
          {facilities.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all border-t-4 border-[#25A18E]"
            >
              <div className="text-[#25A18E] mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-[#08363A]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-20 bg-[#F2FBF8] text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#004E64] mb-6">
          Rules & Regulations
        </h2>
        <ul className="max-w-2xl mx-auto text-lg text-[#134F4E] list-disc list-inside text-left leading-relaxed">
          {rules.map((rule, i) => (
            <li key={i} className="mb-3">
              {rule}
            </li>
          ))}
        </ul>
      </section>

      {/* Food Section */}
      <section className="py-20 bg-gradient-to-br from-[#E8F6F3] to-[#F8FBFA] text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#004E64] mb-6">
          Food We Provide
        </h2>
        <p className="max-w-2xl mx-auto text-[#114D4B] mb-10">
          We serve delicious, hygienic, and nutritious meals every day — made
          fresh and tailored for a balanced lifestyle.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 px-4 sm:px-10">
          {[
            { title: "Breakfast", items: "Idli, Dosa, Pongal, Lemon Rice" },
            { title: "Lunch", items: "Dal, Rice, Tili-Sambar" },
            { title: "Dinner", items: "Chapati, Palya, Rice, Butter Milk" },
          ].map((meal, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#FFD166] hover:shadow-2xl hover:-translate-y-2 transition"
            >
              <h3 className="font-semibold text-xl mb-2 text-[#004E64]">
                {meal.title}
              </h3>
              <p className="text-[#134F4E]">{meal.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#004E64] to-[#007A78] text-white py-6 text-center mt-auto">
        <p className="text-lg font-semibold">
          © 2025 {pgDetails.name} Management
        </p>
        {/* <p className="text-sm mt-1 text-[#FFD166]">
          {pgDetails.area} | Contact: {pgDetails.contact}
        </p> */}
        <p className="text-sm text-[#FFD166] mt-1">
          All rights reserved | Designed by Kartik
        </p>
      </footer>
    </div>
  );
}

export default MainWebPage;
