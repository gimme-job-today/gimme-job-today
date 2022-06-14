//_________________FETCH DATA FROM DB_____________

tags = [];
tagsTemp = [];
tagsTemp = [];
tagsColors = [];
tagsId = [];

window.addEventListener("load", async function (event) {
  response = await fetch("/api/tags");
  responseData = await response.json();

  if (responseData.status !== "success") return;

  tagsTemp = responseData.data.map((tag) => tag.text);

  for (i = 0; i < tagsTemp.length; i++) {
    tags.push(tagsTemp[i]);
  }

  tagsColors = responseData.data.map((tag) => tag.color);
  tagsId = responseData.data.map((tag) => tag.id);

  var add_offer_tags = document.getElementById("add-offer-tags");
  id_edit = add_offer_tags.getAttribute("current_tags");
  id_edits = id_edit.split(",");

  for (i = 0; i < tags.length; i++) {
    tagTempId = tagsId[i];

    for (j = 0; j < id_edits.length; j++) {
      if (id_edits[j] == tagTempId) {
        addDiv(i);
      }
    }
  }

  deleteTag(i);

  input_tags = document.getElementById("hiddenInput");
  input_tags.value = document.getElementById("hiddenInput").defaultValue =
    tab_tags;
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

const tab_tags = [];
document.getElementById("addTag").addEventListener("click", function () {
  tagName = document.getElementsByName("tagCaption")[0].value;

  for (i = 0; i < tagsTemp.length; i++) {
    tagTemp = tags[i];
    if (tagTemp == tagName) {
      addDiv(i);
    }
  }

  deleteTag(i);

  input_tags = document.getElementById("hiddenInput");
  input_tags.value = document.getElementById("hiddenInput").defaultValue =
    tab_tags;
});

document
  .getElementsByName("add-offer")[0]
  .addEventListener("submit", function (e) {
    if (tab_tags.length < 1) {
      alert("Należy dodać przynajmniej 1 tag.");
      e.preventDefault();
    } else if (tab_tags.length > 4) {
      alert("Należy wprowadzić maksymalnie 4 tagi.");
      e.preventDefault();
    }
  });

function addDiv(i) {
  var chosen_tags = document.createElement("div");
  chosen_tags.className = "add-offer-tags-autocomplete__chosen";
  chosen_tags.id = tagsId[i];
  chosen_tags.style.backgroundColor = tagsColors[i];
  var tag_name = document.createTextNode(tagsTemp[i]);
  chosen_tags.appendChild(tag_name);
  var delete_icon = document.createElement("span");
  delete_icon.className = "closeIcon";
  delete_icon.innerHTML = "&times;";
  chosen_tags.appendChild(delete_icon);
  var selected_tags = document.getElementById("selectedTags");
  selected_tags.appendChild(chosen_tags);
  tab_tags.push(tagsId[i]);
}

function deleteTag(i) {
  document.querySelectorAll(".closeIcon").forEach((item) => {
    item.addEventListener("click", function () {
      this.parentNode.remove();
      for (i = 0; i < tab_tags.length; i++) {
        if (tab_tags[i] == this.parentNode.id) {
          tab_tags.splice(i, 1);
          input_tags.value = document.getElementById(
            "hiddenInput"
          ).defaultValue = tab_tags;
        }
      }
    });
  });
}
