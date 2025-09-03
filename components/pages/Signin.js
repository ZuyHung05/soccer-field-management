import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import "../../styles/Signin.css";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validateForm()) return;

    // 1️⃣ Nếu là admin/admin thì chuyển thẳng
    if (
      formData.email.toLowerCase() === "admin" &&
      formData.password === "admin"
    ) {
      localStorage.setItem("token", "fake-admin-token");
      localStorage.setItem("username", "Administrator");
      navigate("/manager/quanlysan");
      return;
    }

    // 2️⃣ Ngược lại gọi API thật
    setIsLoading(true);
    try {
      const response = await api.post("/api/auth/signin", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;
      if (!token) throw new Error("Không nhận được token từ server");

      localStorage.setItem("token", token);
      localStorage.setItem("username", user.email);
      // lưu luôn userId nếu cần:
      localStorage.setItem("userId", user.id);

      const role = user.role || "USER";
      if (role === "ADMIN") {
        navigate("/manager/quanlysan");
      } else {
        navigate("/");
      }
    } catch (err) {
      let msg = "Đăng nhập thất bại";
      if (err.response) {
        if (err.response.status === 401) msg = "Email hoặc mật khẩu không đúng";
        else if (err.response.data?.message) msg = err.response.data.message;
      } else if (err.request) {
        msg = "Không kết nối được với server";
      }
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h1 className="signin-title">Đăng nhập</h1>

        {serverError && (
          <div className="error-message server-error">{serverError}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field-row">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              className={`signin-input ${errors.email ? "input-error" : ""}`}
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="field-row">
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              className={`signin-input ${
                errors.password ? "input-error" : ""
              }`}
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="signin-buttons">
            <button
              type="submit"
              className="btn-login"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
            <Link to="/signup" className="btn-signup">
              Chưa có tài khoản? Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
