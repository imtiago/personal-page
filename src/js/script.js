const namePages = {
  home: "Home",
  objectives: "Metas",
  portfolio: "Portfólio",
  experiences: "Experiências",
  graduation: "Formação",
  contact: "Contato",
};

window.onload = () => {
  const pages = document.getElementsByClassName("page");
  const hiddenAllPages = () => {
    for (let page of pages) {
      page.classList.remove("flex");
      page.classList.add("none");
    }
  };
  const showPage = (pageName) => {
    hiddenAllPages();
    document.title = `Tiago Oliveira - ${namePages[pageName]}`;
    document.getElementById(pageName).classList.add("flex");
  };
  const pageNotFound = () => {
    alert("a página esta em processo de desenvolvimento");
  };
  const menu = document.getElementById("menu");
  const itens_menu = menu.getElementsByTagName("li");
  const removeSelectedAllOptions = () => {
    for (let option of itens_menu) {
      option.classList.remove("selected");
    }
  };
  for (let item of itens_menu) {
    item.addEventListener("click", (event) => {
      if (!event.target.matches("[data-action]")) {
        return;
      }
      const actions = {
        home() {
          showPage("home");
        },
        objectives() {
          showPage("objectives");
        },
        portfolio() {
          showPage("portfolio");
        },
        experiences() {
          showPage("experiences");
        },
        graduation() {
          showPage("graduation");
        },
        contact() {
          showPage("contact");
        },
      };
      removeSelectedAllOptions();
      const value = event.target.dataset.action;
      actions[value]();
      event.target.classList.add("selected");
    });
  }
};
