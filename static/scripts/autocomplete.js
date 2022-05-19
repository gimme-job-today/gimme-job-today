//_________________FETCH DATA FROM DB_____________

tagsLen = document.getElementsByClassName("appointmentTags").length;

tags = [];
tags2 = [];
tagsColors = [];

window.addEventListener("load", async function (event) {
  response = await fetch("/api/tags");
  responseData = await response.json();

  if (responseData.status !== "success") return;

  tags2 = responseData.data.map((tag) => tag.text);

  for (i = 0; i < tags2.length; i++) {
    tags.push(tags2[i]);
  }

  tagsColors = responseData.data.map((tag) => tag.color);
});

//_______________AUTOCOMPLETE______________________

function autocomplete(input, tagArray) {
  var currentFocus;
  input.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "add-offer-tags-autocomplete__items");
    this.parentNode.appendChild(a);
    for (i = 0; i < tagArray.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (
        tagArray[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
      ) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        b.innerHTML =
          "<strong>" + tagArray[i].substr(0, val.length) + "</strong>";
        b.innerHTML += tagArray[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + tagArray[i] + "'>";
        b.addEventListener("click", function (e) {
          input.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  input.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("add-offer-tags-autocomplete__active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("add-offer-tags-autocomplete__active");
    }
  }
  function closeAllLists(element) {
    var x = document.getElementsByClassName(
      "add-offer-tags-autocomplete__items"
    );
    for (var i = 0; i < x.length; i++) {
      if (element != x[i] && element != input) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(
  document.getElementsByClassName("add-offer-tags-autocomplete__input")[0],
  tags
);

//______________SHOW TAGS ON SITE__________________

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

document.getElementById("addTag").addEventListener("click", function () {
  tagName = document.getElementsByName("tagCaption")[0].value;

  for (i = 0; i < tagsLen; i++) {
    tagTemp = tags[i];
    if (tagTemp == tagName) {
      codeHTML =
        '<div class="chosenTags" style="background-color: ' +
        tagsColors[i] +
        '"> ' +
        tagTemp +
        "</div>";
      document.getElementById("selectedTags").innerHTML += codeHTML;
      //document.getElementsByClassName("appointmentTags")[i].style.visibility = "visible";
    }
  }
});
