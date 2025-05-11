package Main.repository;

import Main.entity.San;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SanRepository extends JpaRepository<San, Long> {
    Optional<San> findByTenSan(String tenSan);
    List<San> findByChiNhanhId(Long chiNhanhId);
    List<San> findByLoaiSan(String loaiSan);

    @EntityGraph(attributePaths = "chiNhanh")
    List<San> findAll();
}
