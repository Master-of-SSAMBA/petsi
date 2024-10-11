interface StateMapItem {
    title: string;
    subtitle?: string;
    btn: number[];
}

interface StateMap {
    [key: string]: StateMapItem;
}

interface ButtonMapItem {
    color: string;
    label: string;
}

interface ButtonMap {
    [key: number]: ButtonMapItem;
}

export const stateMap: StateMap = {
    PictureSaveWarning: {
        title: "인증 내역을 저장하시겠어요?",
        subtitle: "저장된 인증 내역은 수정 및 삭제가 불가능합니다",
        btn: [0, 1],
    },
    PictureSaved: {
        title: "인증 내역이 저장되었습니다.",
        btn: [1],
    },
    PictureExist: {
        title: "등록 실패",
        subtitle: "오늘 이미 인증을 완료하셨습니다.",
        btn: [1],
    },
    RegistFail: {
        title: "등록 실패",
        subtitle: "알 수 없는 오류가 발생했습니다.",
        btn: [1],
    },
    CompleteSchedule: {
        title: "일정을 완료하셨나요?",
        subtitle: "설정하신 주기에 맞춰 다음 일정이 자동 등록됩니다",
        btn: [0, 1],
    },
    DeleteSchedule: {
        title: "일정을 삭제할까요?",
        subtitle: "삭제한 일정은 되돌릴 수 없습니다",
        btn: [0, 1],
    },
    RegistSuccess: {
        title: "가입 성공",
        subtitle:
            "작성하신 이메일로 인증 메일을 발송했습니다. 인증을 완료하셔야 가입이 완료됩니다.",
        btn: [1],
    },
    LeaveConfirm: {
        title: "회원 탈퇴",
        subtitle:
            "모든 정보는 소멸되며, 다시 복구할 수 없습니다. 그래도 탈퇴하시겠습니까?",
        btn: [0, 1],
    },
    Logout: {
        title: "로그아웃",
        subtitle: "로그아웃 하시겠습니까?",
        btn: [0, 1],
    },
    DeletePet: {
        title: "반려동물 삭제",
        subtitle: "관련된 정보가 삭제됩니다. 삭제하시겠습니까?",
        btn: [0, 1],
    },
    RegistrationError: {
        title: "등록 요청 실패",
        subtitle: "중복된 카테고리가 있습니다. 다른 이름을 사용해주세요.",
        btn: [1],
    },
};

export const buttonMap: ButtonMap = {
    0: { color: "lightgray", label: "취소" },
    1: { color: "pink", label: "확인" },
    2: { color: "yellow", label: "변경" },
};
