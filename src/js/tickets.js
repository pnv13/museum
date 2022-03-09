const buyNow = document.querySelector('.tickets__section_content-text_amount-btn');
const ticketsPopup = document.querySelector('.tickets__form_popup');
const closeBtn = document.querySelector('.tickets__form-exitBtn');
const bookBtn = document.querySelector('.rightContent-btn');
const PLUS_BASIC_BTNS = document.querySelectorAll('.btnBasicPlus');
const MINUS_BASIC_BTNS = document.querySelectorAll('.btnBasicMinus');
const PLUS_SENIOR_BTNS = document.querySelectorAll('.btnSeniorPlus');
const MINUS_SENIOR_BTNS = document.querySelectorAll('.btnSeniorMinus');

const showTicketsForm = () => {
  ticketsPopup.style.opacity = '1';
  ticketsPopup.style.visibility = 'visible';
  ticketsPopup.classList.add('active');
};

const closeTicketsForm = () => {
  ticketsPopup.classList.remove('active');
  setTimeout(() => {
    ticketsPopup.style.opacity = '0';
    ticketsPopup.style.visibility = 'hidden';
  }, 500);
};

window.addEventListener('click', e => {
  if (e.target === buyNow) {
    showTicketsForm();
  } else if (e.target === closeBtn) {
    closeTicketsForm();
  } else if (e.target === ticketsPopup) {
    closeTicketsForm();
  }
});

let root = document.documentElement;
bookBtn.addEventListener('click', e => {
  let x = e.clientX - e.target.getBoundingClientRect().x;
  let y = e.clientY - e.target.getBoundingClientRect().y;
  let positionX = Math.round((x * 100) / e.target.offsetWidth) + '%';
  let positionY = Math.round((y * 100) / e.target.offsetHeight) + '%';
  root.style.setProperty('--ripple-x', positionX);
  root.style.setProperty('--ripple-y', positionY);
});

let basicTicketCount = 0;
let seniorTicketCount = 0;
function ticketCalculator() {
  dateChecker();
  timeChecker();
  ticketTypeChecker();
  ticketTotalPrice();
  setTimeout(ticketCalculator, 1000);
}
ticketCalculator();

function timeChecker() {
  const TIME = document.getElementById('formTime');

  // console.log(TIME.value);
}

function dateChecker() {
  const DATE = document.getElementById('formDate');
  const DATE_RESULT = document.querySelector('.dateResult');

  const GLOBAL_DATE = new Date();
  let year = GLOBAL_DATE.getFullYear();
  let month = GLOBAL_DATE.getMonth() + 1;
  let day = GLOBAL_DATE.getDate();

  DATE.setAttribute('min', `${year}-${month}-${day}`);
  DATE.setAttribute('value', `${year}-${month}-${day}`);

  let dateChanger = new Date(DATE.value);

  let options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };

  DATE_RESULT.innerHTML = dateChanger.toLocaleString('en-US', options);
}

function ticketCount(e) {
  if (
    e.target.classList.contains('btnBasicPlus') &&
    basicTicketCount >= 0 &&
    basicTicketCount <= 19
  ) {
    basicTicketCount++;
  }
  if (
    e.target.classList.contains('btnBasicMinus') &&
    basicTicketCount > 0 &&
    basicTicketCount <= 20
  ) {
    basicTicketCount--;
  }
  if (
    e.target.classList.contains('btnSeniorMinus') &&
    seniorTicketCount > 0 &&
    seniorTicketCount <= 20
  ) {
    seniorTicketCount--;
  }
  if (
    e.target.classList.contains('btnSeniorPlus') &&
    seniorTicketCount >= 0 &&
    seniorTicketCount <= 19
  ) {
    seniorTicketCount++;
  }
  localStorage.setItem('basicTickets', basicTicketCount);
  localStorage.setItem('seniorTickets', seniorTicketCount);
}

function ticketTotalPrice() {
  const TICKET_TOTAL = document.querySelector('.tickets__section_content-text_amount-total');
  const TICKET_FORM_TOTAL = document.querySelector('.ticketForm-total');
  const BASIC_TICKETS = document.querySelectorAll('#basicTicket');
  const SENIOR_TICKETS = document.querySelectorAll('#seniorTicket');
  const FORM_BASIC_VALUE = document.querySelector('.ticketForm-basicValue');
  const FORM_BASIC_PRICE = document.querySelector('.ticketForm-basicPrice');
  const FORM_SENIOR_VALUE = document.querySelector('.ticketForm-seniorValue');
  const FORM_SENIOR_PRICE = document.querySelector('.ticketForm-seniorPrice');

  if (localStorage.getItem('basicTickets')) {
    basicTicketCount = +localStorage.getItem('basicTickets');
  } else {
    basicTicketCount = 0;
  }
  if (localStorage.getItem('seniorTickets')) {
    seniorTicketCount = +localStorage.getItem('seniorTickets');
  } else {
    seniorTicketCount = 0;
  }
  BASIC_TICKETS.forEach(el => {
    el.value = basicTicketCount;
  });
  SENIOR_TICKETS.forEach(el => {
    el.value = seniorTicketCount;
  });

  const BASIC = {
    'Permanent exhibition': 20,
    'Temporary exhibition': 25,
    'Combined Admission': 40,
  };
  const SENIOR = {
    'Permanent exhibition': 10,
    'Temporary exhibition': 12.5,
    'Combined Admission': 20,
  };

  let totalBasicPrice = basicTicketCount * BASIC[localStorage.getItem('ticketType')];
  let totalSeniorPrice = seniorTicketCount * SENIOR[localStorage.getItem('ticketType')];
  let ticketTotalPrice = totalBasicPrice + totalSeniorPrice;

  FORM_BASIC_PRICE.innerHTML = `${totalBasicPrice} &#8364;`;
  FORM_SENIOR_PRICE.innerHTML = `${totalSeniorPrice} &#8364;`;
  FORM_BASIC_VALUE.innerHTML = basicTicketCount;
  FORM_SENIOR_VALUE.innerHTML = seniorTicketCount;

  TICKET_TOTAL.innerHTML = `Total &#8364; ${ticketTotalPrice}`;
  TICKET_FORM_TOTAL.innerHTML = `${ticketTotalPrice} &#8364;`;
}

function ticketTypeChecker() {
  const TICKET_TYPES = document.querySelectorAll(
    '.tickets__section_content-text_ticket-type_radio'
  );
  TICKET_TYPES.forEach(ticketType => {
    if (ticketType.value === localStorage.getItem('ticketType')) {
      ticketType.setAttribute('checked', 'checked');
    } else {
      ticketType.removeAttribute('checked');
    }
    ticketType.addEventListener('click', e => {
      if (e.target.hasAttribute('checked')) {
        localStorage.setItem('ticketType', e.target.value);
      } else {
        localStorage.removeItem('ticketType');
        TICKET_TYPES.forEach(el => el.removeAttribute('checked'));
        e.target.setAttribute('checked', 'checked');
        localStorage.setItem('ticketType', e.target.value);
      }
    });
  });
}

PLUS_BASIC_BTNS.forEach(el => {
  el.addEventListener('click', ticketCount);
});
MINUS_BASIC_BTNS.forEach(el => {
  el.addEventListener('click', ticketCount);
});
PLUS_SENIOR_BTNS.forEach(el => {
  el.addEventListener('click', ticketCount);
});
MINUS_SENIOR_BTNS.forEach(el => {
  el.addEventListener('click', ticketCount);
});