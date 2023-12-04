document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;
    // 헤더 상단에 표시될 줄 요소 선택
    const headerLine = document.querySelector(".header-line");

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

    // 스크롤 이벤트
    function handleScroll(e) {
        if (e.deltaY > 0) {
            // Scrolling down
            nextPage();
        } else {
            // Scrolling up
            prevPage();
        }

         // 현재 스크롤 위치 백분율 계산
         const scrollPercentage =
           (window.scrollY / (document.body.offsetHeight - window.innerHeight)) *
           100;

         // 스크롤 상태에 따라 줄의 좌우 크기 조절
         headerLine.style.width = `${100 - scrollPercentage}%`;
         headerLine.style.left = `${scrollPercentage / 2}%`;
    }

    //클릭 이벤트 리스너 등록
    function handleLinkClick(e, link) {
        const targetPageNumber = parseInt(link.getAttribute("href").slice(-1));
        e.preventDefault(); // 기본 링크 이벤트 방지
        scrollToPage(targetPageNumber);

        // 페이지 이동 시 줄의 위치 조절
        const targetPage = document.getElementById(`page${targetPageNumber}`);
        const scrollPercentage =
        (targetPage.offsetTop /
            (document.body.offsetHeight - window.innerHeight)) *
        100;

        headerLine.style.width = `${100 - scrollPercentage}%`;
        headerLine.style.left = `${scrollPercentage / 2}%`;
    }

    function nextPage() {
        if (currentPage < 6) {
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

// 이미지 슬라이드
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


// Web Storage에 저장된 유저 정보 키
const USER_INFO_KEY = 'users';

// checkCredentials 함수 수정
function checkCredentials(id, password) {
    const users = JSON.parse(localStorage.getItem(USER_INFO_KEY)) || [];

    for (const { id: storedId, password: storedPassword } of users) {
        if (storedId === id && storedPassword === password) {
            return true;
        }
    }

    return false;
}

// #login__button -> login__button 으로 수정
document.getElementById("login__button").addEventListener('click', () => {
    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;

    if (checkCredentials(id, password)) {
        alert('로그인 성공!!');
        updateUI({ id: id });
    } else {
        alert('로그인 실패. 아이디 또는 비밀번호를 확인하세요.');
    }
});

function redirectToSignUp() {
    window.location.href = 'membership.html';
}

// #logOut__button -> logOut__button 으로 수정
document.getElementById('logOut__button').addEventListener('click', () => {
    document.querySelector(".login-form").style.display = 'block';
    document.querySelector(".user-info").style.display = 'none';

    // 로그아웃 시 UI 업데이트
    updateUI(null);
});

// UI 업데이트 함수
function updateUI(user) {
    if (user) {
        // 로그인 상태
        document.querySelector('.login-form').style.display = 'none';
        document.querySelector('.user-info').style.display = 'flex';
        document.getElementById('#current-username').textContent = `안녕하세요!, ${id}님!`;
    } else {
        // 로그아웃 상태
        document.querySelector('.login-form').style.display = 'flex';
        document.querySelector('.user-info').style.display = 'none';
        document.getElementById('#current-username').textContent = '';
    }
}
