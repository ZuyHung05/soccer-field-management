package Main.dto.request;

public class UserDTO {
    private String id;
    private String hoTen;
    private String soDienThoai;

    public UserDTO(String hoTen, Long id, String soDienThoai) {
        this.hoTen = hoTen;
        this.id = String.valueOf(id);
        this.soDienThoai = soDienThoai;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }
}
