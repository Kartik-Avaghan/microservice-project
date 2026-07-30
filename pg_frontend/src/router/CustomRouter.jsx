import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TenantListPage from "../pages/ownerpages/TenantListPage";
import AddTenantsPage from "../pages/ownerpages/AddTenantsPage";
import RoomDetailsPage from "../pages/roompages/RoomDetailsPage";
import AddRoomsPage from "../pages/roompages/AddRoomsPage";
import DashboardPage from "../pages/ownerpages/DashboardPage";
import LoginPage from "../pages/ownerpages/LoginPage";
import AllCompalintPage from "../pages/ownerpages/AllCompalintPage";
// import GusetLoginPage from "../pages/guestPages/GusetLoginPage";
import GuestDashBoardPage from "../pages/guestPages/GuestDashBoardPage";
import RaiseComplaintPage from "../pages/guestPages/RaiseComplaintPage";
import Auth from "../pages/auth/Auth";
import GuestAuth from "../pages/auth/GuestAuth";
import MainWebPage from "../pages/main-page/MainWebPage";
import RegistrationPage from "../pages/main-page/RegistrationPage";
import MainLoginPage from "../pages/main-page/MainLoginPage";
import ResolvedComplaintPage from "../pages/complaintpages/ResolvedComplaintPage";
import NotificationPage from "../pages/guestPages/NotificationPage";
import AdminNav from "../pages/ownerpages/AdminNav";
import TenantPaymentPage from "../pages/paymentpages/TenantPaymentPage";
import PaymentPendingPage from "../pages/paymentpages/PaymentPendingPage";
import PaymentHistoryPage from "../pages/paymentpages/PaymentHistoryPage";

function CustomRouter() {
  return (
    <Routes>
      {/*  Public Routes */}
      <Route path="/" element={<MainWebPage />} />
      <Route path="/login" element={<MainLoginPage />} />

      <Route path="/register" element={<RegistrationPage />} />

      {/*  Protected Admin Routes */}
      <Route element={<Auth />}>
        <Route path="/admin" element={<AdminNav />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tenants" element={<TenantListPage />} />
          <Route path="add-tenants" element={<AddTenantsPage />} />
          <Route path="rooms-details" element={<RoomDetailsPage />} />
          <Route path="add-rooms" element={<AddRoomsPage />} />
          <Route path="complaint/pending" element={<AllCompalintPage />} />
          <Route
            path="complaint/resolved"
            element={<ResolvedComplaintPage />}
          />
          <Route path="payments/pending" element={<PaymentPendingPage />} />
          <Route path="payments/paid" element={<PaymentHistoryPage/>}/>
        </Route>
      </Route>

      {/*  Protected Guest Routes */}
      <Route path="/guest" element={<GuestAuth />}>
        <Route path="profile" element={<GuestDashBoardPage />} />
        <Route path="raise-complaint" element={<RaiseComplaintPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path="dopayment" element={<TenantPaymentPage />} />
      </Route>

      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </Routes>
  );
}

export default CustomRouter;
