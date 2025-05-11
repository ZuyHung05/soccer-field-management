package Main.service;

import Main.dto.request.ChiNhanhDTO;
import Main.dto.request.KhungGioCoDinhDTO;
import Main.dto.request.SanDTO;
import Main.dto.request.SanInfoDTO;
import Main.entity.*;
import Main.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private SanRepository sanRepository;

    @Autowired
    private ChiNhanhRepository chiNhanhRepository;

    @Autowired
    private DatsanRepository datsanRepository;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private NgayRepository ngayRepository;

    @Override
    public San filterSanByTen(String tenSan) {
        try {
            return sanRepository.findByTenSan(tenSan)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sân với tên: " + tenSan));
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi tìm sân theo tên: " + tenSan, e);
        }
    }
    @Override
    public List<SanInfoDTO> filterSanByKhuVuc(Long chiNhanhId) {
        try {
            // Lấy danh sách sân theo chi nhánh ID
            List<San> danhSachSan = sanRepository.findByChiNhanhId(chiNhanhId);

            // Chuyển đổi các sân thành SanInfoDTO
            return danhSachSan.stream()
                    .map(san -> new SanInfoDTO(
                            san.getTenSan(),
                            san.getLoaiSan(),
                            san.getChiNhanh().getTenChiNhanh()
                    ))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lấy danh sách sân theo khu vực", e);
        }
    }


    @Override
    public List<SanInfoDTO> getAllSan() {
        try {
            // Lấy danh sách sân từ repository
            List<San> danhSachSan = sanRepository.findAll();

            // Chuyển đổi các sân thành SanInfoDTO
            return danhSachSan.stream()
                    .map(san -> new SanInfoDTO(
                            san.getTenSan(),
                            san.getLoaiSan(),
                            san.getChiNhanh().getTenChiNhanh()
                    ))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lấy danh sách tất cả sân", e);
        }
    }

    @Override
    public List<ChiNhanhDTO> getAllChiNhanh() {
        try {
            List<Chinhanh> danhSachChiNhanh = chiNhanhRepository.findAll();
            return danhSachChiNhanh.stream()
                    .map(chiNhanh -> new ChiNhanhDTO(chiNhanh.getId(), chiNhanh.getTenChiNhanh()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lấy danh sách tất cả chi nhánh", e);
        }
    }

    @Override
    public List<San> filterSanByLoaiSan(String loaiSan) {
        try {
            return sanRepository.findByLoaiSan(loaiSan);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi tìm sân theo loại sân: " + loaiSan, e);
        }
    }

    @Override
    public SanDTO getSanInfoById(Long id) {
        try {
            // Lấy sân theo ID
            San san = sanRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sân với ID: " + id));

            // Lấy danh sách KhungGioCoDinhDTO từ các khung giờ có trong sân
            List<KhungGioCoDinhDTO> khungGioDtos = san.getKhungGioCoDinhs().stream()
                    .map(khungGio -> new KhungGioCoDinhDTO(
                            khungGio.getThoiGianBatDau() + "-" + khungGio.getThoiGianKetThuc(),
                            khungGio.isDaDat() ? "Đã đặt" : "Trống"
                    ))
                    .collect(Collectors.toList());

            // Trả về SanDTO với thông tin sân và danh sách khung giờ
            return new SanDTO(
                    san.getTenSan(), // Name of the field
                    san.getLoaiSan(), // Type of the field
                    san.getChiNhanh().getDiaChi(), // Address of the branch
                    san.getGiaSan(), // Price of the field
                    khungGioDtos // List of time slots
                    // Add or remove parameters here based on the updated SanDTO
            );
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lấy thông tin sân theo ID", e);
        }
    }

    // Đặt sân

//    public String datSan(Long sanId, Long userId, String ngay, int idKhungGio) {
//        try {
//            // Kiểm tra các entity có tồn tại không
//            San san = sanRepository.findById(sanId)
//                    .orElseThrow(() -> new RuntimeException("Không tìm thấy Sân với ID: " + sanId));
//            User user = userRepository.findById(Math.toIntExact(userId))
//                    .orElseThrow(() -> new RuntimeException("Không tìm thấy User với ID: " + userId));
//            Ngay ngayEntity = ngayRepository.findByNgay(LocalDate.parse(ngay))
//                    .orElseThrow(() -> new RuntimeException("Không tìm thấy Ngày với ngày: " + ngay));
//
//            // Kiểm tra xem khung giờ đã được đặt hay chưa
//            Optional<Datsan> datsanOpt = datsanRepository.findBySanAndNgayAndIdKhungGio(san, ngayEntity, idKhungGio);
//            if (datsanOpt.isPresent()) {
//                return "Sân đã được đặt trong khoảng thời gian này!";
//            }
//
//            // Tạo đặt sân
//            Datsan datsan = new Datsan();
//            datsan.setSan(san);
//            datsan.setUser(user);
//            datsan.setNgay(LocalDate.parse(ngayEntity.toString()));
//            datsan.setTrangThai(TrangThai.valueOf("Đã Đặt"));
//            datsan.setIdKhungGio((long) idKhungGio); // Khung giờ chỉ cần id, hoặc bạn có thể thay bằng một đối tượng khác nếu cần.
//
//            // Lưu thông tin đặt sân
//            datsanRepository.save(datsan);
//
//            return "Đặt sân thành công!";
//        } catch (RuntimeException ex) {
//            throw ex;
//        } catch (Exception e) {
//            throw new RuntimeException("Lỗi khi đặt sân", e);
//        }
//    }

}
