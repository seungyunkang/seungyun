document.getElementById('submit').addEventListener('click', () => {
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;

    if (!year || !month || !day) {
        alert('생년월일을 모두 입력해주세요.');
        return;
    }

    // Placeholder for general reading
    document.getElementById('general-reading').textContent = '전반적인 사주풀이 결과입니다. 당신의 삶은...';

    document.getElementById('detailed-reading').textContent = '';
});

document.querySelectorAll('.luck-option').forEach(button => {
    button.addEventListener('click', (event) => {
        const luckType = event.target.dataset.luck;
        let detailedReading = '';

        switch (luckType) {
            case 'health':
                detailedReading = '건강운에 대한 자세한 사주풀이 결과입니다.';
                break;
            case 'wealth':
                detailedReading = '재물운에 대한 자세한 사주풀이 결과입니다.';
                break;
            case 'marriage':
                detailedReading = '결혼운에 대한 자세한 사주풀이 결과입니다.';
                break;
            case 'children':
                detailedReading = '자식운에 대한 자세한 사주풀이 결과입니다.';
                break;
            case 'promotion':
                detailedReading = '승진운에 대한 자세한 사주풀이 결과입니다.';
                break;
            case 'business':
                detailedReading = '사업운에 대한 자세한 사주풀이 결과입니다.';
                break;
        }

        document.getElementById('detailed-reading').textContent = detailedReading;
    });
});
