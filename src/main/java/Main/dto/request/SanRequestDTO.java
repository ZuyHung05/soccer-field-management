package Main.dto.request;

public class SanRequestDTO {
    private String tenSan;
    private String loaiSan;
    private Long giaSan;
    private Long chiNhanhId; // Chỉ nhận ID của chi nhánh

    public String getTenSan() {
        return tenSan;
    }

    public void setTenSan(String tenSan) {
        this.tenSan = tenSan;
    }

    public String getLoaiSan() {
        return loaiSan;
    }

    public void setLoaiSan(String loaiSan) {
        this.loaiSan = loaiSan;
    }

    public Long getGiaSan() {
        return giaSan;
    }

    public void setGiaSan(Long giaSan) {
        this.giaSan = giaSan;
    }

    public Long getChiNhanhId() {
        return chiNhanhId;
    }

    public void setChiNhanhId(Long chiNhanhId) {
        this.chiNhanhId = chiNhanhId;
    }
}