const componentLocation = "../components/";

document.addEventListener("DOMContentLoaded", () => {
  loadComponents().then(() => {
    toggleResponsiveNav();
    setHeaderActiveLink();
    addGalleryListeners();
  });
});

function loadComponents() {
  const promises = [];

  document.querySelectorAll(".component").forEach((element) => {
    const component = {
      element: element,
      tagName: element.tagName.toLowerCase(),
      url: componentLocation + element.dataset.component + ".html",
    };

    promises.push(renderComponent(component));
  });

  return Promise.all(promises);
}

function renderComponent(component) {
  return fetch(component.url)
    .then(function (response) {
      if (response.ok) {
        return response.text();
      }

      throw response;
    })
    .then(function (text) {
      const template = document.createElement("template");
      template.innerHTML = text.trim();
      component.element.replaceWith(template.content.firstChild);
    })
    .catch(function (error) {
      console.error(error.message);
    });
}

function setHeaderActiveLink() {
  document.querySelectorAll(".main-nav ul li a").forEach((element) => {
    if (element.pathname.includes(window.location.pathname)) {
      element.classList.add("active");
    }
  });
}

function toggleResponsiveNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close main menu" : "Open main menu"
    );
  });
}

function addGalleryListeners() {

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll("section article.expanded")
        .forEach(a => a.classList.remove("expanded"));
    }
  });

  document.querySelectorAll("body .index .container section:nth-child(2) article").forEach(article => {
    article.addEventListener("click", (e) => {
      const isExpanded = article.classList.contains("expanded");

      if (isExpanded) {
        article.classList.remove("expanded");
        return;
      }

      document.querySelectorAll("section article.expanded")
        .forEach(a => a.classList.remove("expanded"));

      article.classList.add("expanded");
    });
  });
}