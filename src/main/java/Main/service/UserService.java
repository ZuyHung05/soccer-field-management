package Main.service;

import Main.dto.request.ChiNhanhDTO;
import Main.dto.request.SanDTO;
import Main.dto.request.SanInfoDTO;
import Main.entity.Chinhanh;
import Main.entity.San;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    // Tìm sân theo tên
    San filterSanByTen(String tenSan);
    // Tìm sân theo chi nhánh
    List<SanInfoDTO> filterSanByKhuVuc(Long chiNhanhId);
    // Tìm tất cả sân
    List<SanInfoDTO> getAllSan();

    List<ChiNhanhDTO> getAllChiNhanh();

    List<San> filterSanByLoaiSan(String loaiSan);

    SanDTO getSanInfoById(Long id);


}
