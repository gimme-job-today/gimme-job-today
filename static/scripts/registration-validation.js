const buttonSubmit = document.getElementsByClassName("buttonRegister")[0];
const formRegister = document.forms[0];
const chckBox = formRegister.elements["checkbox"];


formRegister.addEventListener("submit", function(event) {
    if(chckBox.checked == false){
        alert("Zaznacz pole Regulaminu!");
        event.preventDefault();
    }           
}, true);
