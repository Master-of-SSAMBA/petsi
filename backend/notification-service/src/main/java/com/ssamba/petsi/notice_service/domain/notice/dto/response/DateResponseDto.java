package com.ssamba.petsi.notice_service.domain.notice.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DateResponseDto {
	private String date;
	private String time;

	public DateResponseDto(LocalDateTime createdAt) {
		this.date = createdAt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		this.time = createdAt.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
	}
}
