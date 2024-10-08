package com.ssamba.petsi.notification_service.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

	INTERNAL_SERVER_ERROR(500, "알 수 없는 오류가 발생했습니다."),
	NOTIFICATION_NOT_FOUND(404, "해당하는 알림이 존재하지 않습니다."),
	FIREBASE_SEND_ERROR(500, "파이어베이스 전송에 실패했습니다." );

	private final int status;
	private final String message;

	ExceptionCode(int status, String message) {
		this.status = status;
		this.message = message;
	}
}