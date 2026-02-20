import { calculateTimeRemaining } from './utils.js';

let countdownInterval;

async function fetchHoliday(countryCode) {
    const loader = document.getElementById('loader');
    const panel = document.getElementById('info-panel');
    
    loader.classList.remove('hidden');
    panel.classList.add('hidden');
    clearInterval(countdownInterval);

    try {
        const response = await fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`);
        const holidays = await response.json();
        const nextHoliday = holidays[0];

        displayHoliday(nextHoliday);
    } catch (error) {
        alert('Chyba při načítání dat.');
    } finally {
        loader.classList.add('hidden');
        panel.classList.remove('hidden');
    }
}

function displayHoliday(holiday) {
    const nameEl = document.getElementById('holiday-name');
    const dateEl = document.getElementById('holiday-date');
    
    nameEl.textContent = `${holiday.name} (${holiday.localName})`;
    dateEl.textContent = new Date(holiday.date).toLocaleDateString('cs-CZ');

    startCountdown(holiday.date);
}

function startCountdown(dateString) {
    const update = () => {
        const time = calculateTimeRemaining(dateString);
        if (!time) {
            clearInterval(countdownInterval);
            return;
        }
        document.getElementById('days').textContent = time.days;
        document.getElementById('hours').textContent = time.hours;
        document.getElementById('minutes').textContent = time.minutes;
        document.getElementById('seconds').textContent = time.seconds;
    };

    update();
    countdownInterval = setInterval(update, 1000);
}

document.querySelectorAll('.country-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        fetchHoliday(e.target.dataset.code);
    });
});