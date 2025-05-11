package Main.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ChiTietDatSanDTO {
    private String tenSan;
    private String chiNhanh;
    private LocalDate ngayDat;
    private String trangThaiThanhToan;
    private String khungGio;
    private Long giaTien;

    public ChiTietDatSanDTO(String chiNhanh, Long giaTien, String khungGio, LocalDate ngayDat, String tenSan, String trangThaiThanhToan) {
        this.chiNhanh = chiNhanh;
        this.giaTien = giaTien;
        this.khungGio = khungGio;
        this.ngayDat = ngayDat;
        this.tenSan = tenSan;
        this.trangThaiThanhToan = trangThaiThanhToan;
    }
    public ChiTietDatSanDTO() {
    }

    public String getChiNhanh() {
        return chiNhanh;
    }

    public void setChiNhanh(String chiNhanh) {
        this.chiNhanh = chiNhanh;
    }

    public Long getGiaTien() {
        return giaTien;
    }

    public void setGiaTien(Long giaTien) {
        this.giaTien = giaTien;
    }

    public String getKhungGio() {
        return khungGio;
    }

    public void setKhungGio(String khungGio) {
        this.khungGio = khungGio;
    }

    public LocalDate getNgayDat() {
        return ngayDat;
    }

    public void setNgayDat(LocalDate ngayDat) {
        this.ngayDat = ngayDat;
    }

    public String getTenSan() {
        return tenSan;
    }

    public void setTenSan(String tenSan) {
        this.tenSan = tenSan;
    }

    public String getTrangThaiThanhToan() {
        return trangThaiThanhToan;
    }

    public void setTrangThaiThanhToan(String trangThaiThanhToan) {
        this.trangThaiThanhToan = trangThaiThanhToan;
    }
}
