package com.ssamba.petsi.schedule_service.domain.schedule.dto.response;

import java.util.List;
import java.util.stream.Collectors;

import com.ssamba.petsi.schedule_service.domain.schedule.entity.Schedule;
import com.ssamba.petsi.schedule_service.domain.schedule.enums.IntervalType;
import com.ssamba.petsi.schedule_service.global.dto.PetCustomDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GetScheduleDetailResponseDto {

	@Getter
	@AllArgsConstructor
	public static class PetWithStatus {
		PetCustomDto pet;
		boolean isAssigned;

		public static List<PetWithStatus> createPetWithStatusList(List<PetCustomDto> aList, List<Long> bList) {
			return aList.stream()
				.map(pet -> new PetWithStatus(
					pet,
					bList.contains(pet.getPetId()) // petId가 bList에 있으면 true, 아니면 false
				))
				.collect(Collectors.toList());
		}

	}

	@Setter
	private List<PetWithStatus> pet;
	private String title;
	private DateResponseDto dueDate;
	private String intervalType;
	private int intervalDay;

	public GetScheduleDetailResponseDto(Schedule schedule) {
		//todo : petList 갖고와서 변환
		this.title = schedule.getDescription();
		this.dueDate = new DateResponseDto(schedule.getNextScheduleDate());
		this.intervalType = schedule.getIntervalType();
		this.intervalDay = schedule.getIntervalDay();
	}
}
