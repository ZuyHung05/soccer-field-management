package Main.entity;

import Main.service.TrangThai;
import jakarta.persistence.*;

@Entity
public class LichSan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_lich_san")
    private Long id;

    @ManyToOne @JoinColumn(name = "san_id", nullable = false)
    private San san;

    @ManyToOne @JoinColumn(name = "khunggio_codinh_id", nullable = false)
    private KhungGioCoDinh khungGioCoDinh;

    @ManyToOne @JoinColumn(name = "ngay_id", nullable = false)
    private Ngay ngay;

    @ManyToOne @JoinColumn(name = "user_id")
    private User user;          // ai đặt, null nếu chưa đặt

    @Enumerated(EnumType.STRING)
    private TrangThai trangThai;  // CHUA_DAT, DA_DAT

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

    public Ngay getNgay() {
        return ngay;
    }

    public void setNgay(Ngay ngay) {
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
