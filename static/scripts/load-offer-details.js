//FILTERS IN INDEX.HTML

search = document.getElementById("search-engine__button");
search.onclick = function () {
  document.getElementById("filter").style.visibility = "visible";
  document.getElementById("filter").style.display = "block";
  document.getElementById("fa-angle-down").style.visibility = "hidden";
  document.getElementById("fa-xmark").style.visibility = "visible";
  search.style.borderRadius = "25px 25px 0px 0px";
};

closeFilter = document.getElementById("fa-xmark");
closeFilter.onclick = function () {
  document.getElementById("filter").style.visibility = "hidden";
  document.getElementById("filter").style.display = "none";
  document.getElementById("fa-angle-down").style.visibility = "visible";
  document.getElementById("fa-xmark").style.visibility = "hidden";
  search.style.borderRadius = "25px";
};

const slider_min = document.getElementById("slider-min");
const slider_salary_min = document.getElementById("slider-salary-min");
const showSalaryMin = () => {
  slider_salary_min.textContent = slider_min.value;
};

slider_min.addEventListener("mousemove", showSalaryMin);

const slider_max = document.getElementById("slider-max");
const slider_salary_max = document.getElementById("slider-salary-max");
const showSalaryMax = () => {
  slider_salary_max.textContent = slider_max.value;
};

slider_max.addEventListener("mousemove", showSalaryMax);

//TAGS

let offerDetailsDiv;

tab = [];

let loadedOffer;

document.addEventListener(
  "click",
  async function (event) {
    if (!event.target.classList.contains("offer__show-details-button")) return;
    const offerToLoadId = event.target.dataset.offerId;
    console.log(offerToLoadId);
    tab.push(offerToLoadId);

    response = await fetch(`/api/offer-details?id=${offerToLoadId}`);
    responseData = await response.json();

    loadedOffer = responseData;

    if (responseData.status !== "success") return;

    offerDetailsDiv = "";
    if (window.innerWidth <= 1200) {
      offerDetailsDiv = document.getElementById(offerToLoadId);
      document.getElementById("offer-details-max").style.visibility = "hidden";
      if (tab.length == 2) {
        document.getElementById(tab[0]).style.visibility = "hidden";
        document.getElementById(tab[0]).style.display = "none";
        tab.shift();
      }
    } else {
      offerDetailsDiv = document.getElementById("offer-details-max");
      document.getElementById(tab[0]).style.visibility = "hidden";
      document.getElementById(tab[0]).style.display = "none";
      tab.shift();
      // document.getElementsByClassName(".offer-below").style.visibility =
      //  "hidden";
      //document.getElementsByName("offer-below").style.visibility = "hidden";
      //document.getElementsByName("offer-below").style.display = "none";
    }

    const detailsTags = offerDetailsDiv.querySelector(".offer-details__tags");
    const detailsLogoImg = offerDetailsDiv.querySelector(
      ".offer-details__logo img"
    );
    const detailsPositionJob = offerDetailsDiv.querySelector(
      ".offer-details__job"
    );
    const detailsCompanyName = offerDetailsDiv.querySelector(
      ".offer-details__company-name"
    );
    const detailsSalary = offerDetailsDiv.querySelector(
      ".offer-details__salary"
    );

    const detailsContractType = offerDetailsDiv.querySelector(
      ".offer-details__contract-type"
    );
    const detailsWorkTime = offerDetailsDiv.querySelector(
      ".offer-details__work-time"
    );
    const detailsWorkMode = offerDetailsDiv.querySelector(
      ".offer-details__work-mode"
    );
    const detailsCity = offerDetailsDiv.querySelector(".offer-details__city");

    const detailsPositionDescription = offerDetailsDiv.querySelector(
      ".offer-details__position-description"
    );
    const detailsCompanyDescription = offerDetailsDiv.querySelector(
      ".offer-details__company-description"
    );

    const detailsVisitCounter = offerDetailsDiv.querySelector(
      ".offer-details__visit-counter"
    );

    detailsTags.innerText = responseData.data.tags
      .map((tag) => tag.text)
      .join(", ");
    detailsLogoImg.src = responseData.data.company.logo.url;
    detailsPositionJob.innerText = responseData.data.position;
    detailsCompanyName.innerText = responseData.data.company.name;
    detailsSalary.innerText = `${responseData.data.salary_min}-${responseData.data.salary_max} zł`;

    detailsContractType.innerText = responseData.data.contract_type;
    detailsWorkTime.innerText = responseData.data.work_time;
    detailsWorkMode.innerText = responseData.data.work_mode;
    detailsCity.innerText = responseData.data.city;

    detailsPositionDescription.innerText = responseData.data.description;
    detailsCompanyDescription.innerText = responseData.data.company.description;

    detailsVisitCounter.innerText = responseData.data.visit_counter;

    offerDetailsDiv.style.visibility = "visible";

    if (window.innerWidth <= 1200) {
      offerDetailsDiv.style.display = "block";
    }

  },
  true
);

const openContactMail = () => {
  const contactEmail = loadedOffer.data.email;
  const positionJob = loadedOffer.data.position;

  const mailSubject = `Aplikacja na stanowisko: ${positionJob}`;
  const mailBody = `Szanowni Państwo,
  %0D%0AW nawiązaniu do oferty pracy na stanowisko: ${positionJob} umieszczonej na portalu gimme-job.today przesyłam swoją aplikację. Uprzejmie proszę o rozpatrzenie i informację zwrotną.
  %0D%0A%0D%0AMoje dane kontaktowe:
  %0D%0AImię i nazwisko:
  %0D%0AAdres email:
  %0D%0ANumer telefonu: `;

  window.open(`mailto:${contactEmail}?subject=${mailSubject}&body=${mailBody}`);
}


window.addEventListener("resize", function () {
  if (offerDetailsDiv != undefined) {
    if (window.innerWidth > 1200) {
      if(offerDetailsDiv.id != "offer-details-max") {
        offerDetailsDiv.style.display = "none";
        offerDetailsDiv.style.visibility = "hidden";
      }
    }
    else {
      offerDetailsDiv.style.visibility = "visible";
    }
  }
});


document.querySelector('.searching-content__button').addEventListener("click", function (e) {
  if(slider_min.value > slider_max.value) {
    e.preventDefault();
    let temp = slider_max.value;
    slider_max.value = slider_min.value;
    slider_min.value = temp;
    slider_salary_min.textContent = slider_min.value;
    slider_salary_max.textContent = slider_max.value;
    this.click();
  }
})