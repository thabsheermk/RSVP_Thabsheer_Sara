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

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.name,
      data.attending,
      data.food,
      new Date()
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
    document.getElementById('rsvpForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const attending = document.querySelector('input[name="attending"]:checked').value;
    const food = attending === 'Yes' ? document.getElementById('food').value : 'N/A';

    const response = await fetch("https://docs.google.com/spreadsheets/d/1aPyepuV0esRZfMW1h1mvP7Iquyu7jEADPW4TRaMchXU/exec", {
        method: "POST",
        body: JSON.stringify({
            name,
            attending,
            food
        }),
        headers: {
            "text/plain;charset=utf-8"
        }
    });

    document.getElementById('form-message').innerText =
        "✅ RSVP submitted successfully!" + response.toString();
});
});
