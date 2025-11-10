const componentLocation = "./components/";

document.addEventListener("DOMContentLoaded", () => {
  loadComponents();
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