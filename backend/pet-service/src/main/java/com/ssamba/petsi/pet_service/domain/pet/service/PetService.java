package com.ssamba.petsi.pet_service.domain.pet.service;

import com.ssamba.petsi.pet_service.domain.pet.dto.request.PetCreateRequestDto;
import com.ssamba.petsi.pet_service.domain.pet.dto.request.PetUpdateRequestDto;
import com.ssamba.petsi.pet_service.domain.pet.dto.response.PetCustomDto;
import com.ssamba.petsi.pet_service.domain.pet.dto.response.PetResponseDto;
import com.ssamba.petsi.pet_service.domain.pet.entity.Pet;
import com.ssamba.petsi.pet_service.domain.pet.enums.PetStatus;
import com.ssamba.petsi.pet_service.domain.pet.repository.PetRepository;
import com.ssamba.petsi.pet_service.global.exception.BusinessLogicException;
import com.ssamba.petsi.pet_service.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PetService {

    private final S3Service s3Service;
    private final PetRepository petRepository;

    @Transactional(readOnly = true)
    public List<PetResponseDto> getPets(Long userId) {
        List<Pet> pets = petRepository.findAllByUserId(userId);
        return pets.stream()
                .filter(pet -> PetStatus.ACTIVATED.getValue().equals(pet.getStatus()))
                .map(p -> new PetResponseDto(p, calAge(p.getBirthdate())))
                .toList();
    }

    @Transactional(readOnly = true)
    public PetResponseDto getPet(Long userId, Long petId) {
        Pet pet = petRepository.findByPetId(petId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PET_NOT_FOUND));

        if(pet.getStatus().equals(PetStatus.INACTIVATED.getValue()))
            throw new BusinessLogicException(ExceptionCode.PET_NOT_FOUND);

        if(userId != pet.getUserId()) {
            throw new BusinessLogicException(ExceptionCode.PET_USER_NOT_MATCH);
        }

        return PetResponseDto.fromEntity(pet, calAge(pet.getBirthdate()));
    }

    @Transactional
    public void savePet(Long userId, PetCreateRequestDto petDto, MultipartFile image) {
        String url = null;

        if(!image.isEmpty()) {
            // 사진 확장자인지 확인
            if(!isValidImageMimeType(image)) {
                throw new BusinessLogicException(ExceptionCode.INVALID_FILE_FORM);
            }

            // 사진 업로드
            try {
                // 파일명 지정 (겹치면 안되고, 확장자 빼먹지 않도록 조심!)
                String fileName = UUID.randomUUID() + image.getOriginalFilename();
                // 파일데이터와 파일명 넘겨서 S3에 저장
                url = s3Service.upload(image, fileName);
            } catch (Exception e) {
                // 사진 업로드 오류 처리
                throw new BusinessLogicException(ExceptionCode.INTERNAL_SERVER_ERROR);
            }
        }

        Pet pet = petDto.convertToPet(userId, url);
        petRepository.save(pet);
    }

    @Transactional
    public void updatePet(Long userId, PetUpdateRequestDto petDto, MultipartFile image) {
        String url = null;

        Pet pet = petRepository.findByPetId(petDto.getPetId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PET_NOT_FOUND));

        if(pet.getStatus().equals(PetStatus.INACTIVATED.getValue()))
            throw new BusinessLogicException(ExceptionCode.PET_NOT_FOUND);

        if(pet.getUserId() != userId) throw new BusinessLogicException(ExceptionCode.PET_USER_NOT_MATCH);

        if(image != null && !image.isEmpty()) {
            // 사진 확장자인지 확인
            if(!isValidImageMimeType(image)) {
                throw new BusinessLogicException(ExceptionCode.INVALID_FILE_FORM);
            }

            // 사진 업로드
            try {
                // 파일명 지정 (겹치면 안되고, 확장자 빼먹지 않도록 조심!)
                String fileName = UUID.randomUUID() + image.getOriginalFilename();
                // 파일데이터와 파일명 넘겨서 S3에 저장
                url = s3Service.upload(image, fileName);
            } catch (Exception e) {
                // 사진 업로드 오류 처리
                throw new BusinessLogicException(ExceptionCode.INTERNAL_SERVER_ERROR);
            }
        }

        pet.updatePet(petDto, url);
    }

    @Transactional
    public void deletePet(Long userId, Long petId) {
        Pet pet = petRepository.findByPetId(petId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PET_NOT_FOUND));

        if(pet.getStatus().equals(PetStatus.INACTIVATED.getValue()))
            throw new BusinessLogicException(ExceptionCode.PET_NOT_FOUND);

        if(userId != pet.getUserId()) throw new BusinessLogicException(ExceptionCode.PET_USER_NOT_MATCH);

        pet.deletePet();
    }

    @Transactional
    public PetCustomDto getPetInfo(Long petId) {
        Pet pet = petRepository.findByPetId(petId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PET_NOT_FOUND));

        return new PetCustomDto(petId, pet.getName(), pet.getImage());
    }

    // 확장자 확인 메서드
    private boolean isValidImageMimeType(MultipartFile file) {
        // 허용되는 MIME 타입 목록
        String[] validMimeTypes = {"image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp", "image/tiff"};

        // MIME 타입 확인
        String mimeType = file.getContentType();

        // MIME 타입이 허용된 목록에 있는지 확인
        return mimeType != null && Arrays.asList(validMimeTypes).contains(mimeType);
    }

    private PetResponseDto.Age calAge(LocalDate birthDate) {
        LocalDate today = LocalDate.now();
        long daysBetween = ChronoUnit.MONTHS.between(birthDate, today);

        long year = daysBetween / 12;
        long month = daysBetween % 12;
        if(year == 0 && month == 0) month = 1;

        return new PetResponseDto.Age(year, month);
    }

}
