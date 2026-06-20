// DOM(Document Object Model) 요소들을 변수에 할당
const tempInput = document.getElementById('temp-input');
const recommendBtn = document.getElementById('recommend-btn');
const resultSection = document.getElementById('result-section');
const outfitResult = document.getElementById('outfit-result');
const tipResult = document.getElementById('tip-result');

// 출력할 랜덤 팁 배열 선언
const tips = [
    "일교차가 크니 가디건을 챙기세요.",
    "추위를 많이 탄다면 외투를 준비하세요.",
    "햇빛이 강하면 모자를 추천합니다.",
    "비 예보가 있다면 우산도 챙기세요.",
    "아침에는 다소 쌀쌀할 수 있습니다."
];

/**
 * 입력된 기온에 맞는 옷차림을 반환하는 함수
 * @param {number} temp - 사용자가 입력한 기온
 * @returns {string} 추천 옷차림 텍스트
 */
function getOutfitRecommendation(temp) {
    if (temp >= 30) {
        return "민소매, 반팔, 반바지, 샌들";
    } else if (temp >= 27) {
        return "반팔, 반바지, 얇은 셔츠";
    } else if (temp >= 23) {
        return "반팔, 얇은 셔츠, 면바지";
    } else if (temp >= 20) {
        return "얇은 가디건, 긴바지";
    } else if (temp >= 17) {
        return "가디건, 맨투맨, 청바지";
    } else if (temp >= 12) {
        return "니트, 후드티, 긴바지";
    } else if (temp >= 9) {
        return "자켓, 트렌치코트";
    } else if (temp >= 5) {
        return "코트, 니트";
    } else if (temp >= 0) {
        return "패딩, 목도리";
    } else {
        // 0℃ 미만인 경우
        return "두꺼운 패딩, 장갑, 목도리";
    }
}

// 추천받기 버튼 클릭 이벤트 핸들러
recommendBtn.addEventListener('click', () => {
    // 앞뒤 공백을 제거한 입력값 가져오기
    const inputValue = tempInput.value.trim();

    // 1. 빈칸 예외 처리
    if (inputValue === '') {
        alert("기온을 입력해주세요.");
        return;
    }

    const temp = Number(inputValue);

    // 2. 숫자가 아닌 경우 예외 처리
    // input type="number"라도 브라우저에 따라 'e', '+', '-' 등 문자가 섞일 수 있음
    if (isNaN(temp)) {
        alert("기온을 숫자로 입력해주세요.");
        return;
    }

    // 3. 비정상적인 기온 범위 예외 처리
    if (temp <= -50 || temp >= 60) {
        alert("올바른 기온을 입력해주세요.");
        return;
    }

    // 옷차림 추천 및 랜덤 팁 결과 가져오기
    const recommendedOutfit = getOutfitRecommendation(temp);
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // DOM 요소에 결과 텍스트 반영
    outfitResult.textContent = recommendedOutfit;
    tipResult.textContent = randomTip;

    // 숨겨져 있던 결과 섹션을 보이도록 설정
    resultSection.classList.remove('hidden');

    // 카드가 부드럽게 나타나는 애니메이션을 매번 다시 재생하기 위한 트릭
    const cards = resultSection.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.animation = 'none'; // 애니메이션 초기화
        void card.offsetWidth; // 브라우저 리플로우(Reflow) 강제 발생시켜 변경사항 즉시 적용
        card.style.animation = null; // CSS에 정의된 애니메이션 속성 재적용
    });
});

// 사용성 향상: 인풋 창에서 Enter 키를 눌러도 버튼이 클릭되도록 설정
tempInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        recommendBtn.click();
    }
});
