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
    document.getElementById(pageName).classList.add("flex");
  };
  const pageNotFound = () => {
    alert("a página esta sendo desenvolvida");
  };
  const menu = document.getElementById("menu");
  const itens_menu = menu.getElementsByTagName("li");
  for (item of itens_menu) {
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
          pageNotFound();
          // showPage("portfolio");
        },
        experiences() {
          pageNotFound();
          // showPage("experiences");
        },
        graduation() {
          pageNotFound();
          // showPage("graduation");
        },
        contact() {
          pageNotFound();
          // showPage("contact");
        },
      };
      const value = event.target.dataset.action;
      actions[value]();
    });
  }
};
