

var OFFER_ID_TO_DELETE = undefined;


document.addEventListener("click", (event) => {

    if ( ! event.target.hasAttribute("delete-offer-trash-icon") ) return;

    OFFER_ID_TO_DELETE = event.target.dataset.offerId;
});

document.addEventListener("click", (event) => {

    if ( ! event.target.hasAttribute("delete-offer--accept-button") ) return;

    window.location.href = `/delete-offer/${OFFER_ID_TO_DELETE}`;
});
