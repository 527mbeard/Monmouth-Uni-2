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
      card.setAttribute("role", "button");

      const openCard = () => {
        const title = card.querySelector("h3").textContent.replace(/\s+/g, " ").trim();
        const image = card.querySelector("img");
        const description = document.querySelector("#modal-description");
        const detailParts = card.dataset.detail.split(" BREAK ");

        document.querySelector("#modal-category").textContent = card.dataset.category;
        document.querySelector("#modal-title").textContent = title;
        description.replaceChildren();

        if (title === "Athletics") {
          const athleticsParts = card.dataset.detail.split(" BREAK ");
          const introduction = document.createElement("p");
          introduction.textContent = athleticsParts[0];
          description.append(introduction);

          athleticsParts.slice(1).forEach(section => {
            const lines = section.split("|");
            const season = document.createElement("p");
            season.textContent = lines.shift().trim();
            description.append(season);

            const sportsList = document.createElement("ul");
            lines
              .filter(sport => sport.trim())
              .forEach(sport => {
                const listItem = document.createElement("li");
                listItem.textContent = sport.trim();
                sportsList.append(listItem);
              });
            description.append(sportsList);
          });
        } else {
          const introduction = document.createElement("p");
          introduction.textContent = detailParts[0];
          description.append(introduction);
        }

        if (title !== "Athletics" && detailParts[1]) {
          const programDetails = detailParts[1].split(" like ");
          const programIntroduction = document.createElement("p");
          programIntroduction.textContent = `${programDetails[0]} include:`;
          description.append(programIntroduction);

          const majors = programDetails[1]
            .replace(/\.$/, "")
            .replace(/\s+and\s+(?=[^,]+$)/, ", ")
            .split(",")
            .map(major => major.trim());
          const majorList = document.createElement("ul");

          majors.forEach(major => {
            const listItem = document.createElement("li");
            listItem.textContent = major;
            majorList.append(listItem);
          });

          description.append(majorList);
        }
        document.querySelector("#modal-image").src = image.src;
        document.querySelector("#modal-image").alt = image.alt;
        const modalLink = document.querySelector("#modal-link");
        const cardLink = (card.dataset.link || "").trim();

        modalLink.href = cardLink;
        modalLink.hidden = !card.classList.contains("spotlight-card") || !cardLink;
        document.querySelector("#info-modal").hidden = false;
        document.body.classList.add("modal-open");
        document.querySelector(".modal-close").focus();
      };

      card.addEventListener("click", openCard);
      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openCard();
        }
      });

    });

  const infoModal = document.querySelector("#info-modal");
  const closeModal = () => {
    infoModal.hidden = true;
    document.body.classList.remove("modal-open");
  };

  infoModal.querySelectorAll("[data-modal-close]").forEach(element => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !infoModal.hidden) {
      closeModal();
    }
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