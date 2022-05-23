//_________________FETCH DATA FROM DB_____________

tags = [];
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
      codeHTML =
        '<div class="add-offer-tags-autocomplete__chosen" id="' +
        tagsId[i] +
        '" style="background-color: ' +
        tagsColors[i] +
        '"> ' +
        tagTemp +
        '<span class="closeIcon">&times;</span></div>';

      document.getElementById("selectedTags").innerHTML += codeHTML;

      tab_tags.push(tagsId[i]);
    }
  }

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

  input_tags = document.getElementById("hiddenInput");
  input_tags.value = document.getElementById("hiddenInput").defaultValue =
    tab_tags;
});

document.getElementsByName("add-offer")[0].addEventListener("submit", function (e) {
  if(tab_tags.length < 1) {
    alert("Należy dodać przynajmniej 1 tag.");
    e.preventDefault();
  }
  else if(tab_tags.length > 4) {
    alert("Należy wprowadzić maksymalnie 4 tagi.");
    e.preventDefault();
  }
})