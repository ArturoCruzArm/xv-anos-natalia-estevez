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
                value: ['#c4a7e7', '#ffc8dd', '#b8d4f1', '#ffd5bf', '#c8e4d3']
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

// Function to start music on first user interaction
function startMusicOnFirstClick() {
    if (!musicStarted) {
        audio.play().then(() => {
            musicStarted = true;
            isPlaying = true;
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        }).catch(error => {
            console.log('Autoplay prevented:', error);
        });

        // Remove listeners after first play
        document.removeEventListener('click', startMusicOnFirstClick);
        document.removeEventListener('touchstart', startMusicOnFirstClick);
        document.removeEventListener('scroll', startMusicOnFirstClick);
    }
}

// Add listeners for first user interaction
document.addEventListener('click', startMusicOnFirstClick);
document.addEventListener('touchstart', startMusicOnFirstClick);
document.addEventListener('scroll', startMusicOnFirstClick);

// Toggle music play/pause with button
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();

    if (isPlaying) {
        audio.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        isPlaying = false;
    } else {
        audio.play().then(() => {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            isPlaying = true;
            musicStarted = true;
        }).catch(error => {
            console.log('Play prevented:', error);
        });
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
