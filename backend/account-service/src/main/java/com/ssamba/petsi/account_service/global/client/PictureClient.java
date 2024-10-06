package com.ssamba.petsi.account_service.global.client;

import java.util.List;
import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.ssamba.petsi.account_service.global.dto.PictureMonthlyRequestDto;

@FeignClient(name = "picture-service")
public interface PictureClient {

	@PostMapping("/api/v1/picture/get-monthly-picture")
	List<Integer> getMonthlyPicture(@RequestBody PictureMonthlyRequestDto req);
}
