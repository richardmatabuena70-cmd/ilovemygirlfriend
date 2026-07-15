function openGift(event) {
    const container = document.getElementById('giftContainer');
    
    if (container.classList.contains('opened')) {
        return;
    }

    container.classList.add('opening');
    createSparkles(event);

    const audio = document.getElementById('bgMusic');
    if (audio) {
        audio.currentTime = 0;
        audio.play().then(() => {
            sessionStorage.setItem('musicPlaying', 'true');
        }).catch(e => console.log('Audio play failed:', e));
    }

    setTimeout(() => {
        container.classList.remove('opening');
        container.classList.add('opened');
        createConfetti();
        
        setTimeout(() => {
            window.location.href = 'jar.html';
        }, 1200);
    }, 1000);
}

function initMusic() {
    if (sessionStorage.getItem('musicPlaying') === 'true') {
        const audio = document.getElementById('bgMusic') || document.getElementById('bgMusic2');
        if (audio) {
            audio.currentTime = 0;
                    audio.play().catch(e => console.log('Auto-play prevented:', e));
        }
    }
}

window.addEventListener('load', initMusic);

function createSparkles(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
}

function createConfetti() {
    const colors = ['#f06292', '#e91e63', '#f48fb1', '#ff80ab', '#c2185b', '#ff4081', '#ffd1e0', '#fff5f8'];
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.width = (Math.random() * 12 + 5) + 'px';
            confetti.style.height = (Math.random() * 12 + 5) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 25);
    }
}
