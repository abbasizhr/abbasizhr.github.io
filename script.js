(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal, .reveal-child").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  const hero = document.querySelector(".hero.reveal");
  if (hero) {
    requestAnimationFrame(() => hero.classList.add("is-visible"));
  }

  const scrollTargets = document.querySelectorAll(".reveal:not(.hero), .reveal-child");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  scrollTargets.forEach((el) => observer.observe(el));
})();
