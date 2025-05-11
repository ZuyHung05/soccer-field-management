package Main.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Chinhanh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idchinhanh")
    private Long id;

    @Column(nullable = false, unique = true)
    private String tenChiNhanh;

    @Column(nullable = false)
    private String diaChi;

    @OneToMany(mappedBy = "chiNhanh", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> users;

    @OneToMany(mappedBy = "chiNhanh", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<San> sans;

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

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<San> getSans() {
        return sans;
    }

    public void setSans(List<San> sans) {
        this.sans = sans;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }
}