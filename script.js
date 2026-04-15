document.addEventListener('DOMContentLoaded', () => {

const weddingDate = new Date("May 31, 2026 11:00:00").getTime();

function update(id, value) {
    const el = document.getElementById(id);
    if (!el) return;

    if (el.innerText !== value) {
        el.parentElement.classList.add('animate');

        setTimeout(() => {
            el.innerText = value;
            el.parentElement.classList.remove('animate');
        }, 150);
    }
}

setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) return;

    const d = String(Math.floor(diff / (1000*60*60*24))).padStart(2,'0');
    const h = String(Math.floor((diff/(1000*60*60))%24)).padStart(2,'0');
    const m = String(Math.floor((diff/(1000*60))%60)).padStart(2,'0');
    const s = String(Math.floor((diff/1000)%60)).padStart(2,'0');

    update('days', d);
    update('hours', h);
    update('minutes', m);
    update('seconds', s);

}, 1000);

});
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
