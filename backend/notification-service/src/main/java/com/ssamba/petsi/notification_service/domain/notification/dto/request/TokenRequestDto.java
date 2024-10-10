package com.ssamba.petsi.notification_service.domain.notification.dto.request;

import com.ssamba.petsi.notification_service.domain.notification.entity.UserToken;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TokenRequestDto {
	private String token;

	public UserToken toEntity(Long userId, TokenRequestDto dto) {
		return UserToken.builder()
			.token(dto.getToken())
			.userId(userId)
			.build();
	}
}
