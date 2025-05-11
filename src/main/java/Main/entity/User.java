package Main.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long id_user;

    @Column(nullable = false)
    private String hoTen;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String matKhau;

    private String soDienThoai;

    private String vaiTro;

    @ManyToOne
    @JoinColumn(name = "chi_nhanh_id", nullable = true)
    private Chinhanh chiNhanh;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Datsan> datsans;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Hoadon> hoadons;

    public Chinhanh getChiNhanh() {
        return chiNhanh;
    }

    public void setChiNhanh(Chinhanh chiNhanh) {
        this.chiNhanh = chiNhanh;
    }

    public List<Datsan> getDatsans() {
        return datsans;
    }

    public void setDatsans(List<Datsan> datsans) {
        this.datsans = datsans;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Hoadon> getHoadons() {
        return hoadons;
    }

    public void setHoadons(List<Hoadon> hoadons) {
        this.hoadons = hoadons;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public Long getId() {
        return id_user;
    }

    public void setId(Long id) {
        this.id_user = id;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public String getVaiTro() {
        return vaiTro;
    }

    public void setVaiTro(String vaiTro) {
        this.vaiTro = vaiTro;
    }

    // Getters and Setters
}