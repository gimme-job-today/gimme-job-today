const offerDetailsDiv = document.querySelector(".offer-details");

const detailsTags = offerDetailsDiv.querySelector(".offer-details__tags");
const detailsLogoImg = offerDetailsDiv.querySelector(
  ".offer-details__logo img"
);
const detailsPositionJob = offerDetailsDiv.querySelector(".offer-details__job");
const detailsCompanyName = offerDetailsDiv.querySelector(
  ".offer-details__company-name"
);
const detailsSalary = offerDetailsDiv.querySelector(".offer-details__salary");

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

document.addEventListener(
  "click",
  async function (event) {
    if (!event.target.classList.contains("offer__show-details-button")) return;

    const offerToLoadId = event.target.dataset.offerId;

    response = await fetch(`/api/offer-details?id=${offerToLoadId}`);
    responseData = await response.json();

    if (responseData.status !== "success") return;

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
  },
  true
);
