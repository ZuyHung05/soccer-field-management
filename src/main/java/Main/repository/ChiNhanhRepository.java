package Main.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import Main.entity.Chinhanh;

public interface ChiNhanhRepository extends JpaRepository<Chinhanh, Long> {
    Optional<Chinhanh> findById(Long id);
}