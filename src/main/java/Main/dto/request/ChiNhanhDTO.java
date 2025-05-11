package Main.dto.request;

public class ChiNhanhDTO {
    private Long id;
    private String tenChiNhanh;

    // Jackson cần no‑arg constructor
    public ChiNhanhDTO() { }

    // Constructor thuận tiện khi mapping cả id và tên
    public ChiNhanhDTO(Long id, String tenChiNhanh) {
        this.id = id;
        this.tenChiNhanh = tenChiNhanh;
    }

    // getters & setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTenChiNhanh() {
        return tenChiNhanh;
    }
    public void setTenChiNhanh(String tenChiNhanh) {
        this.tenChiNhanh = tenChiNhanh;
    }
}
