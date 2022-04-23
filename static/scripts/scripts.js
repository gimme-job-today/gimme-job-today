const handleDarkModeTogglerClick = (evt) => {
  console.log(evt);
  evt.target.classList.toggle("active");
};

const darkModeSwitcher =
  document.getElementsByClassName("dark-mode-switcher")[0];

darkModeSwitcher.onclick = () => {
  darkModeSwitcher.classList.toggle("active");
  const toggler = darkModeSwitcher.children[0];
  if (darkModeSwitcher.classList.contains("active")) {
    toggler.innerHTML = "🌙";
  } else {
    toggler.innerHTML = "🔅";
  }
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


//_____________________Pop-up window_________________________

var modal = document.getElementsByClassName("modal")[0];
var CloseBtn = document.getElementsByClassName("SwitchOff")[0];

CloseBtn.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

