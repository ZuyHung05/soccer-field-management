package Main.repository;

import Main.entity.Ngay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface NgayRepository extends JpaRepository<Ngay, Long> {
    Optional<Ngay> findByNgay(LocalDate ngay);
}
