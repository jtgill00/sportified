/* Sportified — Homepage JS */
(function () {
  "use strict";

  /* ---- MOBILE NAV ---- */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => mobileMenu.classList.toggle("open"));
    mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));
  }

  /* ---- NAV SHADOW ON SCROLL ---- */
  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    if (nav) nav.style.boxShadow = scrollY > 20 ? "0 2px 20px rgba(0,0,0,0.08)" : "none";
  }, { passive: true });

  /* ---- FEATURE TABS ---- */
  document.querySelectorAll(".ftab").forEach((tab, i) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".ftab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".fpanel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.getElementById("fp-" + i);
      if (panel) panel.classList.add("active");
    });
  });

  /* ---- ADAPTABILITY TRIGGERS ---- */
  const scenarios = [
    {
      before: ["Large field scrimmage · 60×40m", "Cone weaving relay · 20 cones", "Outdoor crossing drill · full pitch"],
      after:  ["Gym dribbling course · markers", "3v3 futsal · gym floor", "Wall-pass relay · pairs"],
      time: "2.1s"
    },
    {
      before: ["Cone dribbling slalom · 15 cones", "Pinnies + ball relay · 8 balls", "Goal shooting drill · full posts"],
      after:  ["Body-weight footwork patterns", "Partner shadowing drill · no props", "Reaction & agility · hand signals"],
      time: "1.9s"
    },
    {
      before: ["Full-field 7v7 scrimmage", "Long-ball distribution drill", "Wide-play crossing runs"],
      after:  ["Compact 4v4 rondo · 20×20m", "Short passing combinations", "Tight-space control challenge"],
      time: "2.4s"
    },
    {
      before: ["8v8 full-team scrimmage", "Paired finishing drill", "4-cone pattern relay · 4 groups"],
      after:  ["5v5 adjusted scrimmage", "Individual skill stations", "3-cone relay · 3 groups · rotated"],
      time: "1.7s"
    }
  ];

  const beforeEl = document.getElementById("beforeItems");
  const afterEl  = document.getElementById("afterItems");
  const timeEl   = document.getElementById("baTime");
  const trigs    = document.querySelectorAll(".trig");

  function setScenario(i) {
    const s = scenarios[i];
    if (!beforeEl || !afterEl || !timeEl) return;
    afterEl.style.opacity = "0";
    afterEl.style.transform = "translateY(6px)";
    setTimeout(() => {
      beforeEl.innerHTML = s.before.map(d => `<div class="ba-item">${d}</div>`).join("");
      afterEl.innerHTML  = s.after.map(d => `<div class="ba-item new">${d}</div>`).join("");
      timeEl.textContent = `Rebuilt in ${s.time}`;
      afterEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      afterEl.style.opacity = "1";
      afterEl.style.transform = "translateY(0)";
    }, 160);
  }

  trigs.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      trigs.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      setScenario(i);
    });
  });

  let current = 0;
  setInterval(() => {
    if (document.querySelector(".trig:hover")) return;
    current = (current + 1) % scenarios.length;
    trigs.forEach(b => b.classList.remove("active"));
    trigs[current].classList.add("active");
    setScenario(current);
  }, 3500);

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll(
    ".step-card, .pc-card, .tc, .price-card, .kpi, .ftab"
  );
  const ro = new IntersectionObserver(entries => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.classList.add("visible");
          e.target.style.transitionDelay = "0s";
        }, 0);
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

  revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = Math.min(i * 0.045, 0.25) + "s";
    ro.observe(el);
  });

  /* ---- WEATHER ALERT on session card ---- */
  const weatherChip = document.querySelector(".sc-weather");
  if (weatherChip) {
    weatherChip.addEventListener("click", () => {
      document.getElementById("adaptability")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { trigs[0]?.click(); }, 500);
    });
  }

})();
