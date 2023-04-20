// show and hide items
let contentSections = ["home", "about", "tips", "shop", "form"];
let navElements = document.querySelectorAll(".nav-list li");
let footerElements = document.querySelectorAll(".footer-nav li");

for (let i = 0; i < navElements.length; i++) {
  navElements[i].addEventListener("click", (e) => {
    for (let i = 0; i < navElements.length; i++) {
      navElements[i].classList.remove("selected");
    }

    let el = e.currentTarget;
    el.classList.add("selected");

    for (section of contentSections) {
      let el = document.getElementById(`${section}`);
      el.classList.remove("show");
      el.classList.add("hidden");
    }

    let name = `${el.title}`;

    let showEl = document.getElementById(name);
    showEl.classList.add("show");
  });
}

for (let i = 0; i < footerElements.length; i++) {
  footerElements[i].addEventListener("click", (e) => {
    let el = e.currentTarget;

    for (section of contentSections) {
      let el = document.getElementById(`${section}`);
      el.classList.remove("show");
      el.classList.add("hidden");
    }

    let name = `${el.title}`;

    let showEl = document.getElementById(name);
    showEl.classList.add("show");
  });
}
