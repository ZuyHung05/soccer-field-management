import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-info">
          <h3>Liên hệ</h3>
          <p>🏠 Địa chỉ: Phòng 303, tòa B1, Đại học Bách Khoa Hà Nội</p>
          <p>📞 Điện thoại: <a href="tel:0969272243">0969272243</a></p>
          <p>✉️ Email: <a href="mailto:tranvanduy2k5gtc@gmail.com">tranvanduy2k5gtc@gmail.com</a></p>
        </div>
        <div className="footer-social">
          <h3>Kết nối với chúng tôi</h3>
          <a href="#" className="social-icon">
            <FontAwesomeIcon icon={faFacebook} /> Facebook
          </a>
          <a href="#" className="social-icon">
            <FontAwesomeIcon icon={faInstagram} /> Instagram
          </a>
          <a href="#" className="social-icon">
            <FontAwesomeIcon icon={faTwitter} /> Twitter
          </a>
        </div>
      </div>
      <p className="footer-copy">© 2025 Sân bóng D2HT. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
