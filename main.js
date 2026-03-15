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
    if (user) {
        if (authForms) authForms.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'block';
        if (fortuneSection) fortuneSection.style.display = 'block';
        userStatus.textContent = `반갑습니다, ${user.email}님!`;
    } else {
        if (authForms) authForms.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'none';
        if (fortuneSection) fortuneSection.style.display = 'none';
        userStatus.textContent = '로그인이 필요합니다.';
        const resultContainer = document.getElementById('result-container');
        if (resultContainer) resultContainer.style.display = 'none';
    }
};

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
            alert('회원가입 성공! 자동으로 로그인됩니다.');
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

// --- Advanced AI-like Fortune-Telling Engine ---
const stems = ["갑(甲)", "을(乙)", "병(丙)", "정(丁)", "무(戊)", "기(己)", "경(庚)", "신(辛)", "임(壬)", "계(癸)"];
const branches = ["자(子:쥐)", "축(丑:소)", "인(寅:호랑이)", "묘(卯:토끼)", "진(辰:용)", "사(巳:뱀)", "오(午:말)", "미(未:양)", "신(申:원숭이)", "유(酉:닭)", "술(戌:개)", "해(亥:돼지)"];
const elements = ["목(木:나무)", "화(火:불)", "토(土:흙)", "금(金:쇠)", "수(水:물)"];

const generateDetailedFortune = (y, m, d, h) => {
    const year = parseInt(y);
    const month = parseInt(m);
    const day = parseInt(d);
    const hour = parseInt(h) || 0;

    // 1. 고인(사망자) 판별 로직 (현재 2026년 기준 110세 이상)
    const currentYear = 2026;
    if (currentYear - year >= 110 || year < 1916) {
        return `### ⚠️ 분석 결과 안내\n\n입력하신 생년월일(${year}년생)은 현재 연령 기준 100세가 훨씬 넘습니다. 이는 이미 사망하신 **고인(故人)**의 사주로 판단됩니다.\n고인의 평안을 기원하며, 현재 시점의 운세 풀이는 제공하지 않습니다.`;
    }

    // 2. 동적 사주 명식(사주팔자) 계산 (실제 만세력을 간소화한 AI 유사 계산)
    const yStemIdx = (year - 4 + 10) % 10;
    const yBranchIdx = (year - 4 + 12) % 12;
    const mStemIdx = (yStemIdx * 2 + month) % 10;
    const mBranchIdx = (month + 1) % 12;
    const dStemIdx = (year + month + day) % 10; 
    const dBranchIdx = (year + month + day) % 12;
    
    const myElement = elements[dStemIdx % 5];
    const yearPillar = `${stems[yStemIdx]}${branches[yBranchIdx]}`;
    const dayPillar = `${stems[dStemIdx]}${branches[dBranchIdx]}`;

    // 3. 제미나이 AI 스타일의 심층 답변 생성
    let report = `### 🤖 AI 사주 명식 분석 결과\n\n`;
    report += `귀하의 사주는 **${year}년 ${month}월 ${day}일 ${hour}시** 생으로, 본질적인 기운은 **'${myElement}'**를 타고나셨습니다. (년주: ${yearPillar} / 일주: ${dayPillar})\n\n`;
    
    report += `#### 🔮 2026년 병오년(丙午年) 총운\n`;
    report += `2026년은 병오년으로 붉은 말의 해입니다. 하늘과 땅에 모두 불(火)의 기운이 매우 강하게 들어오는 시기입니다. 귀하의 기운('${myElement}')과 만났을 때, 올해는 **'폭발적인 확장과 그에 따른 피로도'**가 동시에 나타나는 격동의 한 해가 될 것입니다.\n\n`;

    report += `#### 📅 상반기 / 하반기 디테일\n`;
    if (month >= 3 && month <= 8) {
        // 봄/여름 생
        report += `- **상반기 (1월~6월): "과열을 주의하고 템포를 늦춰라"**\n`;
        report += `  이미 열기가 많은 사주 구성에 올해의 화(火) 기운이 더해집니다. 상반기에는 추진하던 일에서 마찰이 생기거나 감정적인 충돌이 일어날 수 있습니다. 4월과 5월에는 이직이나 창업 등 큰 결정을 미루고, 현상 유지에 집중하는 것이 유리합니다.\n`;
        report += `- **하반기 (7월~12월): "비 온 뒤 땅이 굳듯 안정을 찾는 시기"**\n`;
        report += `  찬 바람이 부는 9월(가을)부터 막혔던 운이 극적으로 풀립니다. 상반기에 준비해둔 자격증이나 인맥이 하반기에 결정적인 역할을 하여, 연말에는 큰 보상을 받게 될 것입니다.\n\n`;
    } else {
        // 가을/겨울 생
        report += `- **상반기 (1월~6월): "얼어붙은 땅에 내리는 따뜻한 햇살"**\n`;
        report += `  귀하에게 부족했던 불의 기운이 들어오며 상반기부터 강한 추진력이 생깁니다. 평소 망설이던 일이 있다면 2월과 3월에 과감히 시작하세요. 이직, 투자, 새로운 만남 모두 상반기에 승부수를 띄우는 것이 좋습니다.\n`;
        report += `- **하반기 (7월~12월): "확장보다는 수확에 집중할 때"**\n`;
        report += `  상반기에 벌려놓은 일들을 정리하고 수익을 실현하는 시기입니다. 10월 이후에는 새로운 일을 시작하기보다 가족이나 건강을 챙기며 한 해를 차분히 마무리하는 것이 좋습니다.\n\n`;
    }

    report += `#### 💡 맞춤형 개운법 (행운의 팁)\n`;
    if (day % 2 === 0) {
        report += `귀하에게 올해 가장 필요한 기운은 '물(水)'입니다. 검은색 계열의 옷, 바다나 호수 근처로의 여행이 재물운을 크게 끌어올려 줍니다. 숫자는 1과 6을 가까이 하세요.`;
    } else {
        report += `귀하에게 올해 가장 필요한 기운은 '나무(木)'입니다. 푸른색 계열의 옷, 등산이나 식물 가꾸기가 건강과 심리적 안정에 큰 도움을 줍니다. 숫자는 3과 8을 가까이 하세요.`;
    }

    return report.replace(/\n/g, '<br>');
};

const getDynamicLuckDetail = (type, y, m, d) => {
    const sum = parseInt(y) + parseInt(m) + parseInt(d);
    const pattern = sum % 3; // 0, 1, 2 에 따라 다른 결과 출력

    const luckData = {
        health: [
            "올해는 위장과 소화기 계통이 예민해지는 해입니다. 규칙적인 식사와 소식하는 습관이 중요합니다. 특히 5-6월에 과로하지 마세요.",
            "목(木)과 화(火)의 충돌로 인해 불면증이나 두통이 올 수 있습니다. 자기 전 스마트폰을 멀리하고 따뜻한 차를 마시는 것이 좋습니다.",
            "전반적인 체력은 매우 좋은 해입니다. 다만 근골격계(관절)를 다칠 수 있으니 무리한 운동이나 등산 시 발목을 주의하세요."
        ],
        wealth: [
            "문서운이 강한 해입니다. 직접적인 주식 투자보다는 부동산 계약이나 청약, 저작권 등 문서를 쥐는 형태의 재테크가 큰 돈을 만듭니다.",
            "지출이 많아지는 해입니다. 하지만 이는 '투자성 지출'이므로 너무 아까워하지 마세요. 자기 계발이나 장비 업그레이드에 돈을 쓰면 하반기에 2배로 돌아옵니다.",
            "뜻밖의 횡재수가 있습니다! 특히 8월과 11월에 보너스를 받거나 잊고 있던 돈을 찾을 수 있습니다. 현금 유동성을 확보해 두는 것이 좋습니다."
        ],
        marriage: [
            "올해는 썸이나 가벼운 만남보다는 묵직하고 진지한 인연이 들어옵니다. 기혼자의 경우 배우자와의 공동 목표(내집마련 등)가 생기며 관계가 단단해집니다.",
            "연애 세포가 깨어나는 시기입니다! 동호회나 모임 등 사람이 많은 곳에 나가면 이상형을 만날 확률이 높습니다. 먼저 다가가는 용기가 필요합니다.",
            "감정 기복이 심해져 연인/배우자와 사소한 다툼이 잦을 수 있습니다. 올해는 '내가 져준다'는 마음가짐이 관계를 지키는 핵심입니다."
        ],
        children: [
            "자녀의 독립성이 강해지는 시기입니다. 품 안의 자식으로 생각하기보다 하나의 인격체로 존중하고 믿어줄 때 서로의 운기가 상승합니다.",
            "올해는 자녀로 인해 웃을 일이 많습니다! 학업이나 진로에서 자녀가 원하던 성과를 거두어 집안에 경사가 생길 흐름입니다.",
            "임신을 계획 중이라면 올해 하반기가 몹시 좋은 적기입니다. 이미 자녀가 있다면 대화 시간을 하루 10분이라도 꼭 확보하세요."
        ],
        promotion: [
            "이직이나 승진에 있어 '귀인'의 도움이 필수적인 해입니다. 혼자 끙끙대지 말고 상사나 선배에게 적극적으로 조언을 구하면 길이 열립니다.",
            "올해 상반기에는 남들이 꺼려하는 궂은 일을 맡게 될 수 있으나, 그것이 곧 당신의 능력을 증명하는 무대가 되어 연말 승진으로 이어집니다.",
            "이직운이 매우 강하게 들어왔습니다. 현재 직장에 불만이 있다면 과감하게 새로운 도전을 시도해보세요. 서쪽 방향의 회사가 좋습니다."
        ],
        business: [
            "확장보다는 내실입니다! 무리하게 매장을 늘리거나 신사업을 벌이기보다 현재의 충성 고객을 꽉 잡는 VIP 마케팅에 집중하세요.",
            "온라인/디지털 전환을 시도하기 완벽한 해입니다. SNS 마케팅이나 새로운 플랫폼에 예산을 투자하면 예상치 못한 대박이 터질 수 있습니다.",
            "동업 제안이 들어온다면 철저히 서류화하고 의심해야 합니다. 올해는 남을 믿기보다 본인의 직감과 판단대로 단독으로 진행하는 것이 훨씬 안전합니다."
        ]
    };

    return luckData[type][pattern];
};

// Fortune-telling logic execution
const submitBtn = document.getElementById('submit');
if (submitBtn) {
    submitBtn.addEventListener('click', () => {
        const year = document.getElementById('year').value;
        const month = document.getElementById('month').value;
        const day = document.getElementById('day').value;
        const hour = document.getElementById('hour').value;

        if (!year || !month || !day) {
            alert('정확한 분석을 위해 생년월일을 모두 입력해주세요.');
            return;
        }

        const resultContainer = document.getElementById('result-container');
        const generalReading = document.getElementById('general-reading');
        const detailedBox = document.getElementById('detailed-reading');
        
        resultContainer.style.display = 'block';
        
        // 메인 사주 풀이 (제미나이/고인 판별 로직 포함)
        const readingResult = generateDetailedFortune(year, month, day, hour);
        generalReading.innerHTML = readingResult;
        
        // 고인인 경우 상세 버튼 영역을 가림
        const luckGrid = document.querySelector('.luck-grid');
        if (readingResult.includes('고인(故人)')) {
            if(luckGrid) luckGrid.style.display = 'none';
            detailedBox.innerHTML = '';
        } else {
            if(luckGrid) luckGrid.style.display = 'grid';
            detailedBox.innerHTML = '<div style="text-align:center; color:#6c5ce7; font-weight:bold; margin-top:20px;">👆 위 버튼을 눌러 부문별 디테일한 운세를 확인하세요.</div>';
        }
        
        // 스크롤 이동
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    });
}

document.querySelectorAll('.luck-option').forEach(button => {
    button.addEventListener('click', (event) => {
        const luckType = event.target.dataset.luck;
        const year = document.getElementById('year').value;
        const month = document.getElementById('month').value;
        const day = document.getElementById('day').value;
        
        const titleMap = {
            health: "💪 건강운 상세 분석",
            wealth: "💰 재물운 상세 분석",
            marriage: "❤️ 연애/결혼운 상세 분석",
            children: "👶 자식운 상세 분석",
            promotion: "📈 승진/취업운 상세 분석",
            business: "🚀 사업운 상세 분석"
        };

        const detailContent = getDynamicLuckDetail(luckType, year, month, day);

        const detailedBox = document.getElementById('detailed-reading');
        detailedBox.innerHTML = `
            <div class="detailed-card" style="animation: fadeIn 0.5s ease; background: white; padding: 15px; border-left: 4px solid #6c5ce7; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <h4 style="color:#6c5ce7; margin-top:0; margin-bottom:10px;">${titleMap[luckType]}</h4>
                <p style="color:#2d3436; line-height:1.6; margin-bottom: 0;">${detailContent}</p>
            </div>
        `;
    });
});
