package Main.dto.request;

import java.time.LocalDate;

public class QuanLyDatSanDTO {
    private Long idDatSan; // để biết click vào cái nào
    private String tenSan;
    private String chiNhanh;
    private LocalDate ngayDat;
    private String trangThaiThanhToan;

    public QuanLyDatSanDTO(String chiNhanh, Long idDatSan, LocalDate ngayDat, String tenSan, String trangThaiThanhToan) {
        this.chiNhanh = chiNhanh;
        this.idDatSan = idDatSan;
        this.ngayDat = ngayDat;
        this.tenSan = tenSan;
        this.trangThaiThanhToan = trangThaiThanhToan;
    }

    public QuanLyDatSanDTO() {

    }


    public String getChiNhanh() {
        return chiNhanh;
    }

    public void setChiNhanh(String chiNhanh) {
        this.chiNhanh = chiNhanh;
    }

    public Long getIdDatSan() {
        return idDatSan;
    }

    public void setIdDatSan(Long idDatSan) {
        this.idDatSan = idDatSan;
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
