// SHOW / HIDE FOOD OPTION
const weddingDate = new Date("May 31, 2026 11:00:00").getTime();

function flip(id, newValue) {
    const el = document.getElementById(id);

    const top = el.querySelector('.top');
    const bottom = el.querySelector('.bottom');
    const topFlip = el.querySelector('.top-flip');
    const bottomFlip = el.querySelector('.bottom-flip');

    const current = top.innerText;

    if (current === newValue) return;

    // set initial values
    topFlip.innerText = current;
    bottomFlip.innerText = newValue;

    el.classList.add('flip');

    setTimeout(() => {
        top.innerText = newValue;
        bottom.innerText = newValue;
        el.classList.remove('flip');
    }, 500);
}

setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) return;

    const d = String(Math.floor(diff / (1000*60*60*24))).padStart(2,'0');
    const h = String(Math.floor((diff/(1000*60*60))%24)).padStart(2,'0');
    const m = String(Math.floor((diff/(1000*60))%60)).padStart(2,'0');
    const s = String(Math.floor((diff/1000)%60)).padStart(2,'0');

    flip('days', d);
    flip('hours', h);
    flip('minutes', m);
    flip('seconds', s);

}, 1000);
const attendingInputs = document.querySelectorAll('input[name="attending"]');
const foodChoice = document.getElementById('food-choice');

attendingInputs.forEach(input => {
    input.addEventListener('change', () => {
        if (input.value === 'Yes' && input.checked) {
            foodChoice.classList.remove('hidden');
        } else {
            foodChoice.classList.add('hidden');
        }
    });
});

// WHATSAPP SUBMIT
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const attending = document.querySelector('input[name="attending"]:checked').value;
    const food = attending === 'Yes' ? document.getElementById('food').value : 'N/A';

    const message = `Hello, RSVP for wedding:\n\nName: ${name}\nAttending: ${attending}\nFood: ${food}`;

    // 🔴 PUT YOUR NUMBER HERE (NO +, NO SPACES)
    const phoneNumber = "919495014959";

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');
});
