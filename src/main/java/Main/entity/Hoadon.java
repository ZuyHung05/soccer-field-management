package Main.entity;

import jakarta.persistence.*;

@Entity
public class Hoadon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_hoadon")
    private Long id_hoadon;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "dat_san_id", nullable = false)
    private Datsan datsan;

    @Column(nullable = false)
    private String ngayTao;

    private double tongTien;

    private String hinhThucThanhToan;

    public Datsan getDatsan() {
        return datsan;
    }

    public void setDatsan(Datsan datsan) {
        this.datsan = datsan;
    }

    public String getHinhThucThanhToan() {
        return hinhThucThanhToan;
    }

    public void setHinhThucThanhToan(String hinhThucThanhToan) {
        this.hinhThucThanhToan = hinhThucThanhToan;
    }

    public Long getId() {
        return id_hoadon;
    }

    public void setId(Long id) {
        this.id_hoadon = id;
    }

    public String getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(String ngayTao) {
        this.ngayTao = ngayTao;
    }

    public double getTongTien() {
        return tongTien;
    }

    public void setTongTien(double tongTien) {
        this.tongTien = tongTien;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // Getters and Setters
}