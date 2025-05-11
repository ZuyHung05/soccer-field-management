package Main.repository;

import Main.entity.Datsan;
import Main.entity.KhungGioCoDinh;
import Main.entity.Ngay;
import Main.entity.San;
import Main.service.TrangThai;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DatsanRepository extends JpaRepository<Datsan, Long> {
    // tìm theo sân, khungGioCoDinh (quan hệ), và ngay (LocalDate)
    Optional<Datsan> findBySanAndKhungGioCoDinhAndNgay(
            San san,
            KhungGioCoDinh khungGioCoDinh,
            LocalDate ngay
    );

    List<Datsan> findByTrangThai(TrangThai trangThai);


}
