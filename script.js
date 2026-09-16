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

/* Click-to-enlarge for the featured-project figures. */
(function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeButton = document.getElementById("lightbox-close");
  const triggers = document.querySelectorAll(".figure-zoom");

  if (!lightbox || !lightboxImg || !triggers.length) return;

  let lastFocused = null;

  function open(trigger) {
    const img = trigger.querySelector("img");
    if (!img) return;

    lastFocused = trigger;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;

    // The caption's <strong> is the figure's short title; use it as the label.
    const title = trigger.parentElement.querySelector("figcaption strong");
    lightboxCaption.textContent = title ? title.textContent.trim() : "";

    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    // Drop the source so a large image is not kept decoded while hidden.
    lightboxImg.src = "";
    if (lastFocused) lastFocused.focus();
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => open(trigger));
  });

  closeButton.addEventListener("click", close);

  // Clicking the backdrop closes; clicking the image itself does not.
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) close();
  });
})();
