document.addEventListener('DOMContentLoaded', () => {

    const weddingDate = new Date("May 31, 2026 11:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff <= 0) return;

        document.getElementById('days').innerText =
            String(Math.floor(diff / (1000*60*60*24))).padStart(2,'0');

        document.getElementById('hours').innerText =
            String(Math.floor((diff/(1000*60*60))%24)).padStart(2,'0');

        document.getElementById('minutes').innerText =
            String(Math.floor((diff/(1000*60))%60)).padStart(2,'0');

        document.getElementById('seconds').innerText =
            String(Math.floor((diff/1000)%60)).padStart(2,'0');

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

    document.getElementById('rsvpForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const attending = document.querySelector('input[name="attending"]:checked').value;
        const food = attending === 'Yes' ? document.getElementById('food').value : 'N/A';

        const message =
`RSVP - Thabsheer & Sara Wedding

Name: ${name}
Attending: ${attending}
Food: ${food}`;

        const phoneNumber = "91XXXXXXXXXX";

        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    });

});
