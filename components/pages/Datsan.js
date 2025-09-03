import React from 'react';
import '../../styles/Datsan.css';

const Datsan = () => {
  return (
    <div className="datsan-container">
      <h1 className="datsan-title">Đặt Lịch Sân Bóng</h1>
      
      <div className="datsan-form">
        <div className="form-group">
          <label htmlFor="name">Họ và tên:</label>
          <input type="text" id="name" name="name" placeholder="Nhập họ và tên của bạn" />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại:</label>
          <input type="tel" id="phone" name="phone" placeholder="Nhập số điện thoại của bạn" />
        </div>
        
        <div className="form-group">
          <label htmlFor="field">Chọn sân:</label>
          <select id="field" name="field">
            <option value="">-- Chọn sân --</option>
            <option value="san1">Sân 5 người</option>
            <option value="san2">Sân 7 người</option>
            <option value="san3">Sân 11 người</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Ngày đặt:</label>
          <input type="date" id="date" name="date" />
        </div>
        
        <div className="form-group">
          <label htmlFor="time">Giờ đặt:</label>
          <select id="time" name="time">
            <option value="">-- Chọn giờ --</option>
            <option value="7-8">7:00 - 8:00</option>
            <option value="8-9">8:00 - 9:00</option>
            <option value="9-10">9:00 - 10:00</option>
            <option value="10-11">10:00 - 11:00</option>
            <option value="14-15">14:00 - 15:00</option>
            <option value="15-16">15:00 - 16:00</option>
            <option value="16-17">16:00 - 17:00</option>
            <option value="17-18">17:00 - 18:00</option>
            <option value="18-19">18:00 - 19:00</option>
            <option value="19-20">19:00 - 20:00</option>
            <option value="20-21">20:00 - 21:00</option>
            <option value="21-22">21:00 - 22:00</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="note">Ghi chú:</label>
          <textarea id="note" name="note" placeholder="Nhập ghi chú nếu có"></textarea>
        </div>
        
        <button type="submit" className="datsan-submit">Đặt sân</button>
      </div>
      
      <div className="datsan-info">
        <h2>Thông tin đặt sân</h2>
        <p>Để đặt sân, quý khách vui lòng điền đầy đủ thông tin và chọn thời gian phù hợp.</p>
        <p>Sau khi đặt sân, chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút.</p>
        <p>Mọi thắc mắc xin liên hệ: <strong>0969272243</strong></p>
      </div>
    </div>
  );
};

export default Datsan;
