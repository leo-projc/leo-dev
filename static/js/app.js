if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("static/js/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

/* ========================================
   PAGE INTERACTIONS
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* ========================================
     ACTIVE NAVIGATION LINK
     ======================================== */

  const navLinks = document.querySelectorAll(".nav-link");
  const currentUrl = window.location.pathname;

  navLinks.forEach((link) => {
    const linkUrl = link.getAttribute("href");

    if (linkUrl === currentUrl) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  /* ========================================
     PAGE TITLE TYPEWRITER
     ======================================== */

  const titles = document.querySelectorAll(".site-title");

  titles.forEach(function (el) {
    const text = el.textContent;

    el.textContent = "";
    el.classList.add("typewriter-cursor");

    let i = 0;

    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 80);
      } else {
        el.classList.remove("typewriter-cursor");
      }
    }

    type();
  });

  /* ========================================
     SCROLL INDICATOR
     ======================================== */

  const indicator = document.getElementById("scrollIndicator");

  if (indicator) {
    /*
      The indicator starts hidden in CSS.

      It is only made visible after JavaScript has
      confirmed that the browser is actually at the
      top of the page.

      This prevents the indicator from flashing when
      refreshing a page while scrolled further down.
    */

    const updateScrollIndicator = () => {
      const scrollPosition = Math.max(
        window.scrollY || 0,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0,
      );

      const atTop = scrollPosition <= 2;

      indicator.classList.toggle("is-visible", atTop);
    };

    /*
      Wait until the browser has restored its scroll
      position before deciding whether the indicator
      should be visible.
    */

    const updateAfterScrollRestore = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updateScrollIndicator();
        });
      });
    };

    window.addEventListener("load", updateAfterScrollRestore);
    window.addEventListener("pageshow", updateAfterScrollRestore);

    /*
      Update whenever the user scrolls.

      Because CSS hides the indicator by default,
      there is no visible state before this check.
    */

    window.addEventListener("scroll", updateScrollIndicator, {
      passive: true,
    });

    /*
      Clicking the indicator hides it immediately
      and smoothly moves to the first content section.
    */

    indicator.addEventListener("click", function () {
      indicator.classList.remove("is-visible");

      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    });
  }
});
