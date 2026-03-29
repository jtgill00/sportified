/* Sportified — Homepage JS */
(function () {
  "use strict";

  /* ---- THEME TOGGLE ---- */
  const root = document.documentElement;
  const toggleBtn = document.querySelector("[data-theme-toggle]");
  let theme = root.getAttribute("data-theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  root.setAttribute("data-theme", theme);
  if (toggleBtn) updateToggleIcon();

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", theme);
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!toggleBtn) return;
    toggleBtn.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
    toggleBtn.innerHTML = theme === "dark"
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  /* ---- NAV MOBILE ---- */
  const hamburger = document.getElementById("navHamburger");
  const navMobile = document.getElementById("navMobile");
  if (hamburger && navMobile) {
    hamburger.addEventListener("click", () => {
      navMobile.classList.toggle("open");
    });
    navMobile.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navMobile.classList.remove("open"));
    });
  }

  /* ---- NAV SCROLL SHADOW ---- */
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    if (nav) {
      nav.style.boxShadow = window.scrollY > 20
        ? "0 4px 24px rgba(0,0,0,0.15)"
        : "none";
    }
  }, { passive: true });

  /* ---- FEATURE TABS ---- */
  const featureTabs = document.querySelectorAll(".feature-tab");
  const featurePanels = document.querySelectorAll(".feature-panel");

  featureTabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      featureTabs.forEach(t => t.classList.remove("active"));
      featurePanels.forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.getElementById("panel-" + i);
      if (panel) panel.classList.add("active");
    });
  });

  /* ---- ADAPTABILITY TRIGGERS ---- */
  const triggerData = [
    {
      label: "Rain / Weather",
      before: [
        "Large field scrimmage · 60×40m",
        "Cone weaving relay · 20 cones",
        "Outdoor crossing drill · full pitch"
      ],
      after: [
        "Gym dribbling course · markers",
        "3v3 futsal · gym floor",
        "Wall-pass relay · pairs · no cones"
      ],
      time: "2.1s"
    },
    {
      label: "No Equipment",
      before: [
        "Cone dribbling slalom · 15 cones",
        "Pinnies + ball relay · 8 balls",
        "Goal shooting drill · full posts"
      ],
      after: [
        "Body-weight footwork patterns",
        "Partner shadowing drill · no props",
        "Reaction & agility · hand signals"
      ],
      time: "1.9s"
    },
    {
      label: "Smaller Space",
      before: [
        "Full-field 7v7 scrimmage",
        "Long-ball distribution drill",
        "Wide-play crossing runs"
      ],
      after: [
        "Compact 4v4 rondo · 20×20m",
        "Short passing combinations",
        "Tight-space control challenge"
      ],
      time: "2.4s"
    },
    {
      label: "Group Size Change",
      before: [
        "8v8 full-team scrimmage",
        "Paired finishing drill",
        "4-cone pattern relay · 4 groups"
      ],
      after: [
        "5v5 adjusted scrimmage",
        "Individual skill stations",
        "3-cone relay · 3 groups · rotated"
      ],
      time: "1.7s"
    }
  ];

  const triggerBtns = document.querySelectorAll(".trigger-btn");
  const beforeDrills = document.getElementById("beforeDrills");
  const afterDrills = document.getElementById("afterDrills");
  const rebuildBadge = document.getElementById("rebuildBadge");

  function setTrigger(index) {
    const data = triggerData[index];
    if (!beforeDrills || !afterDrills || !rebuildBadge) return;

    // Flash effect on after-card
    afterDrills.style.opacity = "0";
    afterDrills.style.transform = "translateY(6px)";

    setTimeout(() => {
      beforeDrills.innerHTML = data.before
        .map(d => `<div class="ba-drill">${d}</div>`)
        .join("");
      afterDrills.innerHTML = data.after
        .map(d => `<div class="ba-drill new-drill">${d}</div>`)
        .join("");
      rebuildBadge.innerHTML = `Rebuilt in <strong>${data.time}</strong>`;

      afterDrills.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      afterDrills.style.opacity = "1";
      afterDrills.style.transform = "translateY(0)";
    }, 180);
  }

  triggerBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      triggerBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      setTrigger(i);
    });
  });

  // Auto-cycle triggers
  let currentTrigger = 0;
  setInterval(() => {
    currentTrigger = (currentTrigger + 1) % triggerData.length;
    if (!document.querySelector(".trigger-btn:hover")) {
      triggerBtns.forEach(b => b.classList.remove("active"));
      triggerBtns[currentTrigger].classList.add("active");
      setTrigger(currentTrigger);
    }
  }, 3500);

  /* ---- SCROLL REVEAL ---- */
  const revealElements = document.querySelectorAll(
    ".kpi-card, .callout-card, .testi-card, .price-card, .feature-tab, .trigger-btn"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = `opacity 0.45s ease ${Math.min(i * 0.05, 0.3)}s, transform 0.45s ease ${Math.min(i * 0.05, 0.3)}s`;
    observer.observe(el);
  });

  /* ---- WEATHER ALERT INTERACTION ---- */
  const weatherAlert = document.getElementById("weatherAlert");
  if (weatherAlert) {
    weatherAlert.addEventListener("click", () => {
      // Flash the after card briefly
      triggerBtns[0] && triggerBtns[0].click();
      // Scroll to adaptability section
      document.getElementById("adaptability")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---- DEMO STATUS CYCLE ---- */
  const demoStatus = document.querySelector(".demo-status");
  if (demoStatus) {
    const states = ["AI generating…", "Adapting drills…", "Plan ready ✓", "AI generating…"];
    let si = 0;
    setInterval(() => {
      si = (si + 1) % states.length;
      const textNode = demoStatus.lastChild;
      if (textNode) textNode.textContent = " " + states[si];
    }, 2800);
  }

  /* ---- EMAIL CTA ---- */
  const emailInput = document.querySelector(".email-input");
  const ctaBtn = document.querySelector(".btn-cta");
  if (emailInput && ctaBtn) {
    ctaBtn.addEventListener("click", () => {
      const val = emailInput.value.trim();
      if (val && val.includes("@")) {
        ctaBtn.textContent = "You're on the list ✓";
        ctaBtn.style.background = "var(--color-accent)";
        emailInput.value = "";
        emailInput.placeholder = "Thanks! We'll be in touch.";
      }
    });
  }

})();
