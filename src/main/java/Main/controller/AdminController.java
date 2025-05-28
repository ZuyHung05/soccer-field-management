package Main.controller;

import Main.dto.request.*;
import Main.entity.Chinhanh;
import Main.entity.San;
import Main.entity.User;
import Main.service.AdminService;
import Main.service.SanService;
import Main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private UserService userService;

    @Autowired
    private SanService sanService;

    // QUẢN LÝ NGƯỜI DÙNG

    // Xem danh sách tất cả user
    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {

        return adminService.getAllUser();
    }



    // QUẢN LÝ SÂN BÓNG
    //1. Xoá sân bóng theo ID
    @DeleteMapping("/sân/{id}")
    public String deleteSan(@PathVariable Long id) {

        return adminService.deleteSan(id);
    }

    //2. Cập nhật thông tin sân bóng
    @PutMapping("/sân/{id}")
    public String updateSan(@PathVariable Long id, @RequestBody UpdateSanDTO san) {
        return adminService.updateSan(id, san);
    }

    // Thêm chi nhánh mới
    @PostMapping("/themchinhanh")
    public String addChiNhanh(@RequestBody ChiNhanhCreationRequest request) {
        return adminService.addChiNhanh(request);
    }
    // Thêm sân mới
    @PostMapping("/taoSan")
    public San taoSan(@RequestBody SanRequestDTO request) {
        return sanService.taoSanVaKhungGio(request);
    }


    // QUẢN LÝ THANH TOÁN
    // 1. Xem tất cả các sân đã được đặt
    @GetMapping("/quanlydat")
    public List<QuanLyDatSanDTO> getAllDatSan () {
        return adminService.getAllDatSan();
    }
    // 1. Xem chi tiết sân đã đặt
    @GetMapping("/quanlydat/{id}")
    public ChiTietDatSanDTO getDetailDatSan(@PathVariable Long id) {
        return adminService.getDetailDatSan(id);
    }

    // Những phần của user admin có thể thực hiện
    // 1. Xem tất cả sân
    @GetMapping("/san")
    public List<SanInfoDTO> getAllSan() {
        return userService.getAllSan();
    }
    // 2. Xem tất cả chi nhánh
    @GetMapping("/chinhanh")
    public List<ChiNhanhDTO> getAllChiNhanh() {
        return userService.getAllChiNhanh();
    }
    // 3. Lọc sân theo khu vực (chi nhánh ID)
    @GetMapping("/khuvuc")
    public List<SanInfoDTO> getKhuVuc(@RequestParam Long chiNhanhId) {
        return userService.filterSanByKhuVuc(chiNhanhId);
    }
    // 4. Lọc sân theo tên
    @GetMapping("/ten")
    public San getTen(@RequestParam String ten) {
        return userService.filterSanByTen(ten);
    }
    //5. Xem chi tiết sân

    @GetMapping("/{id}")
    public SanDTO getSan(@PathVariable Long id) {
        return userService.getSanInfoById(id);
    }

}
