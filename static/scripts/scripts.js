const handleDarkModeTogglerClick = (evt) => {
  console.log(evt);
  evt.target.classList.toggle("active");
};

const darkModeSwitcher =
  document.getElementsByClassName("dark-mode-switcher")[0];

darkModeSwitcher.onclick = () => {
    darkModeSwitcher.classList.toggle('active');
    const toggler = darkModeSwitcher.children[0];
    if(darkModeSwitcher.classList.contains('active')) {
        toggler.innerHTML = '🌙';
    } else {
        toggler.innerHTML = '🔅';
    }
}