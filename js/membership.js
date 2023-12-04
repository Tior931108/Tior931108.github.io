const id = document.querySelector("#id");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password-confirm");
const form = document.querySelector("#signupFrm");
const email1 = document.querySelector("#email1");
const email2 = document.querySelector("#email2");
const address = document.querySelector("#address");
const addressDetail = document.querySelector("#addressDetail");

/**
 * input + p.msg.msg-required 의 구조가 동일하므로
 * 반복문을 통해 동일한 핸들러를 각각 바인딩한다.
*/
[id, password, passwordConfirmation].forEach((input) => {
    input.addEventListener('blur', (e) => {
        // e.target.nextElementSibling -> p.msg.msg-required
    if(e.target.value)
        e.target.nextElementSibling.style.display = 'none';
    else 
        e.target.nextElementSibling.style.display = 'block';
    });
});

let idAlertShown = false; // 추가된 변수
/**
 * 아이디 유효성 검사
 */
id.addEventListener('blur', (e) => {
    const regexps = [/^[a-z\d]{4,12}$/, /[0-9]/];
    const value = e.target.value;
    const isValidId = regexps.every(regex => regex.test(value));

    if(value && !isValidId) {
        alert('아이디는 영소문자로 시작하고 숫자를 포함하는 4~12자리여야 합니다.');
        idAlertShown = false;
        return;
    }

    if(value && isValidId) {
        alert('사용가능한 아이디입니다.');
        idAlertShown = true;
    }

    return idAlertShown;
});

/**
 * 비밀번호 안내문구 노출
 */
password.addEventListener('focus', (e) => {
    // 필수항목 안내메세지는 우선 숨김처리한다.
    e.target.nextElementSibling.style.display = 'none';
    document.querySelector(".msg.msg-password").style.display = 'block';
});

/**
 * 비밀번호 안내문구 숨김
 */
password.addEventListener('blur', (e) => {
    document.querySelector(".msg.msg-password").style.display = 'none';
});

let passwordAlertShown = false; // 추가된 변수
/**
 * 비밀번호 유효성 검사
 */
password.addEventListener('blur', (e) => {
    const regexps = [/^.{8,16}$/, /[a-z]/i, /[0-9]/, /[!@#$%&*()]/];
    const value = e.target.value;
    const isValidPassword = regexps.every(regex => regex.test(value));


    if(value && !isValidPassword) {
        alert('비밀번호는 영문자, 숫자, 특수문자(!@#$%^&*())를 하나이상 포함하며 8~16자리 이어야합니다.');
        passwordAlertShown = false;
        return;
    }

    if(value && isValidPassword) {
        alert('유효한 비밀번호입니다.');
        passwordAlertShown = true;
    }

    return passwordAlertShown;
});

/**
 * 비밀번호 확인 일치 여부 확인
 */
passwordConfirmation.addEventListener('blur', (e) => {
    const originalPassword = password.value;
    const confirmPassword = e.target.value;
    const messageElement = e.target.nextElementSibling;
    // 비밀번호 확인이 빈칸인 경우
    if (!confirmPassword) {
        messageElement.textContent = '필수입력항목입니다.';
        messageElement.style.color = 'red';
        messageElement.style.display = 'block';
    } else if (confirmPassword && confirmPassword !== originalPassword) {
    // 비밀번호 확인이 비어있지 않고, 비밀번호와 일치하지 않을 경우 안내메세지 표시
        messageElement.textContent = '비밀번호가 일치하지 않습니다.';
        messageElement.style.color = 'red';
        messageElement.style.display = 'block';
    } else {
        messageElement.textContent = '비밀번호가 일치합니다.';
        messageElement.style.color = 'green';
        messageElement.style.display = 'block';
    }
})

document.querySelector('.logo a').addEventListener('click', () => {
    window.location.href = 'index.html';
});
document.querySelector('.header_nav-item a').addEventListener('click', () => {
    window.location.href = 'index.html';
});

 function Signup() {
     // 회원가입 submit 
        console.log('Signup function called');
    
        const idValue = id.value;
        const passwordValue = password.value;
        const passwordConfirmationValue = passwordConfirmation.value;
        const email1Value = email1.value;
        const email2Value = email2.value;
        const addressValue = address.value;
        const addressDetailValue = addressDetail.value;
    
        if(!idValue || !passwordValue || !passwordConfirmationValue) {
            alert('아이디/비밀번호는 필수 항목입니다.');
            return;
        }
    
        if(!email1Value || !email2Value || !addressValue ||!addressDetailValue) {
            alert('이메일/주소 입력을 원하지 않을경우 (.)을 입력해주세요.');
            return;
        }
    
        if(idAlertShown === false || passwordAlertShown === false) {
            alert('아이디나 비밀번호가 사용가능한지 확인해주세요.');
            return;
        }
    
        if(passwordValue !== passwordConfirmationValue) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다. 다시 입력해주세요.');
            return;
        }
    
        console.log('Before window.location.href');
        // 아이디 유효성 검사와 비밀번호 유효성 모두 통과한 경우에만 회원 가입 성공
        if(idAlertShown === true && passwordAlertShown === true) {
            const user = {
                id: idValue,
                password: passwordValue,
                email: `${email1Value}@${email2Value}`,
                address: `${addressValue} ${addressDetailValue}`
            };
            saveUserData(user);
        }
        alert('회원가입 성공!');
        
        return window.location.href = 'index.html';
 }



function saveUserData(user) {

    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
}