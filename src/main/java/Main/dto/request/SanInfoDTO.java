package Main.dto.request;

public class SanInfoDTO {
    private String tenSan;
    private String loaiSan;
    private String tenChiNhanh;

    public SanInfoDTO(String loaiSan, String tenChiNhanh, String tenSan) {
        this.loaiSan = loaiSan;
        this.tenChiNhanh = tenChiNhanh;
        this.tenSan = tenSan;
    }

    public String getLoaiSan() {
        return loaiSan;
    }

    public void setLoaiSan(String loaiSan) {
        this.loaiSan = loaiSan;
    }

    public String getTenChiNhanh() {
        return tenChiNhanh;
    }

    public void setTenChiNhanh(String tenChiNhanh) {
        this.tenChiNhanh = tenChiNhanh;
    }

    public String getTenSan() {
        return tenSan;
    }

    public void setTenSan(String tenSan) {
        this.tenSan = tenSan;
    }
}