const handleDarkModeTogglerClick = (evt) => {
  console.log(evt);
  evt.target.classList.toggle("active");
};

const darkModeSwitcher =
  document.getElementsByClassName("dark-mode-switcher")[0];

const darkModeTogglerIcon = document.querySelector('.dark-mode-toggler i');

darkModeSwitcher.onclick = () => {
  darkModeSwitcher.classList.toggle("active");
  darkModeTogglerIcon.classList.toggle('fa-sun');
  darkModeTogglerIcon.classList.toggle('fa-moon');
};

const meatballsMenuButton = document.getElementsByClassName(
  "nav-item meatballs-menu"
)[0];

const meatballsMenuContent = document.getElementsByClassName(
  "meatballs-menu-content"
)[0];

meatballsMenuButton.onclick = (evt) => {
  meatballsMenuContent.classList.toggle('hidden');
}

meatballsMenuContent.onclick = (evt) => {
  //prevent closing menu when clicking on content
  evt.stopPropagation();
}
