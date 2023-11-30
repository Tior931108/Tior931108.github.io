document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;

    // 페이지 로드 시 첫 번째 페이지로 스크롤
    scrollToPage(currentPage);

    // 스크롤 이벤트 리스너 등록
    document.addEventListener("wheel", handleScroll);

    // 각 메뉴에 클릭 이벤트 리스너 등록
    const menuLinks = document.querySelectorAll("nav a");
    menuLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            handleLinkClick(e, link);            
        });
    });

    // 로고에 클릭 이벤트 리스너 등록
    const logo = document.querySelector(".logo a");
    logo.addEventListener("click", function(e) {
            handleLinkClick(e, logo); 
    });

    function handleScroll(event) {
        if (event.deltaY > 0) {
            // Scrolling down
            nextPage();
        } else {
            // Scrolling up
            prevPage();
        }

        // 스크롤 시 메뉴 바 아래에 표시될 요소 선택
        const scrollIndicator = document.querySelector(".scroll-indicator");

        // 현재 스크롤 위치 백분율 계산
        const scrollPercentage = (window.scrollY / (document.body.offsetHeight - window.innerHeight)) * 100;

        // 스크롤 시 body에 클래스 추가 또는 제거
        if (scrollPercentage > 0 && scrollPercentage < 100) {
        document.body.classList.add("scroll-indicator-visible");
        } else {
        document.body.classList.remove("scroll-indicator-visible");
        }

        // 스크롤 인디케이터 업데이트
        scrollIndicator.style.width = `${scrollPercentage}%`;

        // 인디케이터가 보일 때만 스크롤 인디케이터 요소를 보이도록 설정
        scrollIndicator.style.opacity = scrollPercentage > 0 && scrollPercentage < 100 ? 1 : 0;
    }

    //클릭 이벤트 리스너 등록
    function handleLinkClick(e, link) {
        const targetPageNumber = parseInt(link.getAttribute("href").slice(-1));
        e.preventDefault(); // 기본 링크 이벤트 방지
        scrollToPage(targetPageNumber);
    }

    function nextPage() {
        if (currentPage < 5) {
            currentPage++;
            scrollToPage(currentPage);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            scrollToPage(currentPage);
        }
    }

    function scrollToPage(pageNumber) {
        const targetPage = document.getElementById(`page${pageNumber}`);
        window.scrollTo({
            top: targetPage.offsetTop,
            behavior: "smooth"
        });
    }

});

    let currentIndex = 0;
    const sliders = document.querySelectorAll('.slider');
    const sliderWrap = document.querySelector('.sliderWrap');

    function showSlide(index) {
        const newPosition = -index * 100 + '%';
        sliderWrap.style.transform = 'translateX(' + newPosition + ')';
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % sliders.length;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 4000); // 자동 슬라이드 설정, 3000은 3초마다 변경

    // 초기 슬라이드 표시
    showSlide(currentIndex);

