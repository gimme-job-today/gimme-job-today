const handleDarkModeTogglerClick = (evt) => {
  console.log(evt);
  evt.target.classList.toggle("active");
};

const darkModeSwitcher =
  document.getElementsByClassName("dark-mode-switcher")[0];

const darkModeTogglerIcon = document.querySelector(".dark-mode-toggler i");

if (darkModeSwitcher) {
  darkModeSwitcher.onclick = () => {
    darkModeSwitcher.classList.toggle("active");
    darkModeTogglerIcon.classList.toggle("fa-sun");
    darkModeTogglerIcon.classList.toggle("fa-moon");
  };
}

const meatballsMenuButton = document.getElementsByClassName(
  "nav-item meatballs-menu"
)[0];

const meatballsMenuContent = document.getElementsByClassName(
  "meatballs-menu-content"
)[0];

meatballsMenuButton.onclick = (evt) => {
  meatballsMenuContent.classList.toggle("hidden");
};

meatballsMenuContent.onclick = (evt) => {
  //prevent closing menu when clicking on content
  evt.stopPropagation();
};

//_____________________Pop-up window_________________________

const modalOffer = document.getElementsByClassName("modalOffer")[0];
const modalProfile = document.getElementsByClassName("modalProfile")[0];
const CloseBtnOffer = document.getElementsByClassName("BackLinkOffer")[0];
const CloseBtnProfile = document.getElementsByClassName("BackLinkProfile")[0];

//Delete profile button in pop-up
const BtnDeleteProfile = document.getElementsByClassName(
  "ButtonDeleteProfile"
)[0];

BtnDeleteProfile.onclick = function () {
  //Place for password check code

  window.location.replace("account-deleted");
};

CloseBtnOffer.onclick = function () {
  modalOffer.style.display = "none";
};

CloseBtnProfile.onclick = function () {
  modalProfile.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalOffer || event.target == modalProfile) {
    modalOffer.style.display = "none";
    modalProfile.style.display = "none";
  }
};

function showModalDeleteProfile(evt) {
  evt.preventDefault();
  console.log(modalProfile);
  modalProfile.style.display = "block";
}

function showModalDeleteOffer() {
  modalOffer.style.display = "block";
}

window.addEventListener("load", () => {
  const successMessageContent = document.getElementsByClassName(
    "success-message-content"
  )[0];
  if (successMessageContent.innerText.length > 0) {
    successMessageContent.classList.add("appear");

    setInterval(() => successMessageContent.classList.remove("appear"), 5000);
  }
});
