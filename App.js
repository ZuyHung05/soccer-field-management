import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import Datsan from "./components/pages/Datsan";
import Lichdat from "./components/pages/Lichdat";
import Danhgia from "./components/pages/Danhgia";
import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import "./App.css";
import ManagerLayout from "./components/layout/ManagerLayout";
import ManagerDashboard from "./components/pages/ManagerDashboard";
import QuanLySan from "./components/pages/QuanLySan";
import QuanLyKhachHang from "./components/pages/QuanLyKhachHang";
import UserIn4 from "./components/pages/UserIn4";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Customer Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/datsan"
          element={
            <Layout>
              <Datsan />
            </Layout>
          }
        />
        <Route
          path="/lichdat"
          element={
            <Layout>
              <Lichdat />
            </Layout>
          }
        />
        <Route
          path="/danhgia"
          element={
            <Layout>
              <Danhgia />
            </Layout>
          }
        />
        <Route
          path="/userin4"
          element={
            <Layout>
              <UserIn4 />
            </Layout>
          }
        />
        {/* Manager Routes */}
        {/*<Route
          path="/manager"
          element={
            <ManagerLayout>
              <ManagerDashboard />
            </ManagerLayout>
          }
        />*/}
        <Route
          path="/manager/quanlysan"
          element={
            <ManagerLayout>
              <QuanLySan />
            </ManagerLayout>
          }
        />
        <Route
          path="/manager/quanlykhachhang"
          element={
            <ManagerLayout>
              <QuanLyKhachHang />
            </ManagerLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
