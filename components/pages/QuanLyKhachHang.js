import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/QuanLyKhachHang.css";

const QuanLyKhachHang = () => {
  const [khachHangList, setKhachHangList] = useState([]);
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    password: "",
    soDienThoai: "",
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Initialize axios with Authorization header
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: "http://localhost:2006",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // 1) Fetch danh sách khách hàng
  const fetchKhachHang = async () => {
    try {
      const response = await api.get("/api/admin/users");
      setKhachHangList(
        response.data.map((item) => ({
          id: item.id,
          hoTen: item.hoTen || "Chưa có",
          soDienThoai: item.soDienThoai || "Chưa có",
          email: item.email || "Chưa có",
        }))
      );
    } catch (error) {
      console.error("Lỗi tải danh sách khách hàng:", error.response?.data || error.message);
      setErrors({ submit: "Không thể tải danh sách. Vui lòng thử lại." });
    }
  };

  useEffect(() => {
    if (token) {
      fetchKhachHang();
    } else {
      setErrors({ submit: "Vui lòng đăng nhập để quản lý khách hàng." });
    }
  }, [token]);

  // 2) Xử lý input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitStatus("");
  };

  // 3) Validate form
  const validate = () => {
    const errs = {};
    if (!formData.hoTen.trim()) errs.hoTen = "Vui lòng nhập họ tên";
    if (!formData.email.trim()) errs.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email không hợp lệ";
    if (!formData.password) errs.password = "Vui lòng nhập mật khẩu";
    else if (formData.password.length < 6) errs.password = "Mật khẩu phải có ít nhất 6 ký tự";
    if (!formData.soDienThoai.trim()) errs.soDienThoai = "Vui lòng nhập số điện thoại";
    else if (!/^\d{10,11}$/.test(formData.soDienThoai)) errs.soDienThoai = "Số điện thoại không hợp lệ";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // 4) Submit tạo user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setSubmitStatus("Vui lòng đăng nhập để thêm khách hàng.");
      return;
    }
    if (!validate()) return;

    try {
      await api.post("/api/admin/themuser", {
        hoTen: formData.hoTen,
        email: formData.email,
        matKhau: formData.password,
        soDienThoai: formData.soDienThoai,
        vaiTro: "USER", // Explicitly set role to USER
        chiNhanh: null, // Explicitly set chiNhanh to null as it's not required
      });
      setSubmitStatus("Tạo user thành công!");
      setFormData({ hoTen: "", email: "", password: "", soDienThoai: "" });
      setShowForm(false);
      fetchKhachHang();
    } catch (err) {
      console.error("Lỗi tạo user:", err.response?.data || err.message);
      setSubmitStatus(`Tạo user thất bại: ${err.response?.data?.message || err.message}`);
    }
  };

  // 5) Toggle form visibility
  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setFormData({ hoTen: "", email: "", password: "", soDienThoai: "" });
    setErrors({});
    setSubmitStatus("");
  };

  return (
    <div className="container">
      <h2>Quản lý khách hàng</h2>
      {errors.submit && <div className="error-message">{errors.submit}</div>}

      {/* Button to toggle form */}
      <button onClick={toggleForm} className="toggle-btn">+ Thêm khách hàng</button>

      {/* Form thêm khách hàng */}
      {showForm && (
        <form className="form-add" onSubmit={handleSubmit}>
          {submitStatus && (
            <div className={`submit-status ${submitStatus.includes("thành công") ? "success" : "error"}`}>
              {submitStatus}
            </div>
          )}
          <input
            type="text"
            name="hoTen"
            placeholder="Họ tên"
            value={formData.hoTen}
            onChange={handleChange}
          />
          {errors.hoTen && <span className="field-error">{errors.hoTen}</span>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="field-error">{errors.password}</span>}
          <input
            type="text"
            name="soDienThoai"
            placeholder="Số điện thoại"
            value={formData.soDienThoai}
            onChange={handleChange}
          />
          {errors.soDienThoai && <span className="field-error">{errors.soDienThoai}</span>}
          <button type="submit" className="save-btn">Lưu</button>
        </form>
      )}

      {/* Bảng danh sách khách hàng */}
      <table className="khachhang-table">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {khachHangList.map((kh) => (
            <tr key={kh.id}>
              <td>{kh.hoTen}</td>
              <td>{kh.soDienThoai}</td>
              <td>{kh.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuanLyKhachHang;