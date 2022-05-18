const offerDetailsDiv = document.querySelector(".appointmentDetails");


const detailsTags = offerDetailsDiv.querySelector(".detailsTags");
const detailsLogoImg = offerDetailsDiv.querySelector(".detailsLogo img");
const detailsPositionJob = offerDetailsDiv.querySelector(".detailsPositionJob");
const detailsCompanyName = offerDetailsDiv.querySelector(".detailsCompanyName");
const detailsSalary = offerDetailsDiv.querySelector(".detailsSalary");

const detailsContractType = offerDetailsDiv.querySelector(".detailsContractType")
const detailsWorkTime = offerDetailsDiv.querySelector(".detailsWorkTime")
const detailsWorkMode = offerDetailsDiv.querySelector(".detailsWorkMode")
const detailsCity = offerDetailsDiv.querySelector(".detailsCity")

const detailsPositionDescription = offerDetailsDiv.querySelector(".detailsPositionDescription");
const detailsCompanyDescription = offerDetailsDiv.querySelector(".detailsCompanyDescription");

const detailsVisitCounter = offerDetailsDiv.querySelector(".detailsVisitCounter");


document.addEventListener("click", async function(event) {
    if (!event.target.classList.contains("offer__show-details-button")) return;

    const offerToLoadId = event.target.dataset.offerId

    response = await fetch(`/api/offer-details?id=${offerToLoadId}`);
    responseData = await response.json();

    if (responseData.status !== "success") return;

    detailsTags.innerText = responseData.data.tags.map(tag => tag.text).join(", ");
    detailsLogoImg.src = responseData.data.company.logo.url;
    detailsPositionJob.innerText = responseData.data.position
    detailsCompanyName.innerText = responseData.data.company.name
    detailsSalary.innerText = `${responseData.data.salary_min}-${responseData.data.salary_max} zł`

    detailsContractType.innerText = responseData.data.contract_type
    detailsWorkTime.innerText = responseData.data.work_time
    detailsWorkMode.innerText = responseData.data.work_mode
    detailsCity.innerText = responseData.data.city

    detailsPositionDescription.innerText = responseData.data.description
    detailsCompanyDescription.innerText = responseData.data.company.description

    detailsVisitCounter.innerText = responseData.data.visit_counter

    offerDetailsDiv.style.visibility = "visible";
}, true);
