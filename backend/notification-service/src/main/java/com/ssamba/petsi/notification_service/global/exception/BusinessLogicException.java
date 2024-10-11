package com.ssamba.petsi.notification_service.global.exception;

import lombok.Getter;

@Getter
public class BusinessLogicException extends RuntimeException {

	private final ExceptionCode code;

	public BusinessLogicException(ExceptionCode code) {
		super(code.getMessage());
		this.code = code;
	}
}
