package Main.dto.request;


import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

public class DatSanRequest {
    private Long sanId;
    private Long userId;
    private Long khungGioCoDinhId;

    @JsonFormat(pattern = "yyyy-MM-dd") // để parse từ JSON string
    private LocalDate ngay;

    // Constructors
    public DatSanRequest() {}

    public DatSanRequest(Long sanId, Long userId, Long khungGioCoDinhId, LocalDate ngay) {
        this.sanId = sanId;
        this.userId = userId;
        this.khungGioCoDinhId = khungGioCoDinhId;
        this.ngay = ngay;
    }

    // Getters and Setters
    public Long getSanId() { return sanId; }
    public void setSanId(Long sanId) { this.sanId = sanId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getKhungGioCoDinhId() { return khungGioCoDinhId; }
    public void setKhungGioCoDinhId(Long khungGioCoDinhId) { this.khungGioCoDinhId = khungGioCoDinhId; }

    public LocalDate getNgay() { return ngay; }
    public void setNgay(LocalDate ngay) { this.ngay = ngay; }
}

