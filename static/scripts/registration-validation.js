const buttonSubmit = document.getElementsByClassName("buttonRegister")[0];
const formRegister = document.querySelector("form[name=register]");
const chckBox = formRegister.querySelector("input[name=acceptPolicyCheckbox]");
const passwordField = formRegister.querySelector("input[name=password]");
const passwordRepeatField = formRegister.querySelector("input[name=passwordRepeat]");


formRegister.addEventListener("submit", function(event) {
    if (passwordField.value !== passwordRepeatField.value) {
        alert("Hasła nie są takie same");
        event.preventDefault();
    }
    if (chckBox.checked == false) {
        alert("Zaznacz pole Regulaminu!");
        event.preventDefault();
    }
}, true);
