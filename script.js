document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.getElementById('openInvitation');
    const coverScreen = document.getElementById('coverScreen');
    const invitation = document.getElementById('invitation');

    // Parse URL parameter for guest name (e.g. ?to=Budi+Santoso)
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameParam = urlParams.get('to');
    
    if (guestNameParam) {
        const guestNameElement = document.querySelector('.guest-name');
        if (guestNameElement) {
            // Basic sanitization
            const cleanName = guestNameParam.replace(/[<>]/g, '');
            guestNameElement.textContent = cleanName;
        }
    }

    // Prevent scrolling when cover screen is active
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    // Music Player Setup
    const bgMusic = document.getElementById('bgMusic');
    const musicControl = document.getElementById('musicControl');
    let isPlaying = false;

    function toggleMusic() {
        if (isPlaying) {
            bgMusic.pause();
            musicControl.classList.add('paused');
        } else {
            bgMusic.play().catch(e => console.log('Autoplay prevented', e));
            musicControl.classList.remove('paused');
        }
        isPlaying = !isPlaying;
    }

    musicControl.addEventListener('click', toggleMusic);

    btnOpen.addEventListener('click', () => {
        // Hide cover screen
        coverScreen.classList.add('hidden');
        
        // Show main invitation with a slight delay
        setTimeout(() => {
            invitation.classList.add('visible');
            // Allow scrolling again
            document.body.style.overflow = 'auto';
            
            // Show music control and play music
            musicControl.style.display = 'flex';
            toggleMusic(); // Start playing
        }, 800); // Wait for cover screen transition
    });

    // Countdown Timer Setup
    // Set the wedding date (Year, Month index [0-11], Day, Hour, Minute)
    // Example: July 5, 2026 at 08:00 AM
    const weddingDate = new Date(2026, 6, 5, 8, 0, 0).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            // Event has passed or is happening
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('minutes').innerText = "00";
            document.getElementById('seconds').innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }

    // Update countdown every 1 second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach((el) => {
        observer.observe(el);
    });
});
