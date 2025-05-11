package Main.service;

import Main.dto.request.*;
import Main.entity.San;
import Main.entity.User;

import java.util.List;

public interface AdminService {

    List<UserDTO> getAllUser();

    String addSan(SanRequestDTO requestDTO);

    String deleteSan(Long id);

    String updateSan(Long id, UpdateSanDTO updateSanDTO);

    String addChiNhanh(ChiNhanhCreationRequest request);
    String addUser(User user);

    List<QuanLyDatSanDTO> getAllDatSan();

    public ChiTietDatSanDTO getDetailDatSan(Long id);
}
