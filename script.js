
const paparazzi = document.getElementById("paparazzi");
const flashOverlay = document.getElementById("flashOverlay");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (paparazzi && flashOverlay && !reducedMotion) {
    let position = -180;
    let direction = 1;

    const speed = 1.2;

    function walk() {
        const maxPosition = window.innerWidth - 150;

        position += speed * direction;

        if (position >= maxPosition) {
            position = maxPosition;
            direction = -1;
        }

        if (position <= 0) {
            position = 0;
            direction = 1;
        }

        paparazzi.style.transform =
            `translateX(${position}px)`;

        // Vira o personagem conforme a direção
        const monster = paparazzi.querySelector(".monster");
        monster.style.transform =
            direction === 1 ? "scaleX(1)" : "scaleX(-1)";

        paparazzi.classList.add("walking");

        requestAnimationFrame(walk);
    }

    function takePhoto() {
        // Acende o flash da câmera
        paparazzi.classList.add("is-shooting");
        flashOverlay.classList.remove("flash-active");

        // Reinicia a animação do clarão
        void flashOverlay.offsetWidth;
        flashOverlay.classList.add("flash-active");

        setTimeout(() => {
            paparazzi.classList.remove("is-shooting");
            flashOverlay.classList.remove("flash-active");
        }, 350);
    }

    walk();

    // Tira uma foto a cada intervalo aleatório
    function schedulePhoto() {
        const delay = 2500 + Math.random() * 3500;

        setTimeout(() => {
            takePhoto();
            schedulePhoto();
        }, delay);
    }

    schedulePhoto();
}

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.getElementById("primary-navigation");

if (menuToggle && primaryNavigation) {
    function setMenuOpen(isOpen) {
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        primaryNavigation.classList.toggle("is-open", isOpen);
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        setMenuOpen(!isOpen);
    });

    primaryNavigation.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
        if (event.matches) {
            setMenuOpen(false);
        }
    });
}