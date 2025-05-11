// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Función para inicializar los eventos de la carta
    function inicializarCarta() {
        const envoltura = document.querySelector(".envoltura-sobre");
        const carta = document.querySelector(".carta");
        const sobre = document.querySelector(".sobre");
        const corazon = document.querySelector(".corazon");

        if (!envoltura || !carta || !sobre || !corazon) return;

        let isAnimating = false;

        function abrirCarta() {
            if (isAnimating) return;
            isAnimating = true;

            envoltura.classList.add("abierto");
            envoltura.classList.add("desactivar-sobre");

            if (!carta.classList.contains("abierta")) {
                setTimeout(() => {
                    carta.classList.add("mostrar-carta");
                    setTimeout(() => {
                        carta.classList.remove("mostrar-carta");
                        carta.classList.add("abierta");
                        isAnimating = false;
                    }, 500);
                }, 1000);
            } else {
                isAnimating = false;
            }
        }

        function cerrarCarta() {
            if (isAnimating) return;
            isAnimating = true;

            envoltura.classList.remove("abierto");
            envoltura.classList.remove("desactivar-sobre");

            if (carta.classList.contains("abierta")) {
                carta.classList.add("cerrando-carta");
                setTimeout(() => {
                    carta.classList.remove("cerrando-carta");
                    carta.classList.remove("abierta");
                    isAnimating = false;
                }, 500);
            } else {
                isAnimating = false;
            }
        }

        // Eventos para abrir la carta
        [sobre, corazon].forEach(element => {
            element.addEventListener("click", (e) => {
                e.stopPropagation();
                abrirCarta();
            });
        });

        // Eventos para cerrar la carta
        document.addEventListener("click", (e) => {
            if (envoltura.classList.contains("abierto") && 
                !e.target.closest(".carta") && 
                !e.target.closest(".sobre") && 
                !e.target.closest(".corazon")) {
                cerrarCarta();
            }
        });

        // Prevenir que los clics en la carta cierren el sobre
        carta.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }

    // Observar cuando la sección de la carta se hace visible
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('carta-section') && 
                mutation.target.style.display === 'block') {
                setTimeout(inicializarCarta, 100); // Pequeño delay para asegurar que las animaciones estén listas
                observer.disconnect();
            }
        });
    });

    // Configurar el observador
    const cartaSection = document.querySelector('.carta-section');
    if (cartaSection) {
        observer.observe(cartaSection, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }
});

const envoltura = document.querySelector(".envoltura-sobre");
const carta = document.querySelector(".carta");

document.addEventListener("click", (e) => {
    if (e.target.matches(".sobre") || 
        e.target.matches(".solapa-derecha") ||
        e.target.matches(".solapa-izquierda") ||
        e.target.matches(".corazon")) {
        envoltura.classList.toggle("abierto");
        envoltura.classList.add("desactivar-sobre")

        if (!carta.classList.contains("abierta")) {
            setTimeout(() => {
                carta.classList.add("mostrar-carta");

                setTimeout(() => {
                    carta.classList.remove("mostrar-carta");
                    carta.classList.add("abierta");
                }, 500);
            }, 1000);
        }
    } else if (e.target.matches(".envoltura-sobre *")) {
        envoltura.classList.remove("abierto");
        envoltura.classList.remove("desactivar-sobre")
        if (carta.classList.contains("abierta")) {
            carta.classList.add("cerrando-carta");

            setTimeout(() => {
                carta.classList.remove("cerrando-carta");
                carta.classList.remove("abierta")
            }, 500);
        }
    }
})