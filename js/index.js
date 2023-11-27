window.onload = function(){
    let currentIndex = 0; // 현재 이미지
    const slider = document.querySelectorAll(".slider"); // 각각의 이미지들
    slider.forEach(el => el.style.opacity = "0"); // 모든 이미지 투명도 0
    slider[0].style.opacity = 1; // 첫번째 이미지는 투명도 1

    // 4초마다 전환
    setInterval(()=> {
        let nextIndex = (currentIndex + 1) % slider.length; // 다음 이미지

        slider[currentIndex].style.opacity = "0"; // 첫번째 이미지를 숨김
        slider[nextIndex].style.opacity = "1"; // 두번째 이미지 나타남
        slider.forEach(el => el.style.transition = "all 1s"); // 이미지 애니메이션 추가

        currentIndex = nextIndex; // 두번째 값을 현재 이미지에 저장
    }, 4000);
}

document.addEventListener("DOMContentLoaded", function() {
    const articles = document.querySelectorAll("#contents article");

    // 초기에 모든 article을 숨김 처리
    articles.forEach(article => {
        article.style.opacity = "0";
        article.style.transition = "opacity 1s";
    });

    function handleScroll() {
        articles.forEach((article, index) => {
            const rect = article.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.75) && (rect.bottom >= 0);

            if (isVisible) {
                article.style.opacity = "1";
            } else {
                article.style.opacity = "0";
            }
        });
    }

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 초기에 한번 실행
    handleScroll();
});