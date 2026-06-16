/* ===== ROMANTIC PROPOSAL WEBSITE — SCRIPT.JS ===== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== GATE SCREEN =====
    const gateScreen = document.getElementById('gate-screen');
    const mainSite = document.getElementById('main-site');
    const gatePassword = document.getElementById('gate-password');
    const gateEnterBtn = document.getElementById('gate-enter-btn');
    const gateError = document.getElementById('gate-error');

    function openGate() {
        const pwd = gatePassword.value.trim().toLowerCase();
        if (pwd === 'love' || pwd === 'i love you' || pwd === 'iloveyou') {
            gateScreen.style.transition = 'opacity 1s ease, transform 1s ease';
            gateScreen.style.opacity = '0';
            gateScreen.style.transform = 'scale(1.1)';
            setTimeout(() => {
                gateScreen.classList.add('hidden');
                mainSite.classList.remove('hidden');
                mainSite.style.animation = 'fadeUp 1s ease';
                startTypewriter();
            }, 1000);
        } else {
            gateError.textContent = '💔 That\'s not our special word... try again!';
            gatePassword.style.animation = 'shake 0.5s ease';
            setTimeout(() => { gatePassword.style.animation = ''; }, 500);
        }
    }

    gateEnterBtn.addEventListener('click', openGate);
    gatePassword.addEventListener('keypress', (e) => { if (e.key === 'Enter') openGate(); });

    // ===== TYPEWRITER EFFECT =====
    const typewriterText = "You are the reason my heart beats, my love. Every moment with you is a gift I cherish forever...";
    let charIndex = 0;
    const typewriterEl = document.getElementById('typewriter-text');

    function startTypewriter() {
        if (!typewriterEl) return;
        function type() {
            if (charIndex < typewriterText.length) {
                typewriterEl.textContent += typewriterText.charAt(charIndex);
                charIndex++;
                setTimeout(type, 50);
            }
        }
        type();
    }

    // ===== FLOATING HEARTS CANVAS =====
    const canvas = document.getElementById('hearts-canvas');
    const ctx = canvas.getContext('2d');
    let hearts = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Heart {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 20;
            this.size = Math.random() * 12 + 6;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.03;
            this.color = ['#c9184a', '#ff6b8a', '#ff8fab', '#d4a853', '#e91e63'][Math.floor(Math.random() * 5)];
        }
        update() {
            this.y -= this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
            this.rotation += this.rotSpeed;
            if (this.y < -30) this.reset();
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            const s = this.size;
            ctx.moveTo(0, s * 0.3);
            ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
            ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < 25; i++) {
        const h = new Heart();
        h.y = Math.random() * canvas.height;
        hearts.push(h);
    }

    function animateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(h => { h.update(); h.draw(); });
        requestAnimationFrame(animateHearts);
    }
    animateHearts();

    // ===== ROSE PETAL RAIN =====
    const petalContainer = document.getElementById('petal-container');
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 6 + 6) + 's';
        petal.style.width = (Math.random() * 12 + 10) + 'px';
        petal.style.height = (Math.random() * 12 + 10) + 'px';
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        petalContainer.appendChild(petal);
        setTimeout(() => petal.remove(), 12000);
    }
    setInterval(createPetal, 800);


    // ===== MUSIC TOGGLE =====
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.querySelector('.music-text').textContent = 'Music';
        } else {
            bgMusic.volume = 0.3;
            if (bgMusic.currentTime < 15) {
                bgMusic.currentTime = 15;
            }
            bgMusic.play().catch(() => {});
            musicBtn.classList.add('playing');
            musicBtn.querySelector('.music-text').textContent = 'Playing';
        }
        isPlaying = !isPlaying;
    });

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // ===== NAV HAMBURGER =====
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // ===== SCROLL REVEAL =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.timeline-item, .reason-card, .gallery-item, .letter-paper').forEach(el => {
        observer.observe(el);
    });

    // ===== PROPOSAL BUTTONS =====
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const celebration = document.getElementById('celebration');
    const proposalBtns = document.querySelector('.proposal-buttons');

    yesBtn.addEventListener('click', () => {
        proposalBtns.classList.add('hidden');
        celebration.classList.remove('hidden');
        // Burst of hearts
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const h = new Heart();
                h.speedY = Math.random() * 3 + 2;
                h.size = Math.random() * 18 + 10;
                h.opacity = Math.random() * 0.6 + 0.3;
                hearts.push(h);
            }, i * 100);
        }
        // Burst of petals
        for (let i = 0; i < 40; i++) {
            setTimeout(createPetal, i * 80);
        }
    });

    // Make no button run away
    let noClickCount = 0;
    noBtn.addEventListener('mouseenter', () => {
        noClickCount++;
        if (noClickCount >= 2) {
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 100 - 50;
            noBtn.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
    noBtn.addEventListener('click', () => {
        noBtn.textContent = ['You sure? 🥺', 'Please say yes! 💕', 'Think again... ❤️', 'My heart will break 💔', 'One more chance? 🙏'][Math.min(noClickCount, 4)];
        noClickCount++;
    });

    // ===== CSS SHAKE ANIMATION (injected) =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-10px); }
            40% { transform: translateX(10px); }
            60% { transform: translateX(-10px); }
            80% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
});
