package Main.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Ngay {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private LocalDate ngay;

    @OneToMany(mappedBy = "ngay", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LichSan> lichSans;

    public Ngay() {
    }

    // Constructor nhận tham số LocalDate
    public Ngay(LocalDate ngay) {
        this.ngay = ngay;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<LichSan> getLichSans() {
        return lichSans;
    }

    public void setLichSans(List<LichSan> lichSans) {
        this.lichSans = lichSans;
    }

    public LocalDate getNgay() {
        return ngay;
    }

    public void setNgay(LocalDate ngay) {
        this.ngay = ngay;
    }
}
