package Main.dto.request;

public class KhungGioCoDinhDTO {
    private String khungGio;  // Ví dụ: "08:00-09:00"
    private String trangThai; // Trạng thái: "Trống" hoặc "Đã đặt"

    // Constructor
    public KhungGioCoDinhDTO(String khungGio, String trangThai) {
        this.khungGio = khungGio;
        this.trangThai = trangThai;
    }

    // Getters và setters
    public String getKhungGio() {
        return khungGio;
    }

    public void setKhungGio(String khungGio) {
        this.khungGio = khungGio;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }
}
