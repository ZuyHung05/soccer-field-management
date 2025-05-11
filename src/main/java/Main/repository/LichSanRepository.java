package Main.repository;

import Main.entity.KhungGioCoDinh;
import Main.entity.LichSan;
import Main.entity.Ngay;
import Main.entity.San;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LichSanRepository extends JpaRepository<LichSan,Long> {
    Optional<LichSan> findBySanAndKhungGioCoDinhAndNgay(San s, KhungGioCoDinh k, Ngay n);
}
