const componentLocation = "./components/";

document.addEventListener("DOMContentLoaded", () => {
  loadComponents();
  toggleNav();
});

function loadComponents(){
    document.querySelectorAll('.component').forEach(element => {
      const component = {
        element: element,
        url: componentLocation + element.id + ".html"
      }

      renderComponent(component);
  });
}

function renderComponent(component) {
  try {
    fetch(component.url).then(function (response) {
      if (response.ok) {
        return response.text();
      }

      throw response;
    }).then(function (text) {
      component.element.innerHTML = text
    });
  }
  catch (error) {
    console.error(error.message);
  }
}

function toggleNav(){
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Close main menu' : 'Open main menu');
    });
}