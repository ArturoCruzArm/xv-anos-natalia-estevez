// Particles.js Configuration
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#87ceeb', '#b0d9f0', '#b0e0e6', '#d4e9f7', '#ffffff']
            },
            shape: {
                type: ['circle', 'triangle'],
                stroke: {
                    width: 0,
                    color: '#ffffff'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: false
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'top',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'bubble'
                },
                onclick: {
                    enable: true,
                    mode: 'repulse'
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 150,
                    size: 6,
                    duration: 2,
                    opacity: 0.8
                },
                repulse: {
                    distance: 100,
                    duration: 0.4
                }
            }
        },
        retina_detect: true
    });
}

// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('2025-12-06T14:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<p class="event-started">¡El evento ha comenzado!</p>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Music Player Functionality
const audio = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
let musicStarted = false;
let isPlaying = false;

// Preload audio on page load
audio.load();

// Function to start music
function startMusic() {
    if (!musicStarted || !isPlaying) {
        // Reset audio to beginning if it hasn't been played yet
        if (!musicStarted) {
            audio.currentTime = 0;
        }

        audio.play().then(() => {
            musicStarted = true;
            isPlaying = true;
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        }).catch(error => {
            console.log('Play prevented:', error);
            // Keep play icon visible if failed
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        });
    }
}

// Function to handle first user interaction
function handleFirstInteraction(e) {
    // Don't auto-play on first click, just prepare the audio
    // User needs to click the music button explicitly
    if (!musicStarted) {
        audio.load();
        // Remove listeners after first interaction
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('touchend', handleFirstInteraction);
    }
}

// Add listeners for first user interaction (Android compatibility)
document.addEventListener('click', handleFirstInteraction, { passive: true });
document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
document.addEventListener('touchend', handleFirstInteraction, { passive: true });

// Toggle music play/pause with button
musicToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlaying) {
        audio.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        isPlaying = false;
    } else {
        startMusic();
    }
});

// Also handle touch events specifically for the button (Android)
musicToggle.addEventListener('touchend', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlaying) {
        audio.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        isPlaying = false;
    } else {
        startMusic();
    }
});

// Smooth scroll for the scroll indicator
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Letter-by-letter animation for main title
function animateTextByLetter(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.display = 'inline-block';

    // Split text into letters and wrap each in a span
    text.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.className = 'letter-animate';
        span.style.animationDelay = `${index * 0.1}s`;
        if (letter === ' ') {
            span.style.marginRight = '0.3em';
        }
        element.appendChild(span);
    });
}

// Apply animation to main title and subtitle
document.addEventListener('DOMContentLoaded', () => {
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');

    if (mainTitle) {
        animateTextByLetter(mainTitle);
    }

    if (subtitle) {
        animateTextByLetter(subtitle);
    }
});
