package Main.entity;

import Main.service.TrangThai;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Datsan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_datsan")
    private Long id;

    @ManyToOne @JoinColumn(name="user_id", nullable=false)
    private User user;

    @ManyToOne @JoinColumn(name="san_id", nullable=false)
    private San san;

    @ManyToOne @JoinColumn(name="khung_gio_codinh_id", nullable=false)
    private KhungGioCoDinh khungGioCoDinh;

    @Column(nullable=false)
    private LocalDate ngay;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private TrangThai trangThai;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public KhungGioCoDinh getKhungGioCoDinh() {
        return khungGioCoDinh;
    }

    public void setKhungGioCoDinh(KhungGioCoDinh khungGioCoDinh) {
        this.khungGioCoDinh = khungGioCoDinh;
    }

    public LocalDate getNgay() {
        return ngay;
    }

    public void setNgay(LocalDate ngay) {
        this.ngay = ngay;
    }

    public San getSan() {
        return san;
    }

    public void setSan(San san) {
        this.san = san;
    }

    public TrangThai getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThai trangThai) {
        this.trangThai = trangThai;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
