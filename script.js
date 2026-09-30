/* =========================================================
   CENTRO NOTICIAS HUILA
   PARALLAX + DESVANECIMIENTO AL HACER SCROLL
========================================================= */

const parallaxLayers = document.querySelectorAll(
    ".parallax-container img[data-speed]"
);

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

let ticking = false;

/* =========================================================
   FUNCIÓN PRINCIPAL
========================================================= */

function updateParallax() {

    // En páginas internas también existe el hero.
    if (!hero || !heroContent) {
        return;
    }

    const scrollPosition = window.scrollY;

    const heroHeight = hero.offsetHeight;

    let progress = scrollPosition / heroHeight;

    progress = Math.max(0, Math.min(progress, 1));

    /* =================================================
       MOVIMIENTO DE LAS IMÁGENES
    ================================================== */

    parallaxLayers.forEach((layer) => {

        const speed = parseFloat(layer.dataset.speed) || 0;

        const movement = scrollPosition * speed;

        layer.style.transform =
            `translate3d(0, -${movement}px, 0)`;

        /* =================================================
           DESVANECIMIENTO
        ================================================== */

        const fadeStart = 0.15;

        let opacity =
            1 -
            ((progress - fadeStart) / (1 - fadeStart));

        opacity = Math.max(0, Math.min(opacity, 1));

        layer.style.opacity = opacity;
    });

    /* =================================================
       DESVANECER EL TEXTO
    ================================================== */

    let contentOpacity = 1 - (progress * 2);

    contentOpacity =
        Math.max(0, Math.min(contentOpacity, 1));

    const contentMovement =
        scrollPosition * 0.35;

    heroContent.style.opacity =
        contentOpacity;

    heroContent.style.transform =
        `translate(-50%, calc(-50% - ${contentMovement}px))`;

    ticking = false;
}

/* =========================================================
   DETECTAR SCROLL
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateParallax
            );

            ticking = true;
        }

    },
    {
        passive: true
    }
);

/* =========================================================
   EJECUTAR AL CARGAR
========================================================= */

updateParallax();
