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

    const currentYear = 2026;
    if (currentYear - year >= 110 || year < 1916) {
        return `### ⚠️ 분석 결과 안내\n\n입력하신 생년월일(${year}년생)은 현재 연령 기준 100세가 훨씬 넘습니다. 이는 이미 사망하신 **고인(故人)**의 사주로 판단됩니다.\n고인의 평안을 기원하며, 현재 시점의 운세 풀이는 제공하지 않습니다.`;
    }

    const yStemIdx = (year - 4 + 10) % 10;
    const yBranchIdx = (year - 4 + 12) % 12;
    const dStemIdx = (year + month + day) % 10; 
    const dBranchIdx = (year + month + day) % 12;
    
    const myElement = elements[dStemIdx % 5];
    const yearPillar = `${stems[yStemIdx]}${branches[yBranchIdx]}`;
    const dayPillar = `${stems[dStemIdx]}${branches[dBranchIdx]}`;

    let report = `### 🤖 AI 사주 명식 및 2026년 심층 분석\n\n`;
    report += `입력하신 정보(**${year}년 ${month}월 ${day}일 ${hour}시**)를 바탕으로 정밀 분석한 결과, 귀하의 본원(일간)은 **'${myElement}'**의 기운을 담고 있습니다. 년주인 **${yearPillar}**의 기질과 일주 **${dayPillar}**의 조화는 평소 신중하면서도 결정적인 순간에 강한 폭발력을 내비치는 전형적인 외유내강형 사주입니다.\n\n`;
    
    report += `#### 🔮 2026년 병오년(丙午年) 종합 운세 흐름\n`;
    report += `2026년은 병오년으로, 하늘에는 태양(丙)이 뜨고 땅에는 말(午)이 달리는 형국입니다. 이는 화(火)의 기운이 극에 달하는 해로, 귀하의 사주에 잠들어 있던 에너지를 깨우는 '변곡점'이 될 것입니다. \n\n 올해의 핵심 키워드는 **[강렬한 시작], [성급함 경계], [결실의 전환]** 입니다. 특히 상반기에는 불길이 너무 거세어 주변 사람들과의 마찰이나 성급한 판단으로 인한 손실이 있을 수 있으니 자중이 필요합니다. 반면 하반기로 갈수록 이 뜨거운 열기가 금(金)의 기운을 녹여 보석을 만드는 격이라, 큰 성취와 보상이 기다리고 있습니다.\n\n`;

    report += `#### 📅 시기별 상세 조언 (상반기/하반기)\n`;
    if (month >= 3 && month <= 8) {
        report += `- **상반기 (1월~6월): "화마(火魔)를 다스리는 인내의 계절"**\n`;
        report += `  귀하의 생월 기운이 화(火)에 가깝다면, 올해 상반기에는 에너지가 과잉됩니다. 의욕이 너무 앞선 나머지 주변의 조언을 무시하거나, 무리하게 대출을 끼고 사업을 확장하는 행위는 매우 위험합니다. 5월에는 뜻밖의 구설수가 있을 수 있으니 언행을 각별히 조언합니다. 이 시기에는 운동보다는 독서와 명상으로 들뜬 기운을 가라앉히는 것이 개운(開運)의 핵심입니다.\n\n`;
        report += `- **하반기 (7월~12월): "고난 끝에 찾아오는 황금빛 결실"**\n`;
        report += `  뜨거운 여름이 지나고 찬 바람이 부는 9월경부터 기운이 완전히 반전됩니다. 상반기에 참아왔던 일들이 하나둘씩 해결의 실마리를 찾게 됩니다. 특히 11월에는 귀인이 나타나 귀하의 앞길을 열어줄 것이며, 이때 내리는 결정은 향후 3년의 대운을 결정지을 만큼 중요합니다. 연말에는 가족과 함께 서쪽 방향으로 여행을 떠나면 기운이 더욱 충만해집니다.\n\n`;
    } else {
        report += `- **상반기 (1월~6월): "얼어붙은 대지에 비추는 따스한 등불"**\n`;
        report += `  가을/겨울 생인 귀하에게 올해의 화(火) 기운은 차가운 사주를 녹여주는 최고의 길운입니다. 평소 계획만 하고 실행하지 못했던 일이 있다면 2월과 3월에 반드시 시작하십시오. 이 시기에 맺는 인연은 당신의 인생에 큰 전환점이 될 것이며, 경제적으로도 막혔던 자금이 돌기 시작하는 매우 고무적인 시기입니다.\n\n`;
        report += `- **하반기 (7월~12월): "수확한 곡간을 지키고 다음을 준비하라"**\n`;
        report += `  상반기의 강력한 기세가 하반기에도 이어지지만, 10월부터는 속도 조절이 필요합니다. 이미 충분한 성과를 거두었다면 욕심을 부려 더 큰 판을 벌이기보다는 현재의 성과를 문서화하고 공고히 다지는 데 집중하십시오. 연말에는 건강 검진을 통해 컨디션을 체크하는 것이 내년의 길운을 이어가는 비결입니다.\n\n`;
    }

    report += `#### 🍀 2026년 나만의 맞춤형 개운법\n`;
    if (day % 2 === 0) {
        report += `**[행운의 처방전]** 귀하에게 올해 가장 부족한 기운은 '냉철한 수(水)'의 기운입니다. \n- **색상:** 검정색, 짙은 남색 계열의 옷이나 액세서리를 착용하세요.\n- **장소:** 강가, 바다, 분수대 등 물이 있는 곳에서 휴식을 취하면 재물운이 상승합니다.\n- **숫자:** 1, 6을 비밀번호나 중요한 날짜에 활용하세요.\n- **방향:** 북쪽이 막힌 운을 뚫어주는 행운의 방위입니다.`;
    } else {
        report += `**[행운의 처방전]** 귀하에게 올해 가장 부족한 기운은 '성장하는 목(木)'의 기운입니다. \n- **색상:** 초록색, 연두색 등 자연의 색을 가까이 하세요.\n- **장소:** 숲길 산책, 등산, 정원 가꾸기 등이 정신 건강과 대인관계를 원활하게 해줍니다.\n- **숫자:** 3, 8을 행운의 숫자로 기억하세요.\n- **방향:** 동쪽 방향의 미팅이나 거래가 큰 이득을 가져다 줄 것입니다.`;
    }

    return report.replace(/\n/g, '<br>');
};

const getDetailedLuckAnalysis = (type, y, m, d) => {
    const sum = parseInt(y) + parseInt(m) + parseInt(d);
    const pattern = sum % 3;

    const luckData = {
        health: [
            "#### 🏥 2026년 건강운 정밀 분석<br>올해는 화(火)의 기운이 사주 전체를 압박하는 해입니다. 특히 심혈관계와 소화기 계통의 과부하가 예상됩니다.<br>1. **주의 질환:** 고혈압, 안구 건조증, 급성 위염입니다. 특히 6월과 7월의 폭염 시기에는 체온 조절 능력이 저하될 수 있으니 야외 활동을 삼가십시오.<br>2. **조언:** '불'의 기운을 식혀줄 수 있는 쓴맛보다는 짠맛과 신맛의 음식을 섭취하는 것이 좋습니다. 하루 2리터 이상의 수분 섭취는 선택이 아닌 필수입니다. 격렬한 유산소 운동보다는 수영이나 요가 같은 정적인 운동이 기혈 순환을 돕습니다.",
            "#### 🏥 2026년 건강운 정밀 분석<br>전반적인 활력은 넘치지만 내실이 부족해질 수 있는 해입니다. '번아웃 신드롬'을 가장 경계해야 합니다.<br>1. **주의 질환:** 신경성 두통, 불면증, 그리고 목과 어깨의 근육통입니다. 스트레스가 몸으로 직접 나타나는 해이므로 층분한 수면이 보약입니다.<br>2. **조언:** 침실의 조명을 가급적 어둡게 유지하고, 잠들기 전 족욕을 하면 막힌 기운이 아래로 내려가 안정을 찾습니다. 8월경에는 체력이 급격히 떨어질 수 있으니 보양식으로 미리 기력을 보충하시기 바랍니다.",
            "#### 🏥 2026년 건강운 정밀 분석<br>튼튼한 하체를 바탕으로 기운이 솟구치는 해입니다. 운동 능력이 향상되지만 부상의 위험도 함께 높아집니다.<br>1. **주의 질환:** 관절 부상, 인대 손상, 그리고 하체 부종입니다. 평소 안 하던 무리한 운동이나 갑작스러운 등산은 금물입니다.<br>2. **조언:** 등산이나 조깅 시 반드시 보호대를 착용하십시오. 녹색 채소를 많이 섭취하여 간의 해독 능력을 높이는 것이 피로 해소에 큰 도움이 됩니다. 하반기에는 호흡기 질환이 우려되니 공기 정화에 신경 쓰십시오."
        ],
        wealth: [
            "#### 💰 2026년 재물운 정밀 분석<br>올해는 '문서가 곧 돈이다'라고 할 만큼 문서운이 강력합니다. 직접적인 현금 투자보다는 가치가 상승할 수 있는 자산을 쥐는 것이 유리합니다.<br>1. **재테크 전략:** 부동산 청약, 상가 매입, 혹은 장기적인 적립식 펀드가 길합니다. 단기 주식 단타는 올해의 급한 화(火) 기운과 충돌하여 큰 손실을 볼 수 있으니 절대 금물입니다.<br>2. **시기별 흐름:** 3월과 4월에는 충동적인 지출을 억제해야 하며, 10월 이후에는 막혔던 자금이 풀려 목돈이 들어올 운세입니다. 빌려준 돈이 있다면 11월에 독촉하면 받을 수 있는 기운이 있습니다.",
            "#### 💰 2026년 재물운 정밀 분석<br>번 만큼 나가는 '재다신약'의 흐름이 보입니다. 돈이 들어오는 통로가 많아지지만 나가는 구멍도 커지는 해입니다.<br>1. **재테크 전략:** 올해는 공격적인 투자보다는 '지키는 투자'가 최선입니다. 가계부를 작성하여 새는 돈을 막고, 보험이나 연금 등 고정 지출을 재점검하십시오. 자기 계발을 위한 교육비 지출은 나중에 3배의 수익으로 돌아올 좋은 투자입니다.<br>2. **시기별 흐름:** 여름철 지출이 과다해질 수 있으니 미리 자금 계획을 세우십시오. 12월 연말에는 뜻밖의 상여금이나 성과급 등 횡재수가 살짝 들어와 있습니다.",
            "#### 💰 2026년 재물운 정밀 분석<br>귀인이 나타나 돈줄을 열어주는 '인복 재물운'이 강합니다. 혼자 고민하기보다 전문가나 주변의 성공한 사람의 조언을 따르면 큰 이득을 봅니다.<br>1. **재테크 전략:** 정보가 곧 돈입니다. 세미나나 모임에 참석하여 고급 정보를 얻으십시오. 공동 투자 제안이 들어온다면 상대방의 사주를 잘 살펴야 하며, 특히 '금(金)'의 기운이 많은 사람과 협력하면 큰 성과를 거둡니다.<br>2. **시기별 흐름:** 상반기에는 관망세가 유리하며, 9월 이후 적극적인 투자 포지션을 잡는 것이 수익률 극대화의 비결입니다. 로또나 복권 같은 사행성보다는 실력에 기반한 수익이 좋습니다."
        ],
        marriage: [
            "#### ❤️ 2026년 연애/결혼운 정밀 분석<br>미혼자에게는 불같은 사랑이 찾아오는 해입니다. 첫눈에 반할 수 있는 강력한 인연이 6월경에 들어와 있습니다.<br>1. **연애 조언:** 상대방의 화려한 겉모습보다는 가치관과 대화가 잘 통하는지 살피십시오. 올해는 성급한 결혼 결정보다는 충분한 연애 기간을 거치는 것이 백년해로의 비결입니다.<br>2. **기혼자 조언:** 배우자와의 사이가 뜨거워지기도 하지만 사소한 말다툼이 큰 불길로 번질 수 있습니다. 서로의 자존심을 건드리는 말은 절대 삼가고, 함께 요리를 하거나 정적인 취미를 공유하며 열기를 식히십시오.",
            "#### ❤️ 2026년 연애/결혼운 정밀 분석<br>오래된 연인이라면 결혼 이야기가 구체적으로 오가는 '결실'의 해입니다. 집안 어른들의 축복 속에 안정적인 결합이 이루어질 운세입니다.<br>1. **연애 조언:** 소개팅보다는 자연스러운 모임이나 직장 내에서의 만남이 더 길합니다. 본인의 매력이 상승하는 시기이므로 외모 가꾸기에 신경 쓰면 좋은 인연이 먼저 다가옵니다.<br>2. **기혼자 조언:** 자녀 계획이 있다면 올해가 아주 적기입니다. 부부 사이에 신뢰가 더욱 깊어지며 집안 분위기가 화목해집니다. 가끔은 연애 시절의 데이트 코스를 방문해 보십시오.",
            "#### ❤️ 2026년 연애/결혼운 정밀 분석<br>자유로운 영혼이 속박을 거부하는 기운이 강합니다. 솔로라면 만남은 잦으나 깊은 관계로 발전하기까지 시간이 다소 걸릴 수 있습니다.<br>1. **연애 조언:** 본인의 기준이 너무 높을 수 있습니다. 조금만 마음을 열면 가까운 곳에 진국인 사람이 있습니다. 8월 이후에는 여행지에서의 로맨스운도 있습니다.<br>2. **기혼자 조언:** 각자의 자유 시간을 존중해 주는 것이 부부 관계의 핵심입니다. 너무 사사건건 간섭하면 마찰이 생깁니다. 주말부부처럼 적당한 거리감을 유지할 때 오히려 애정이 돈독해지는 특이한 해입니다."
        ],
        children: [
            "#### 👶 2026년 자식운 정밀 분석<br>자녀가 독립적인 성향을 강하게 내비치는 해입니다. 부모의 통제에서 벗어나 본인만의 길을 가려 할 때 갈등이 생길 수 있습니다.<br>1. **교육 조언:** 자녀를 믿고 맡기십시오. 올해는 자녀 스스로 깨닫고 움직일 때 가장 큰 성과가 납니다. 예체능 분야에 소질을 보인다면 적극 지원해 주십시오.<br>2. **경사:** 자녀가 상장을 받거나 리더로 선출되는 등 대외적인 명예를 얻을 운이 있습니다. 칭찬을 아끼지 마십시오.",
            "#### 👶 2026년 자식운 정밀 분석<br>자녀와 친구 같은 관계를 유지하게 되는 따뜻한 해입니다. 사춘기 자녀가 있다면 대화의 문이 열리는 기적 같은 경험을 할 수 있습니다.<br>1. **교육 조언:** 학업 성취도가 꾸준히 상승하는 흐름입니다. 무리한 과외보다는 스스로 학습할 수 있는 환경을 만들어 주는 것이 좋습니다. 가족 여행을 자주 다니며 유대감을 쌓으십시오.<br>2. **경사:** 원하는 상급 학교에 진학하거나 좋은 성적으로 합격 통지서를 받는 기쁨이 연말에 기다리고 있습니다.",
            "#### 👶 2026년 자식운 정밀 분석<br>새로운 가족 구성원이 생길 수 있는 '태기(胎氣)'가 매우 강한 해입니다. 아이를 기다리던 부부라면 하늘이 주는 축복이 내릴 것입니다.<br>1. **교육 조언:** 자녀의 건강 관리에 유의해야 하는 해입니다. 면역력이 떨어질 수 있으니 영양제와 규칙적인 생활을 지도하십시오. 창의력 교육이 잘 먹히는 해입니다.<br>2. **경사:** 자녀가 재능을 발견하여 진로를 확정 짓는 중요한 시기입니다. 부모님은 든든한 후원자 역할만 해 주시면 충분합니다."
        ],
        promotion: [
            "#### 📈 2026년 승진/취업운 정밀 분석<br>조직 내에서 귀하의 위상이 급격히 올라가는 '명예운'의 해입니다. 하지만 높은 곳에 올라갈수록 바람이 거센 법임을 잊지 마십시오.<br>1. **직장 전략:** 팀워크가 핵심입니다. 본인의 성과를 독식하기보다 동료들과 나누는 미덕을 보일 때 승진 결정권자의 눈에 확고히 듭니다. 하반기 11월에 인사 고과에서 최고의 점수를 받을 운세입니다.<br>2. **주의:** 시기 질투하는 경쟁자가 나타날 수 있습니다. 실력으로 압도하되 겸손을 잃지 않는다면 무난히 승진의 기쁨을 누릴 수 있습니다.",
            "#### 📈 2026년 승진/취업운 정밀 분석<br>현재 자리에서 수평 이동하거나 더 좋은 조건으로 이직하는 '이동수'가 강력합니다. 정체되어 있던 커리어에 활력이 도는 해입니다.<br>1. **직장 전략:** 헤드헌터나 지인의 제안이 오면 적극적으로 검토하십시오. 본인의 가치를 높게 평가해 주는 곳으로 옮기는 것이 향후 5년의 경제적 부를 결정합니다. 3월과 4월에 좋은 오퍼가 올 확률이 높습니다.<br>2. **주의:** 사직서를 내기 전 확실한 계약서를 먼저 쥐십시오. 감정적인 퇴사는 하반기에 후회를 남길 수 있습니다.",
            "#### 📈 2026년 승진/취업운 정밀 분석<br>자격증 취득이나 전문 지식 습득을 통해 본인의 몸값을 올리는 '학업 승진운'입니다. 현장에서 발로 뛰기보다 기획이나 관리직으로 전환되는 기운입니다.<br>1. **직장 전략:** 상반기에는 교육이나 연수에 힘쓰고 하반기에 실적을 내십시오. 상사와의 관계가 매우 좋아져서 든든한 뒷배를 얻게 될 것입니다. 숫자가 들어간 보고서를 완벽히 준비하면 승진은 떼어 놓은 당상입니다.<br>2. **주의:** 과도한 업무로 인해 하반기에 건강이 나빠질 수 있으니 페이스 조절이 필수입니다. '일 잘하는 사람'으로 소문나서 여기저기 불려 다니게 될 것입니다."
        ],
        business: [
            "#### 🚀 2026년 사업운 정밀 분석<br>창업이나 신규 프로젝트 런칭에 있어 '불같은 추진력'이 필요한 해입니다. 트렌드를 선점하는 감각이 매우 좋아지는 시기입니다.<br>1. **사업 전략:** 남들이 가지 않는 틈새 시장을 공략하십시오. 온라인 마케팅에 투자를 아끼지 마시고, 붉은색을 로고나 인테리어에 포인트로 활용하면 손님이 끊이지 않습니다.<br>2. **시기별 조언:** 상반기에는 마케팅에 집중하고, 하반기 9월부터는 수익 실현에 집중하십시오. 동업은 이득보다 손해가 클 수 있으니 가급적 단독 결정권을 쥐는 구조가 유리합니다.",
            "#### 🚀 2026년 사업운 정밀 분석<br>기존 사업의 내실을 다지고 '프리미엄 이미지'를 구축하는 데 성공하는 해입니다. 단골 고객이 당신을 먹여 살리는 기운입니다.<br>1. **사업 전략:** 고객 데이터베이스를 체계적으로 관리하십시오. 1:1 맞춤형 서비스나 VIP 멤버십 도입이 큰 매출 증대로 이어집니다. 무리한 확장보다는 현재 매장이나 서비스의 질을 극대화하는 것이 하반기에 큰 권리금을 얻는 비결입니다.<br>2. **시기별 조언:** 7월 여름 비수기를 잘 넘기면 10월부터 연말까지 역대급 매출을 기록할 수 있는 흐름입니다.",
            "#### 🚀 2026년 사업운 정밀 분석<br>해외 진출이나 타 지역으로의 확장이 길한 '역마 사업운'입니다. 앉아서 기다리기보다 직접 발로 뛰며 영업망을 넓혀야 성공합니다.<br>1. **사업 전략:** 새로운 유통 채널을 뚫거나 판로를 개척하십시오. 박람회나 전시회 참여가 예상치 못한 큰 계약으로 이어집니다. 젊은 층을 타겟팅한 감각적인 제품이 시장에서 좋은 반응을 얻을 것입니다.<br>2. **시기별 조언:** 상반기에는 출장이 잦아질 수 있으며 체력 관리가 곧 사업 수단입니다. 하반기에는 안정적인 파트너십이 체결되어 걱정 없이 운영할 수 있는 토대가 마련됩니다."
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
        
        const readingResult = generateDetailedFortune(year, month, day, hour);
        generalReading.innerHTML = readingResult;
        
        const luckGrid = document.querySelector('.luck-grid');
        if (readingResult.includes('고인(故人)')) {
            if(luckGrid) luckGrid.style.display = 'none';
            detailedBox.innerHTML = '';
        } else {
            if(luckGrid) luckGrid.style.display = 'grid';
            detailedBox.innerHTML = '<div style="text-align:center; color:#6c5ce7; font-weight:bold; margin-top:20px; font-size:1.1rem; animation: bounce 2s infinite;">👆 위 버튼을 눌러 부문별 역대급 상세 분석을 확인하세요!</div>';
        }
        
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    });
}

document.querySelectorAll('.luck-option').forEach(button => {
    button.addEventListener('click', (event) => {
        const luckType = event.target.dataset.luck;
        const year = document.getElementById('year').value;
        const month = document.getElementById('month').value;
        const day = document.getElementById('day').value;
        
        const detailContent = getDetailedLuckAnalysis(luckType, year, month, day);

        const detailedBox = document.getElementById('detailed-reading');
        detailedBox.innerHTML = `
            <div class="detailed-card" style="animation: slideInUp 0.6s ease; background: #ffffff; padding: 25px; border-top: 5px solid #6c5ce7; border-radius: 12px; box-shadow: 0 15px 35px rgba(108, 92, 231, 0.15); margin-top: 20px;">
                <div style="color:#2d3436; line-height:1.8; font-size:1.05rem;">${detailContent}</div>
                <div style="font-size:0.8rem; color:#a29bfe; margin-top:20px; border-top:1px dashed #eee; padding-top:15px; text-align:right; font-style:italic;">
                    * AI Fortune-Telling System based on Imperial Astrology
                </div>
            </div>
        `;
        detailedBox.scrollIntoView({ behavior: 'smooth' });
    });
});
