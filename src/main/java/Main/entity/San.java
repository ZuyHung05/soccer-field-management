package Main.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
public class San {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_san")
    private Long id;
    private String tenSan;
    private String loaiSan;
    private Long giaSan;

    @ManyToOne
    @JoinColumn(name = "chi_nhanh_id", nullable = false) //
    private Chinhanh chiNhanh;

    @OneToMany(mappedBy = "san", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KhungGioCoDinh> khungGioCoDinhs;

    public Chinhanh getChiNhanh() {
        return chiNhanh;
    }

    public void setChiNhanh(Chinhanh chiNhanh) {
        this.chiNhanh = chiNhanh;
    }

    public Long getGiaSan() {
        return giaSan;
    }

    public void setGiaSan(Long giaSan) {
        this.giaSan = giaSan;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<KhungGioCoDinh> getKhungGioCoDinhs() {
        return khungGioCoDinhs;
    }

    public void setKhungGioCoDinhs(List<KhungGioCoDinh> khungGioCoDinhs) {
        this.khungGioCoDinhs = khungGioCoDinhs;
    }

    public String getLoaiSan() {
        return loaiSan;
    }

    public void setLoaiSan(String loaiSan) {
        this.loaiSan = loaiSan;
    }

    public String getTenSan() {
        return tenSan;
    }

    public void setTenSan(String tenSan) {
        this.tenSan = tenSan;
    }

    // getters/setters…
}
