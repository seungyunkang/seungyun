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

// --- Advanced Fortune-Telling Engine ---

const generateDetailedFortune = (year, month, day, hour) => {
    const zodiacs = ["원숭이", "닭", "개", "돼지", "쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양"];
    const myZodiac = zodiacs[year % 12];
    
    // 2026 is Byeong-oh (Year of the Red Horse)
    const currentYear = 2026;
    
    let report = `### 2026년 병오년(丙午年) 종합 운세 리포트\n\n`;
    report += `귀하께서는 **${year}년생 ${myZodiac}띠**의 기운을 타고나셨습니다. 2026년은 강한 화(火)의 기운이 지배하는 해로, 귀하의 사주 구성과 맞물려 역동적인 변화가 예상됩니다.\n\n`;
    
    report += `#### 📅 시기별 흐름 안내\n`;
    report += `- **상반기 (1월~6월): "인내와 내실의 시기"**\n`;
    report += `  의욕은 앞서지만 주변 환경이 따라주지 않을 수 있습니다. 새로운 사업 확장이나 무리한 투자는 잠시 멈추고, 현재 가진 것을 지키는 '수성(守城)'의 자세가 필요합니다. 예를 들어, 이직 제안이 오더라도 5월까지는 조건을 꼼꼼히 따지며 보수적으로 접근하는 것이 좋습니다.\n\n`;
    report += `- **하반기 (7월~12월): "도약과 수확의 시기"**\n`;
    report += `  막혔던 기운이 풀리는 시점입니다. 특히 9월 이후에는 귀인의 도움으로 큰 성과를 거둘 수 있습니다. 상반기에 참아왔던 에너지를 이때 쏟아부으세요. 추진하던 프로젝트가 결실을 맺거나, 뜻밖의 승진 기회가 찾아올 것입니다.\n\n`;
    
    report += `#### 💡 구체적인 행동 지침\n`;
    report += `1. **대인관계:** 붉은색 옷이나 소품이 행운을 불러옵니다. 중요한 미팅이 있다면 남쪽 방향에서 만남을 가지세요.\n`;
    report += `2. **재테크:** 3월과 4월에는 충동구매를 조심하시고, 10월 이후에 안정적인 자산으로 눈을 돌리는 것이 현명합니다.\n`;
    
    return report.replace(/\n/g, '<br>');
};

const getLuckDetail = (type, year) => {
    const luckData = {
        health: {
            title: "💪 건강운 상세 분석",
            content: "2026년은 화(火)의 기운이 과해지기 쉬워 심혈관 질환이나 안과 질환에 유의해야 합니다. 특히 여름철(6-8월)에는 체력 소모가 극심할 수 있으니 무리한 운동보다는 명상과 요가를 추천합니다. 물(水)의 기운이 부족하니 수분 섭취를 늘리세요."
        },
        wealth: {
            title: "💰 재물운 상세 분석",
            content: "전반적으로 흐름은 좋으나 '번 만큼 나가는' 해입니다. 2026년 초반에는 목돈이 나갈 일이 생길 수 있으니 비상금을 확보해두세요. 하지만 8월 이후에는 횡재수가 있어 투자 수익이나 보너스를 기대해볼 만합니다. 부동산보다는 현금 유동성을 확보하는 것이 유리합니다."
        },
        marriage: {
            title: "❤️ 연애/결혼운 상세 분석",
            content: "미혼자라면 2026년 가을에 평생의 배필을 만날 수 있는 강한 인연법이 들어옵니다. 기혼자는 사소한 말다툼이 커질 수 있는 해이니 대화 시 상대방의 입장을 먼저 생각하는 배려가 필요합니다. 여행을 가신다면 서쪽 방향이 관계 회복에 도움이 됩니다."
        },
        children: {
            title: "👶 자식운 상세 분석",
            content: "자녀에게 경사가 생기는 해입니다. 학업 성취도가 높아지거나 원하는 곳에 합격하는 기쁨이 있겠습니다. 부모로서 지나친 간섭보다는 묵묵한 신뢰를 보여줄 때 자녀의 기운이 더욱 살아납니다. 자녀와 함께하는 시간을 늘려보세요."
        },
        promotion: {
            title: "📈 승진/취업운 상세 분석",
            content: "직장 내에서 능력을 인정받지만, 그만큼 책임감도 무거워지는 시기입니다. 상반기에는 경쟁자가 나타나 스트레스를 받을 수 있으나, 묵묵히 실력을 쌓으면 11월경에 확실한 보상이 따릅니다. 문서운이 좋으니 자격증 취득이나 학위 도전에도 아주 좋은 해입니다."
        },
        business: {
            title: "🚀 사업운 상세 분석",
            content: "창업을 고민 중이라면 동업보다는 독자적인 운영이 유리합니다. 2026년은 트렌드가 빠르게 변하는 해이므로 온라인 마케팅이나 디지털 전환에 힘을 쏟으세요. 상반기에는 자금 흐름을 보수적으로 운영하고, 하반기에 마케팅 예산을 집중 투입하는 전략이 유효합니다."
        }
    };
    return luckData[type];
};

// Fortune-telling logic execution
document.getElementById('submit').addEventListener('click', () => {
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
    
    resultContainer.style.display = 'block';
    generalReading.innerHTML = generateDetailedFortune(year, month, day, hour);
    
    const detailedBox = document.getElementById('detailed-reading');
    detailedBox.innerHTML = '<div style="text-align:center; color:#6c5ce7; font-weight:bold; margin-top:20px;">항목별 버튼을 눌러 더 깊이 있는 조언을 확인하세요.</div>';
    
    // Scroll to results
    resultContainer.scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.luck-option').forEach(button => {
    button.addEventListener('click', (event) => {
        const luckType = event.target.dataset.luck;
        const year = document.getElementById('year').value;
        const detail = getLuckDetail(luckType, year);

        const detailedBox = document.getElementById('detailed-reading');
        detailedBox.innerHTML = `
            <div class="detailed-card" style="animation: fadeIn 0.5s ease;">
                <h4 style="color:#6c5ce7; margin-bottom:10px;">${detail.title}</h4>
                <p style="color:#2d3436; line-height:1.8;">${detail.content}</p>
                <div style="font-size:0.85rem; color:#636e72; margin-top:10px; border-top:1px solid #eee; padding-top:10px;">
                    ※ 이 결과는 통계적 사주 분석을 바탕으로 하며, 귀하의 선택에 따라 미래는 변화할 수 있습니다.
                </div>
            </div>
        `;
    });
});
