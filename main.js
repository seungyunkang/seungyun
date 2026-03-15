// Firebase Auth setup
const auth = firebase.auth();

// UI Elements
const userStatus = document.getElementById('user-status');
const authSection = document.getElementById('auth-section');
const authForms = document.getElementById('auth-forms');
const fortuneSection = document.getElementById('fortune-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const logoutButton = document.getElementById('logout-button');

// Tab Elements
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');

// Tab Switching Logic
tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});

tabRegister.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
});

// Helper to toggle visibility based on auth state
const updateUI = (user) => {
    if (user) {
        authForms.style.display = 'none';
        logoutButton.style.display = 'block';
        fortuneSection.style.display = 'block';
        userStatus.textContent = `반갑습니다, ${user.email}님!`;
    } else {
        authForms.style.display = 'block';
        logoutButton.style.display = 'none';
        fortuneSection.style.display = 'none';
        userStatus.textContent = '로그인이 필요합니다.';
        document.getElementById('result-container').style.display = 'none';
    }
};

// Listen for auth state changes
auth.onAuthStateChanged(user => {
    updateUI(user);
});

// Registration logic
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert('회원가입 성공!');
            registerForm.reset();
        })
        .catch((error) => {
            alert(`회원가입 실패: ${error.message}`);
        });
});

// Login logic
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert('로그인 성공!');
            loginForm.reset();
        })
        .catch((error) => {
            alert(`로그인 실패: ${error.message}`);
        });
});

// Logout logic
logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        alert('로그아웃 되었습니다.');
    });
});

// Fortune-telling logic
document.getElementById('submit').addEventListener('click', () => {
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;

    if (!year || !month || !day) {
        alert('생년월일을 모두 입력해주세요.');
        return;
    }

    const resultContainer = document.getElementById('result-container');
    const generalReading = document.getElementById('general-reading');
    
    resultContainer.style.display = 'block';
    generalReading.textContent = `${year}년 ${month}월 ${day}일생의 타고난 사주는 맑고 강인한 기운을 가지고 있습니다. 올해는 특히 새로운 시작과 성장이 기대되는 해입니다.`;
    document.getElementById('detailed-reading').textContent = '아래 버튼을 눌러 더 자세한 운세를 확인해보세요.';
});

document.querySelectorAll('.luck-option').forEach(button => {
    button.addEventListener('click', (event) => {
        const luckType = event.target.dataset.luck;
        let detailedReading = '';

        const readings = {
            health: '꾸준한 운동과 규칙적인 식습관이 행운을 불러옵니다. 특히 스트레스 관리에 유의하세요.',
            wealth: '재물운이 상승 곡선을 그리고 있습니다. 뜻밖의 이익이 생길 수 있으나 지출 관리도 중요합니다.',
            marriage: '주변 사람들과의 관계가 깊어지는 시기입니다. 진실된 마음으로 다가가면 좋은 연이 닿을 것입니다.',
            children: '자녀 혹은 아랫사람과의 소통이 원활해지며 기쁜 소식이 들려올 운세입니다.',
            promotion: '직장에서의 노력이 결실을 맺는 시기입니다. 책임감 있는 모습이 승진의 열쇠가 됩니다.',
            business: '사업적인 확장을 고려하기 좋은 시기입니다. 신뢰할 수 있는 파트너와 협력하면 큰 성과가 있을 것입니다.'
        };

        detailedReading = readings[luckType] || '운세를 분석 중입니다...';
        document.getElementById('detailed-reading').textContent = detailedReading;
    });
});
