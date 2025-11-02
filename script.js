function init() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}
init();

document.addEventListener("DOMContentLoaded", function () {
  const allProjectBtns = document.querySelectorAll(".view-projects-btn");

  allProjectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Get the parent .experience-item
      const experienceItem = btn.closest(".experience-item");

      // Get the project container within that item
      const projectsContainer = experienceItem.querySelector(
        ".projects-container"
      );

      // Toggle the 'active' class on the button
      btn.classList.toggle("active");

      // Toggle the 'show' class on the project container
      projectsContainer.classList.toggle("show");

      // Update button text
      if (btn.classList.contains("active")) {
        btn.firstChild.nodeValue = "Hide Associated Projects ";
      } else {
        btn.firstChild.nodeValue = "View Associated Projects ";
      }
    });
  });

  // --- NEW: Dark Mode Toggle ---
  const mainElement = document.getElementById("main");
  const toggleButtons = document.querySelectorAll(
    ".theme-toggle, .theme-toggle-mobile"
  );
  const toggleIcons = document.querySelectorAll(
    ".theme-toggle i, .theme-toggle-mobile i"
  );

  // Function to set the theme
  function setTheme(theme) {
    if (theme === "dark") {
      mainElement.classList.add("dark-mode");
      toggleIcons.forEach((icon) => {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      });
      localStorage.setItem("theme", "dark");
    } else {
      mainElement.classList.remove("dark-mode");
      toggleIcons.forEach((icon) => {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      });
      localStorage.setItem("theme", "light");
    }
  }

  // 1. Check for saved theme in localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    setTheme("dark");
  } else {
    setTheme("light"); // Default
  }

  // 2. Add click event listeners to all toggle buttons
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Check current theme state
      if (mainElement.classList.contains("dark-mode")) {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    });
  });
  // --- END: Dark Mode Toggle ---
});
