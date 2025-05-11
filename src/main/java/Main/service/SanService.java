package Main.service;

import Main.dto.request.SanRequestDTO;
import Main.entity.Chinhanh;
import Main.entity.KhungGioCoDinh;
import Main.entity.San;
import Main.repository.ChiNhanhRepository;
import Main.repository.KhungGioCoDinhRepository;
import Main.repository.SanRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SanService {
    private final SanRepository sanRepo;
    private final KhungGioCoDinhRepository khungRepo;
    private final ChiNhanhRepository chiNhanhRepo;

    // Constructor duy nhất
    public SanService(SanRepository sanRepo, KhungGioCoDinhRepository khungRepo, ChiNhanhRepository chiNhanhRepo) {
        this.sanRepo = sanRepo;
        this.khungRepo = khungRepo;
        this.chiNhanhRepo = chiNhanhRepo;
    }

    public San taoSanVaKhungGio(SanRequestDTO request) {
        San san = new San();
        san.setTenSan(request.getTenSan());
        san.setLoaiSan(request.getLoaiSan());
        san.setGiaSan(request.getGiaSan());

        // Tìm đối tượng Chinhanh
        Chinhanh cn = chiNhanhRepo.findById(request.getChiNhanhId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Chi nhánh với ID: " + request.getChiNhanhId()));
        san.setChiNhanh(cn);

        // Lưu đối tượng San
        San saved = sanRepo.save(san);

        // Tạo danh sách khung giờ cố định
        List<KhungGioCoDinh> slots = new ArrayList<>();
        for (int h = 8; h < 17; h++) {
            KhungGioCoDinh k = new KhungGioCoDinh();
            k.setThoiGianBatDau(String.format("%02d:00", h));
            k.setThoiGianKetThuc(String.format("%02d:00", h + 1));
            k.setSan(saved);
            slots.add(k);
        }

        // Lưu danh sách khung giờ
        khungRepo.saveAll(slots);

        saved.setKhungGioCoDinhs(slots);
        return saved;
    }
}
