// SHOW / HIDE FOOD OPTION
const weddingDate = new Date("May 31, 2026 11:00:00").getTime();

function updateFlip(id, newValue) {
    const card = document.getElementById(id);
    const top = card.querySelector('.top');
    const bottom = card.querySelector('.bottom');

    const current = top.innerText;

    if (current === newValue) return;

    card.classList.add('flip');

    // Update AFTER top flips
    setTimeout(() => {
        top.innerText = newValue;
    }, 200);

    // Update bottom slightly later
    setTimeout(() => {
        bottom.innerText = newValue;
        card.classList.remove('flip');
    }, 400);
}

setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) return;

    const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    updateFlip('days-card', days);
    updateFlip('hours-card', hours);
    updateFlip('minutes-card', minutes);
    updateFlip('seconds-card', seconds);

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
