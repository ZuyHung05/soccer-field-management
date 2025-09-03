import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/UserIn4.css";

function UserIn4() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Đang tải...",
    phone: "Đang tải...",
    email: "Đang tải...",
    userId: "Đang tải...",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    email: "",
    userId: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Lấy thông tin user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn chưa đăng nhập! Đăng nhập lại nhé");
      navigate("/signin");
      return;
    }
    axios
      .get("http://localhost:2006/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data;
        setUserData({
          name: user.hoTen,
          phone: user.soDienThoai,
          email: user.email,
          userId: user.id || user.id_user,
        });
        setEditData({
          name: user.hoTen,
          phone: user.soDienThoai,
          email: user.email,
          userId: user.id || user.id_user,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Không lấy được thông tin người dùng!");
        setLoading(false);
        setTimeout(() => navigate("/signin"), 1500);
      });
  }, [navigate]);

  // Sửa info
  const handleEdit = () => setIsEditing(true);

  // Gửi cập nhật lên BE
  const handleSave = async () => {
    setError("");
    setSuccessMsg("");
    const token = localStorage.getItem("token");
    try {
      // Gọi API PUT (ví dụ url: /api/user/me hoặc /api/user/update)
      const res = await axios.put(
        "http://localhost:2006/api/user/me",
        {
          hoTen: editData.name,
          soDienThoai: editData.phone,
          email: editData.email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData({ ...editData });
      setIsEditing(false);
      setSuccessMsg("Cập nhật thành công!");
    } catch (err) {
      setError("Lỗi khi cập nhật thông tin!");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditData((prev) => ({ ...prev, [id]: value }));
  };

  // Loading, error, success UI
  if (loading) return <div>Đang tải thông tin...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-info-page">
      <div className="user-card-container">
        <div className="user-card">
          <h2>Thông tin cá nhân:</h2>
          {isEditing ? (
            <div>
              <div className="user-info">
                <span className="label">-Họ tên:</span>
                <input
                  type="text"
                  id="name"
                  value={editData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="user-info">
                <span className="label">-Số điện thoại:</span>
                <input
                  type="text"
                  id="phone"
                  value={editData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="user-info">
                <span className="label">-Email:</span>
                <input
                  type="email"
                  id="email"
                  value={editData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="user-info">
                <span className="label userId">-Mã người dùng:</span>
                <input
                  type="text"
                  id="userId"
                  value={editData.userId}
                  disabled // Không cho sửa mã user
                />
              </div>
              <button onClick={handleSave}>Lưu</button>
              <button onClick={() => setIsEditing(false)}>Hủy</button>
            </div>
          ) : (
            <div>
              <div className="user-info">
                <span className="label">-Họ tên:</span>{" "}
                <span id="name">{userData.name}</span>
              </div>
              <div className="user-info">
                <span className="label">-Số điện thoại:</span>{" "}
                <span id="phone">{userData.phone}</span>
              </div>
              <div className="user-info">
                <span className="label">-Email:</span>{" "}
                <span id="email">{userData.email}</span>
              </div>
              <div className="user-info">
                <span className="label userId">-Mã người dùng:</span>{" "}
                <span id="userId" className="userId">
                  {userData.userId}
                </span>
              </div>
              <button onClick={handleEdit}>Chỉnh sửa</button>
            </div>
          )}
          {successMsg && <div className="success-message">{successMsg}</div>}
        </div>
        <div className="user-card-left">
          <h2 className="welcome-text">
            Xin chào {userData.name} - Chào mừng bạn đến với Sân bóng D2HT!
          </h2>
        </div>
      </div>
    </div>
  );
}

export default UserIn4;
