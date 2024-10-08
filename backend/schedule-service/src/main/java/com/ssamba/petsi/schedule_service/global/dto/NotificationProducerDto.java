package com.ssamba.petsi.schedule_service.global.dto;

import com.ssamba.petsi.schedule_service.domain.schedule.entity.Schedule;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotificationProducerDto<T> {
	private Long userId;
	private T content;
	private Long id;

	public static NotificationProducerDto<ScheduleNoticeInfo> toNoticeProducerDto(Schedule schedule) {
		return new NotificationProducerDto<ScheduleNoticeInfo>(
			schedule.getScheduleCategory().getUserId(),
			new ScheduleNoticeInfo(
				schedule.getScheduleCategory().getTitle(),
				schedule.getDescription()
			),
			schedule.getScheduleId());
	}

	@AllArgsConstructor
	public static class ScheduleNoticeInfo {
		private String scheduleCategory;
		private String schedule;
	}
}
