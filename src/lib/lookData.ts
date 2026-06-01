// Mock data based on the Look. service PDF (KOSIS 2025, 학교알리미)

export const SCHOOLS = [
  { id: "cheongseok-hs", name: "청석고등학교", region: "충북 청주시", students: 780, galleryId: "cheongbbak" },
  { id: "hakseong-hs", name: "학성고등학교", region: "울산 남구", students: 850, galleryId: "hshs" },
  { id: "dimigo", name: "디미고", region: "경기 안산시", students: 600, galleryId: "dimigo" },
  { id: "seil-hs", name: "세일고", region: "인천 부평구", students: 920, galleryId: "seilhs" },
  { id: "daejeon-daeshin-hs", name: "대전대신고", region: "대전 서구", students: 730, galleryId: "daeshinhigh" },
  { id: "jungsan-hs", name: "중산고등학교", region: "서울 강남구", students: 810, galleryId: "jungsanhigh" },
];

export const NATIONAL_STATS = [
  { value: "42.3%", label: "청소년 사이버폭력 경험률", desc: "10명 중 4명이 온라인 사이버 폭력 경험" },
  { value: "17.6%", label: "사이버 언어폭력 가해 경험률", desc: "사이버폭력 유형 중 언어폭력 비율 최다" },
  { value: "19.3%", label: "디지털 혐오 표현 경험률", desc: "전년 대비 4.4%p 증가" },
];

export const MOTIVE_DATA = [
  { motive: "보복", value: 37 },
  { motive: "이유 없음", value: 24 },
  { motive: "분노/화", value: 23 },
  { motive: "재미", value: 17 },
];

// Per-school hate-speech category distribution (analyzed from crawled language data)
export type CategoryDatum = { name: string; value: number };
export const CATEGORY_BY_SCHOOL: Record<string, CategoryDatum[]> = {
  "cheongseok-hs": [
    { name: "남성", value: 25.9 },
    { name: "악플/욕설", value: 17.6 },
    { name: "여성/가족", value: 11.9 },
    { name: "연령", value: 10.1 },
    { name: "인종/국적", value: 8.6 },
    { name: "지역", value: 7.3 },
    { name: "기타 혐오", value: 18.6 },
  ],
  "hakseong-hs": [
    { name: "악플/욕설", value: 28.4 },
    { name: "남성", value: 19.2 },
    { name: "성소수자", value: 12.1 },
    { name: "여성/가족", value: 14.3 },
    { name: "연령", value: 8.0 },
    { name: "지역", value: 6.2 },
    { name: "기타 혐오", value: 11.8 },
  ],
  "dimigo": [
    { name: "지역", value: 22.5 },
    { name: "악플/욕설", value: 21.0 },
    { name: "남성", value: 18.0 },
    { name: "여성/가족", value: 12.5 },
    { name: "연령", value: 9.0 },
    { name: "인종/국적", value: 7.0 },
    { name: "기타 혐오", value: 10.0 },
  ],
  "seil-hs": [
    { name: "악플/욕설", value: 34.2 },
    { name: "외모 비하", value: 18.0 },
    { name: "남성", value: 12.4 },
    { name: "여성/가족", value: 11.0 },
    { name: "장애", value: 5.4 },
    { name: "기타 혐오", value: 19.0 },
  ],
  "daejeon-daeshin-hs": [
    { name: "성별 혐오", value: 31.0 },
    { name: "악플/욕설", value: 24.5 },
    { name: "외모 비하", value: 15.2 },
    { name: "지역", value: 10.5 },
    { name: "기타 혐오", value: 18.8 },
  ],
  "jungsan-hs": [
    { name: "연령", value: 26.5 },
    { name: "악플/욕설", value: 25.1 },
    { name: "남성", value: 15.3 },
    { name: "여성/가족", value: 14.2 },
    { name: "기타 혐오", value: 18.9 },
  ],
};

export type Expression = {
  phrase: string;
  category: string;
  risk: "high" | "mid" | "low";
  count: number;
  context: string;
};

export const TOP_EXPRESSIONS: Record<string, Expression[]> = {
  "cheongseok-hs": [
    { phrase: "ㅈㄴ 빻았네", category: "외모 비하", risk: "high", count: 142, context: "단체 채팅방에서 사진 공유 후 반응" },
    { phrase: "한남충", category: "성별 혐오", risk: "high", count: 118, context: "온라인 커뮤니티 댓글" },
    { phrase: "급식충", category: "연령 비하", risk: "mid", count: 96, context: "타학교 학생 지칭" },
    { phrase: "찐따", category: "관계 배제", risk: "mid", count: 88, context: "쉬는 시간 대화" },
    { phrase: "ㄹㅇ 토악질", category: "악플/욕설", risk: "mid", count: 71, context: "SNS 게시물 댓글" },
  ],
  "hakseong-hs": [
    { phrase: "퐁퐁남", category: "성별 혐오", risk: "high", count: 165, context: "익명 게시판" },
    { phrase: "OO충", category: "악플/욕설", risk: "high", count: 134, context: "단체 채팅" },
    { phrase: "게이같다", category: "성소수자 혐오", risk: "high", count: 102, context: "농담 형태로 반복" },
    { phrase: "맘충", category: "여성/가족 혐오", risk: "mid", count: 78, context: "온라인 커뮤니티" },
  ],
  "dimigo": [
    { phrase: "전라디언", category: "지역 혐오", risk: "high", count: 121, context: "지역 비하 밈 공유" },
    { phrase: "개찐따", category: "관계 배제", risk: "high", count: 99, context: "단체 채팅" },
    { phrase: "ㅈㄴ", category: "악플/욕설", risk: "mid", count: 187, context: "일상 대화에 빈번" },
  ],
  "seil-hs": [
    { phrase: "바보 멍청이", category: "악플/욕설", risk: "low", count: 210, context: "쉬는 시간 다툼" },
    { phrase: "뚱뚱이", category: "외모 비하", risk: "mid", count: 88, context: "체육 시간" },
    { phrase: "찐따", category: "관계 배제", risk: "mid", count: 64, context: "모둠 활동" },
  ],
  "daejeon-daeshin-hs": [
    { phrase: "김치녀", category: "여성 혐오", risk: "high", count: 154, context: "온라인 커뮤니티" },
    { phrase: "틀딱", category: "연령 비하", risk: "mid", count: 112, context: "선생님 지칭" },
    { phrase: "병먹금", category: "악플/욕설", risk: "low", count: 89, context: "단톡방 대화" },
  ],
  "jungsan-hs": [
    { phrase: "급식충", category: "연령 비하", risk: "mid", count: 175, context: "SNS 게시물 댓글" },
    { phrase: "개오바", category: "악플/욕설", risk: "low", count: 140, context: "일상 대화" },
    { phrase: "지잡대", category: "학벌 비하", risk: "high", count: 95, context: "성적 관련 대화" },
  ],
};

// 학교 알리미 - 학교폭력 예방교육 실적 (mock)
export const PREVENTION_HISTORY: Record<string, { target: string; hours: number; type: string }[]> = {
  "cheongseok-hs": [
    { target: "학생", hours: 6, type: "영상 시청" },
    { target: "교사", hours: 3, type: "강의" },
    { target: "학부모", hours: 2, type: "가정통신문" },
  ],
  "hakseong-hs": [
    { target: "학생", hours: 4, type: "영상 시청" },
    { target: "교사", hours: 2, type: "강의" },
    { target: "학부모", hours: 1, type: "가정통신문" },
  ],
  "dimigo": [
    { target: "학생", hours: 6, type: "영상 + 토론" },
    { target: "교사", hours: 4, type: "워크숍" },
    { target: "학부모", hours: 2, type: "특강" },
  ],
  "seil-hs": [
    { target: "학생", hours: 8, type: "역할극" },
    { target: "교사", hours: 3, type: "강의" },
    { target: "학부모", hours: 2, type: "가정통신문" },
  ],
  "daejeon-daeshin-hs": [
    { target: "학생", hours: 5, type: "영상 시청" },
    { target: "교사", hours: 2, type: "강의" },
    { target: "학부모", hours: 1, type: "가정통신문" },
  ],
  "jungsan-hs": [
    { target: "학생", hours: 7, type: "토론" },
    { target: "교사", hours: 4, type: "워크숍" },
    { target: "학부모", hours: 2, type: "특강" },
  ],
};

export type Quiz = {
  id: string;
  scenario: string;
  question: string;
  choices: { text: string; correct: boolean; feedback: string }[];
};

export const STUDENT_QUIZZES: Quiz[] = [
  {
    id: "q1",
    scenario: "단체 채팅방에 친구가 새로 찍은 사진을 올렸다. 누군가 \"ㅈㄴ 빻았네 ㅋㅋ\"라고 답했고 다들 웃음 이모지를 보냈다.",
    question: "이 상황에서 가장 적절한 반응은?",
    choices: [
      { text: "나도 웃음 이모지를 보낸다", correct: false, feedback: "동조도 가해에 가담하는 행동이에요. 침묵하거나 웃는 것만으로도 피해자에게는 큰 상처가 됩니다." },
      { text: "\"외모로 평가하는 말은 그만하자\"라고 말한다", correct: true, feedback: "맞아요. 한 사람의 짧은 개입이 그룹의 분위기를 바꿉니다." },
      { text: "캡처해서 다른 친구에게 공유한다", correct: false, feedback: "2차 확산은 피해를 키웁니다. 캡처 공유는 사이버폭력으로 처벌될 수 있어요." },
    ],
  },
  {
    id: "q2",
    scenario: "친구가 게임에서 진 상대에게 \"전라디언\"이라고 말했다. 친구는 \"그냥 농담\"이라고 한다.",
    question: "이 표현의 문제는 무엇일까?",
    choices: [
      { text: "특정 지역 출신을 비하하는 혐오 표현이다", correct: true, feedback: "맞아요. 지역 기반 혐오는 농담의 형태로 반복되면 차별로 굳어집니다." },
      { text: "문제 없다, 게임이니까", correct: false, feedback: "맥락이 게임이어도 표현 자체가 한 집단을 비하한다면 혐오 표현입니다." },
      { text: "상대가 기분 나빠하지 않으면 괜찮다", correct: false, feedback: "상대가 표현하지 않을 뿐 상처받고 있을 수 있어요. 또 듣는 다른 사람에게도 영향을 줍니다." },
    ],
  },
  {
    id: "q3",
    scenario: "친구가 \"쟤 진짜 찐따 같지 않냐\"라고 말하며 한 학생을 가리켰다.",
    question: "당신은 어떻게 할 수 있을까?",
    choices: [
      { text: "맞장구치며 같이 웃는다", correct: false, feedback: "동조는 배제의 분위기를 강화해요." },
      { text: "\"그런 식으로 부르지 말자\"라고 말한다", correct: true, feedback: "관계에서 작은 개입이 큰 변화를 만듭니다." },
      { text: "못 들은 척한다", correct: false, feedback: "방관도 피해자에게는 동의로 느껴질 수 있어요." },
    ],
  },
];
