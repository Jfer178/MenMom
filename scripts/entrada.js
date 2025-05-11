document.addEventListener('DOMContentLoaded', function() {
    // Crear el elemento de audio
    const audio = new Audio('/music/Música de Fondo Instrumental Inspiradora - Música para Videos.mp3');
    audio.loop = true;
    audio.volume = 0.5;

    // Guardar el estado de la música en localStorage
    function guardarEstadoMusica() {
        localStorage.setItem('musicaReproduciendo', 'true');
    }

    // Iniciar la música cuando el usuario interactúe con la página
    document.addEventListener('click', () => {
        audio.play();
        guardarEstadoMusica();
    }, { once: true });

    // Hide loading screen after 2 seconds
    setTimeout(() => {
        document.querySelector('.loading').classList.add('fade-out');
    }, 2000);

    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 3000; // 3 seconds per slide
    let slideshowInterval;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');

        // Si hemos mostrado todas las diapositivas, mostrar la carta
        if (currentSlide === 0) {
            clearInterval(slideshowInterval); // Detener el slideshow
            setTimeout(() => {
                document.querySelector('.slideshow-container').classList.add('fade-out');
                setTimeout(() => {
                    document.querySelector('.slideshow-container').style.display = 'none';
                    document.querySelector('.carta-section').style.display = 'block';
                    document.querySelector('.carta-section').classList.add('fade-in');
                }, 1500);
            }, slideInterval);
        }
    }

    // Start the slideshow after loading screen
    setTimeout(() => {
        slideshowInterval = setInterval(nextSlide, slideInterval);
    }, 2000);
});