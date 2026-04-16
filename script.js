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
    const guestCounter = document.getElementById('guest-counter');
    attendingInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value === 'Yes' && input.checked) {
                foodChoice.classList.remove('hidden');
                guestCounter.classList.remove('hidden');
            } else {
                foodChoice.classList.add('hidden');
                guestCounter.classList.add('hidden');
            }
        });
    });
let guestCount = 1;

document.getElementById('increase').addEventListener('click', () => {
    guestCount++;
    document.getElementById('guestCount').innerText = guestCount;
});

document.getElementById('decrease').addEventListener('click', () => {
    if (guestCount > 1) {
        guestCount--;
        document.getElementById('guestCount').innerText = guestCount;
    }
});
let isSubmitting = false;

document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const attending = document.querySelector('input[name="attending"]:checked').value;
    const food = attending === 'Yes' ? document.getElementById('food').value : 'N/A';
    
    if (isSubmitting) return; // 🚫 block repeat
    isSubmitting = true;

    const button = this.querySelector('button');
    button.disabled = true;
    button.innerText = "Sending...";

    // 🔥 show popup
    document.getElementById('loadingPopup').classList.remove('hidden');

    const formData = new FormData();
    formData.append("entry.1231794982", name);
    formData.append("entry.1765275837", attending);
    formData.append("entry.1741792252", food);
    formData.append("entry.1785543098", guestCount);
    fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSdyiNNd3syoBJJTRtytipgX2dysse0KBbb_mCoiB3Hmfta7XQ/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formData
    });

   
    // ✅ simulate success (since no-cors)
    setTimeout(() => {
        document.getElementById('loadingPopup').classList.add('hidden');

        document.getElementById('form-message').innerText =
            "✅ RSVP submitted successfully!";

        button.innerText = "Submitted ✓";
    }, 1500);
});
});
