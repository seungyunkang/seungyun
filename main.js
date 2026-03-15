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
if (tabLogin && tabRegister) {
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
}

// Helper to toggle visibility based on auth state
const updateUI = (user) => {
    console.log("Auth state changed:", user ? user.email : "Logged out");
    if (user) {
        // 로그인 성공 시: 가입/로그인 폼 숨기고 로그아웃 버튼과 사주 섹션 표시
        if (authForms) authForms.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'block';
        if (fortuneSection) fortuneSection.style.display = 'block';
        userStatus.textContent = `반갑습니다, ${user.email}님!`;
    } else {
        // 로그아웃 시: 가입/로그인 폼 표시하고 사주 섹션 숨김
        if (authForms) authForms.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'none';
        if (fortuneSection) fortuneSection.style.display = 'none';
        userStatus.textContent = '로그인이 필요합니다.';
        const resultContainer = document.getElementById('result-container');
        if (resultContainer) resultContainer.style.display = 'none';
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

    console.log("Attempting to register:", email);

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Registration successful");
            alert('회원가입이 완료되었습니다! 자동으로 로그인됩니다.');
            registerForm.reset();
            // Firebase는 가입 성공 시 자동으로 로그인 상태가 됩니다. 
            // onAuthStateChanged가 호출되면서 UI가 업데이트됩니다.
        })
        .catch((error) => {
            console.error("Registration error:", error.code, error.message);
            let message = '회원가입 실패: ';
            if (error.code === 'auth/email-already-in-use') {
                message += '이미 사용 중인 이메일입니다.';
            } else if (error.code === 'auth/invalid-email') {
                message += '유효하지 않은 이메일 형식입니다.';
            } else if (error.code === 'auth/weak-password') {
                message += '비밀번호가 너무 취약합니다 (6자 이상 필요).';
            } else {
                message += error.message;
            }
            alert(message);
        });
});

// Login logic
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    console.log("Attempting to login:", email);

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Login successful");
            alert('로그인 성공!');
            loginForm.reset();
        })
        .catch((error) => {
            console.error("Login error:", error.code, error.message);
            let message = '로그인 실패: ';
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                message += '이메일 또는 비밀번호가 틀렸습니다.';
            } else {
                message += error.message;
            }
            alert(message);
        });
});

// Logout logic
logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        alert('로그아웃 되었습니다.');
    });
});

// Fortune-telling logic
const submitBtn = document.getElementById('submit');
if (submitBtn) {
    submitBtn.addEventListener('click', () => {
        const year = document.getElementById('year').value;
        const month = document.getElementById('month').value;
        const day = document.getElementById('day').value;

        if (!year || !month || !day) {
            alert('생년월일을 모두 입력해주세요.');
            return;
        }

        const resultContainer = document.getElementById('result-container');
        const generalReading = document.getElementById('general-reading');
        
        if (resultContainer && generalReading) {
            resultContainer.style.display = 'block';
            generalReading.textContent = `${year}년 ${month}월 ${day}일생의 타고난 사주는 맑고 강인한 기운을 가지고 있습니다. 올해는 특히 새로운 시작과 성장이 기대되는 해입니다.`;
            const detailedReading = document.getElementById('detailed-reading');
            if (detailedReading) detailedReading.textContent = '아래 버튼을 눌러 더 자세한 운세를 확인해보세요.';
        }
    });
}

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
        const detailedBox = document.getElementById('detailed-reading');
        if (detailedBox) detailedBox.textContent = detailedReading;
    });
});
