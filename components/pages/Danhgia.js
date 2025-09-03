import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Danhgia.css";

// Tạo instance axios với baseURL
const api = axios.create({
  baseURL: "http://localhost:2006",
});

const Danhgia = () => {
  const [formData, setFormData] = useState({
    field: "",
    rating: "",
    comment: "",
  });
  const [reviews, setReviews] = useState([]);
  const [fields, setFields] = useState([]);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/admin/san");
        // Xử lý dữ liệu từ SanInfoDTO
        const formattedFields = response.data.map((item) => ({
          id: item.id,
          name: item.tenSan,
        }));
        setFields(formattedFields);
      } catch (error) {
        console.error("Lỗi tải danh sách sân:", error);
        // Giữ dữ liệu mock nếu API thất bại
        setFields([
          { id: 1, name: "Sân 1" },
          { id: 2, name: "Sân 2" },
          { id: 3, name: "Sân 3" },
          { id: 4, name: "Sân 4" },
        ]);
      }

      // Mock initial review (có thể thay bằng API sau)
      setReviews([
        {
          id: 1,
          field: "Sân Việt Thắng",
          rating: "5",
          comment: "Sân rất đẹp, chất lượng tốt!",
        },
      ]);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.field || !formData.rating || !formData.comment) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // In a real app, this would be sent to an API
    const newReview = {
      id: Date.now(),
      field: formData.field,
      rating: formData.rating,
      comment: formData.comment,
    };

    setReviews([newReview, ...reviews]);

    // Reset form
    setFormData({
      field: "",
      rating: "",
      comment: "",
    });

    alert("Đánh giá của bạn đã được gửi thành công!");
  };

  // Helper function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < parseInt(rating); i++) {
      stars.push("⭐️");
    }
    return stars.join("");
  };

  return (
    <div className="container">
      <div className="cform">
        <div className="formimg"></div>
        <form className="reviewform" id="reviewForm" onSubmit={handleSubmit}>
          <label htmlFor="field">Chọn sân:</label>
          <select
            name="field"
            id="field"
            value={formData.field}
            onChange={handleChange}
            required
          >
            <option value="">Chọn sân:</option>
            {fields.map((field) => (
              <option key={field.id} value={field.name}>
                {field.name}
              </option>
            ))}
          </select>

          <label htmlFor="rating">Chấm điểm:</label>
          <select
            name="rating"
            id="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Chọn điểm đánh giá</option>
            <option value="1">⭐️ (Tệ)</option>
            <option value="2">⭐️⭐️ (Không hài lòng)</option>
            <option value="3">⭐️⭐️⭐️ (Bình thường)</option>
            <option value="4">⭐️⭐️⭐️⭐️ (Tốt)</option>
            <option value="5">⭐️⭐️⭐️⭐️⭐️ (Tuyệt vời)</option>
          </select>

          <label htmlFor="comment">Nhận xét:</label>
          <textarea
            name="comment"
            id="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Gửi đánh giá</button>
        </form>
        <div className="formimage"></div>
      </div>

      <h2>Đánh Giá Mới Nhất</h2>
      <div id="reviewsList">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <hr />
            <p>
              <strong>Sân:</strong> {review.field}
            </p>
            <p>
              <strong>Đánh Giá:</strong> {renderStars(review.rating)}
            </p>
            <p>
              <strong>Nhận Xét:</strong> {review.comment}
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Danhgia;