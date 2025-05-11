package Main.dto.request;

import Main.dto.request.KhungGioCoDinhDTO;

import java.util.List;

public class SanDTO {
    private String tenSan;
    private String diaChi;
    private String loaiSan;
    private String giaSan;
    private List<KhungGioCoDinhDTO> khungGioCoDinhs; // Danh sách khung giờ

    public SanDTO(String diaChi, String giaSan, List<KhungGioCoDinhDTO> khungGioCoDinhs, String loaiSan, String tenSan) {
        this.diaChi = diaChi;
        this.giaSan = giaSan;
        this.khungGioCoDinhs = khungGioCoDinhs;
        this.loaiSan = loaiSan;
        this.tenSan = tenSan;
    }

    public SanDTO(String tenSan, String loaiSan, String diaChi, Long giaSan, List<KhungGioCoDinhDTO> khungGioDtos) {
        this.tenSan = tenSan;
        this.loaiSan = loaiSan;
        this.diaChi = diaChi;
        this.giaSan = giaSan != null ? String.valueOf(giaSan) : null; // vì field là String
        this.khungGioCoDinhs = khungGioDtos;
    }

    // Getters và setters
    public String getTenSan() {
        return tenSan;
    }

    public void setTenSan(String tenSan) {
        this.tenSan = tenSan;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public List<KhungGioCoDinhDTO> getKhungGioCoDinhs() {
        return khungGioCoDinhs;
    }

    public void setKhungGioCoDinhs(List<KhungGioCoDinhDTO> khungGioCoDinhs) {
        this.khungGioCoDinhs = khungGioCoDinhs;
    }

    public String getGiaSan() {
        return giaSan;
    }

    public void setGiaSan(String giaSan) {
        this.giaSan = giaSan;
    }

    public String getLoaiSan() {
        return loaiSan;
    }

    public void setLoaiSan(String loaiSan) {
        this.loaiSan = loaiSan;
    }
}