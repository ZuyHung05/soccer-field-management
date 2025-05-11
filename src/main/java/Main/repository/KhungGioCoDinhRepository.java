package Main.repository;

import Main.entity.KhungGioCoDinh;
import Main.entity.San;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KhungGioCoDinhRepository extends JpaRepository<KhungGioCoDinh, Long> {
    List<KhungGioCoDinh> findBySan(San san);


}
