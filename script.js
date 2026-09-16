document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
  });


  // Close the mobile menu after clicking a navigation link
  document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

    });

  });


  // ==========================================
  // NAVBAR ACTIVE SECTION
  // ==========================================

  const navLinks = [
    ...document.querySelectorAll(".nav-links a")
  ];

  const sections = [
    document.querySelector("#programs"),
    document.querySelector("#admissions"),
    document.querySelector("#cost"),
    document.querySelector("#student-life"),
    document.querySelector("#contact")
  ];


  // Watches which section is currently visible
  // and highlights its navbar link.

  const observer = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;


        // Remove active class from all links

        navLinks.forEach(link => {

          link.classList.remove("active");

        });


        const id = entry.target.id;


        // Find the navbar link that matches
        // the section currently on screen.

        const matching = navLinks.find(link => {

          const target = link
            .getAttribute("href")
            .replace("#", "");

          return (
            target === id ||
            (id === "admissions" && target === "admissions")
          );

        });


        if (matching) {

          matching.classList.add("active");

        }

      });

    },

    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }

  );


  // Start observing every section

  sections
    .filter(Boolean)
    .forEach(section => {

      observer.observe(section);

    });



  // ==========================================
  // PROGRAM + STUDENT LIFE CARDS
  // ==========================================

  // Makes the cards keyboard accessible.
  // Hover effects themselves are controlled
  // in CSS.

  document
    .querySelectorAll(".spotlight-card, .life-card")
    .forEach(card => {

      card.setAttribute("tabindex", "0");

    });



  // ==========================================
  // PLAN YOUR NEXT CHAPTER TABS
  // ==========================================

  const tabs = document.querySelectorAll(".tab");

  const panels = document.querySelectorAll(".tab-panel");


  tabs.forEach(tab => {

    tab.addEventListener("click", () => {


      // Remove active state from every tab

      tabs.forEach(t => {

        t.classList.remove("active");

        t.setAttribute(
          "aria-selected",
          "false"
        );

      });


      // Hide every content panel

      panels.forEach(panel => {

        panel.hidden = true;

        panel.classList.remove("active");

      });


      // Activate the clicked tab

      tab.classList.add("active");

      tab.setAttribute(
        "aria-selected",
        "true"
      );


      // Find the corresponding panel

      const panel = document.getElementById(
        tab.dataset.tab
      );


      // Show that panel

      if (panel) {

        panel.hidden = false;

        panel.classList.add("active");

      }

    });

  });



  // ==========================================
  // MAILING LIST FORM
  // ==========================================

  const form = document.querySelector(
    "#mailing-form"
  );

  const message = document.querySelector(
    ".form-message"
  );


  form.addEventListener("submit", event => {

    // Prevent the page from refreshing

    event.preventDefault();


    const email = document
      .querySelector("#email")
      .value
      .trim();


    // Make sure the user entered something

    if (!email) {

      message.textContent =
        "Please enter an email address.";

      return;

    }


    // Demo confirmation

    message.textContent =
      "Thanks! You're on the mailing list.";


    // Clear the input

    form.reset();

  });

});