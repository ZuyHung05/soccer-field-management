import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "../../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [fields, setFields] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [reloadTimeSlots, setReloadTimeSlots] = useState(false);

  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: "http://localhost:2006",
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

  // Fetch danh sách sân
  useEffect(() => {
    api.get("/api/admin/san")
      .then(res => {
        setFields(res.data);
        const chiNhanhs = [...new Set(res.data.map(f => f.tenChiNhanh).filter(Boolean))];
        setBranches(chiNhanhs);
      })
      .catch(err => console.error("Lỗi fetch sân:", err));
  }, []);

  // Realtime filter fields
  const filteredFields = fields.filter(f => {
    let ok = true;
    if (searchName) ok = f.tenSan.toLowerCase().includes(searchName.toLowerCase());
    if (searchArea) ok = ok && (f.tenChiNhanh === searchArea);
    return ok;
  });

  // Fetch khung giờ và đặt sân khi chọn sân hoặc reloadTimeSlots
  useEffect(() => {
    if (!selectedField) return;

    const fetchTimeSlotsAndBookings = async () => {
      try {
        const res = await api.get(`/user/${selectedField.id}`);
        const slots = res.data.khungGioCoDinhs || [];

        const bookingsRes = await api.get("/api/admin/quanlydat");
        const bookings = bookingsRes.data;

        const days = Array.from({ length: 5 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() + i);
          return d.toISOString().slice(0, 10);
        });

        const booked = bookings
          .filter(b => b.sanId === selectedField.id && days.includes(b.ngayDat))
          .map(b => ({
            date: b.ngayDat,
            slotId: b.khungGioCoDinhId,
          }));

        setBookedSlots(booked);
        setTimeSlots(slots);
      } catch (err) {
        console.error("Lỗi lấy khung giờ hoặc lịch sử đặt sân:", err);
      }
    };

    fetchTimeSlotsAndBookings();
    setReloadTimeSlots(false);
  }, [selectedField, reloadTimeSlots]);

  // Overlay logic
  const showFieldDetails = san => {
    setSelectedField(san);
    setShowOverlay(true);
  };
  const closeOverlay = () => {
    setShowOverlay(false);
    setSelectedField(null);
    setTimeSlots([]);
    setBookedSlots([]);
  };

  // Đặt sân - Kiểm tra và thông báo (đã sửa theo yêu cầu)
  const bookField = async (date, slotId) => {
    if (!token) {
      alert("Bạn cần đăng nhập để đặt sân!");
      navigate("/signin");
      return;
    }
    if (!selectedField) {
      alert("Không xác định được sân. Vui lòng thử lại!");
      return;
    }

    let userId = null;
    try {
      userId = jwtDecode(token).id;
    } catch {
      alert("Phiên đăng nhập lỗi, vui lòng đăng nhập lại!");
      navigate("/signin");
      return;
    }

    const isBooked = bookedSlots.some(b => b.date === date && b.slotId === slotId);
    if (isBooked) {
      const slotInfo = timeSlots.find(slot => slot.id === slotId);
      const dateFormatted = new Date(date).toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric"
      });
      alert(`Khung giờ ${slotInfo?.khungGio || 'này'} của sân ${selectedField.tenSan} vào ${dateFormatted} đã được đặt trước.\n\nVui lòng chọn khung giờ khác hoặc ngày khác!`);
      return;
    }

    try {
      await api.post("/user/datSan", {
        sanId: selectedField.id,
        userId, // GỬI userId lên
        khungGioCoDinhId: slotId,
        ngay: date,
      });

      const slotInfo = timeSlots.find(slot => slot.id === slotId);
      const dateFormatted = new Date(date).toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "numeric",
        month: "numeric"
      });

      alert(`🎉 Đặt sân thành công!\n\nSân: ${selectedField.tenSan}\nNgày: ${dateFormatted}\nGiờ: ${slotInfo?.khungGio || 'N/A'}\n\nCảm ơn bạn đã sử dụng dịch vụ!`);

      setShowOverlay(false);
      setSelectedField(null);
      setTimeSlots([]);
      setBookedSlots([]);
      setReloadTimeSlots(true);

    } catch (err) {
      let errorMessage = "Đã xảy ra lỗi khi đặt sân. Vui lòng thử lại!";
      if (
        err.response?.status === 409 ||
        (typeof err.response?.data === "string" && err.response.data.includes("Sân đã được đặt"))
      ) {
        const slotInfo = timeSlots.find(slot => slot.id === slotId);
        const dateFormatted = new Date(date).toLocaleDateString("vi-VN", {
          weekday: "long",
          day: "numeric",
          month: "numeric"
        });
        errorMessage = `Khung giờ ${slotInfo?.khungGio || 'này'} của sân ${selectedField.tenSan} vào ${dateFormatted} đã được đặt bởi người khác.\n\nVui lòng chọn khung giờ khác!`;
      } else if (err.response?.status === 400) {
        errorMessage = "Thông tin đặt sân không hợp lệ. Vui lòng kiểm tra lại!";
      } else if (err.response?.status === 401) {
        errorMessage = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!";
        setTimeout(() => navigate("/signin"), 2000);
      }
      alert(`❌ ${errorMessage}\n\nChi tiết lỗi: ${err.response?.data?.message || err.message}`);
    }
  };

  // Hiển thị lịch khung giờ
  const generateTimeSlots = () => {
    if (!selectedField) return <p>Chưa chọn sân.</p>;

    const days = Array.from({ length: 5 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d;
    });

    return (
      <div className="thoikhoabieu">
        {days.map((day, idx) => {
          const dateStr = day.toISOString().slice(0, 10);
          return (
            <div key={idx} className="ngay">
              <h4>
                {day.toLocaleDateString("vi-VN", {
                  weekday: "long",
                  day: "numeric",
                  month: "numeric",
                })}
              </h4>
              {timeSlots.map(slot => {
                const booked = bookedSlots.some(b => b.date === dateStr && b.slotId === slot.id);
                return (
                  <div
                    key={slot.id}
                    className={`khunggio ${booked ? "dat" : ""}`}
                  >
                    {slot.khungGio}
                    {!booked && (
                      <button
                        className="btn-book"
                        onClick={() => bookField(dateStr, slot.id)}
                        disabled={booked}
                      >
                        {token ? "Đặt sân" : "Đăng nhập để đặt"}
                      </button>
                    )}
                    {booked && (
                      <span className="full-slot" style={{color: 'red', fontWeight: 'bold'}}>
                        ❌ Đã đặt
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="welcome">
        <div className="welcome-left">
          <h1 className="chaomung xx">
            Chào mừng đến với sân bóng của chúng tôi!
          </h1>
          <p className="chaomung ss">
            Sân bóng D2HT là địa điểm lý tưởng dành cho những người đam mê bóng đá. Được thành lập bởi bốn người bạn chung chí hướng – Duy, Hoàng, Hưng và Tú, sân bóng không chỉ mang đến không gian rộng rãi, mặt cỏ chất lượng mà còn đi kèm với hệ thống đèn chiếu sáng hiện đại, phục vụ các trận đấu cả ban ngày lẫn ban đêm. Với tinh thần thể thao và mong muốn xây dựng một cộng đồng bóng đá sôi động, chủ sân luôn chú trọng đến chất lượng dịch vụ, đảm bảo khách hàng có những trải nghiệm tốt nhất. Dù là trận đấu giao hữu hay giải đấu bán chuyên, sân bóng D2HT luôn là sự lựa chọn hoàn hảo cho mọi đội bóng.
          </p>
        </div>
        <div className="welcome-right"></div>
      </div>

      <h2 className="danhsachsanbong">
        <p className="dssb">Danh sách sân bóng</p>
      </h2>

      <div className="listsearch">
        <div className="searchfield">
          <h2>Tìm kiếm sân:</h2>
          <label>Tên sân:</label>
          <input
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            placeholder="Nhập tên sân..."
          />
          <label>Chi nhánh:</label>
          <select
            value={searchArea}
            onChange={e => setSearchArea(e.target.value)}
          >
            <option value="">Tất cả</option>
            {branches.map((b, i) => (
              <option key={i} value={b}>{b}</option>
            ))}
          </select>
          <button onClick={() => { setSearchName(""); setSearchArea(""); }}>
            Đặt lại bộ lọc
          </button>
        </div>

        <div className="sanbong-container">
          {filteredFields.length === 0 ? (
            <p>Không tìm thấy sân phù hợp.</p>
          ) : (
            filteredFields.map((san, idx) => (
              <div key={idx} className="san-item">
                <h3>{san.tenSan}</h3>
                <p><strong>Chi nhánh:</strong> {san.tenChiNhanh}</p>
                <p><strong>Loại sân:</strong> {san.loaiSan}</p>
                <p><strong>Giá thuê:</strong> {san.giaSan?.toLocaleString("vi-VN")} VND</p>
                <button className="btn-datsan" onClick={() => showFieldDetails(san)}>
                  Xem chi tiết
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {showOverlay && selectedField && (
        <div className="overlay">
          <div className="overlay-content">
            <span className="close-btn" onClick={closeOverlay}>×</span>
            <h2>{selectedField.tenSan}</h2>
            <p><strong>Chi nhánh:</strong> {selectedField.tenChiNhanh}</p>
            <p><strong>Loại sân:</strong> {selectedField.loaiSan}</p>
            <p><strong>Giá thuê:</strong> {selectedField.giaSan?.toLocaleString("vi-VN")} VND</p>
            <h3>Lịch đặt sân</h3>
            {generateTimeSlots()}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;