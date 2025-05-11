package Main.dto.request;

public class UpdateSanDTO {
    private String tenSan;
    private String loaiSan;
    private Long giaSan;

    public UpdateSanDTO(Long giaSan, String loaiSan, String tenSan) {
        this.giaSan = giaSan;
        this.loaiSan = loaiSan;
        this.tenSan = tenSan;
    }

    public Long getGiaSan() {
        return giaSan;
    }

    public void setGiaSan(Long giaSan) {
        this.giaSan = giaSan;
    }

    public String getLoaiSan() {
        return loaiSan;
    }

    public void setLoaiSan(String loaiSan) {
        this.loaiSan = loaiSan;
    }

    public String getTenSan() {
        return tenSan;
    }

    public void setTenSan(String tenSan) {
        this.tenSan = tenSan;
    }
}
