package Main.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "khung_gio_co_dinh")
public class KhungGioCoDinh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_khung_gio")
    private Long id;

    @Column(name = "thoi_gian_bat_dau", nullable = false)
    private String thoiGianBatDau;

    @Column(name = "thoi_gian_ket_thuc", nullable = false)
    private String thoiGianKetThuc;

    @ManyToOne @JoinColumn(name = "san_id", nullable = false)
    @JsonBackReference // Tránh vòng lặp vô hạn
    private San san;

    // === Constructors ===
    public KhungGioCoDinh() {
    }

    public KhungGioCoDinh(String thoiGianBatDau, String thoiGianKetThuc, San san) {
        this.thoiGianBatDau = thoiGianBatDau;
        this.thoiGianKetThuc = thoiGianKetThuc;
        this.san = san;
    }

    // === Getters & Setters ===
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getThoiGianBatDau() {
        return thoiGianBatDau;
    }

    public void setThoiGianBatDau(String thoiGianBatDau) {
        this.thoiGianBatDau = thoiGianBatDau;
    }

    public String getThoiGianKetThuc() {
        return thoiGianKetThuc;
    }

    public void setThoiGianKetThuc(String thoiGianKetThuc) {
        this.thoiGianKetThuc = thoiGianKetThuc;
    }

    public San getSan() {
        return san;
    }

    public void setSan(San san) {
        this.san = san;
    }

    // === Kiểm tra trạng thái đặt ===
    // TODO: Kết nối thực tế với bảng LichDatSan để kiểm tra xem khung giờ này đã có người đặt chưa
    public boolean isDaDat() {
        // Mặc định là chưa đặt. Nếu đã có bảng LichDatSan thì kiểm tra ở đây.
        return false;
    }

    public String getKhungGio() {
        return thoiGianBatDau + "-" + thoiGianKetThuc;
    }
}
