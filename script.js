// SHOW / HIDE FOOD OPTION
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
