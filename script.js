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

    // SCROLL REVEAL
    const layers = document.querySelectorAll('.layer');

    function revealLayers() {
        const trigger = window.innerHeight * 0.85;

        layers.forEach(layer => {
            const top = layer.getBoundingClientRect().top;

            if (top < trigger) {
                layer.classList.add('show');
            }
        });
    }

    // PARALLAX EFFECT
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelector('.hero-content').style.transform =
            `translateY(${scrollY * 0.2}px)`;
    });

    window.addEventListener('scroll', revealLayers);
    revealLayers();

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

    const formData = new FormData();
    formData.append("entry.1785543098", name);
    formData.append("entry.1765275837", attending);
    formData.append("entry.1741792252", food);

    fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSdyiNNd3syoBJJTRtytipgX2dysse0KBbb_mCoiB3Hmfta7XQ/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formData
    });

    document.getElementById('form-message').innerText =
        "✅ RSVP submitted successfully!";
});
});
