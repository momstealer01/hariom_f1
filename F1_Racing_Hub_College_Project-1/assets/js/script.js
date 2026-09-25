/* =========================
   MOBILE NAVIGATION
========================= */

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        nav.classList.toggle("open");

        const isOpen = nav.classList.contains("open");

        toggle.setAttribute("aria-expanded", isOpen);
    });
}

/* Close mobile menu after clicking a link */

document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
        if (nav) {
            nav.classList.remove("open");
        }

        if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
        }
    });
});

/* =========================
   SCROLL REVEAL + COUNTERS
========================= */

const revealElements = document.querySelectorAll(
    ".reveal, .counter"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                /* Reveal animation */

                entry.target.classList.add("show");

                /* Counter animation */

                if (
                    entry.target.classList.contains("counter")
                ) {

                    const target = Number(
                        entry.target.dataset.target
                    );

                    if (!Number.isNaN(target)) {

                        let number = 0;

                        const step = Math.max(
                            1,
                            Math.ceil(target / 55)
                        );

                        const timer = setInterval(() => {

                            number += step;

                            if (number >= target) {
                                number = target;

                                clearInterval(timer);
                            }

                            entry.target.textContent = number;

                        }, 25);
                    }
                }

                observer.unobserve(entry.target);
            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });

} else {

    /* Fallback for older browsers */

    revealElements.forEach((element) => {
        element.classList.add("show");
    });
}

/* =========================
   ACTIVE NAV LINK
========================= */

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("nav a").forEach((link) => {

    const linkPage =
        link.getAttribute("href")?.split("/").pop();

    if (linkPage === currentPage) {
        link.classList.add("active");
    }

});