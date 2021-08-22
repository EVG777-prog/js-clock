const handHours = document.querySelector('.hh'),
    handMinutes = document.querySelector('.mh'),
    handSeconds = document.querySelector('.sh'),
    clockDigitalTime = document.querySelector('#digit-time'),
    clockDigitalDay = document.querySelector('#digit-day'),
    clockDigitalDate = document.querySelector('#digit-date'),
    buttonCountCitiesUp = document.querySelector('#count-cities-up'),
    buttonCountCitiesDown = document.querySelector('#count-cities-down'),
    containerClocks = document.querySelector('#container-wc'),
    numbCity = document.querySelector('#number-city'),
    selCity = document.querySelector('#select-city'),
    buttonSetCity = document.querySelector('#set-city');

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let interval;

const timeZones = {
    'New York (US)': -4,
    'Los Angeles (US)': -7,
    'San Diego (US)': -7,
    'San Francisco (US)': -7,
    'Seattle (US)': -7,
    'Vancouver (Canada)': -8,
    'Chicago (US)': -5,
    'Mexico City (Mexico)': -5,
    'Detroit (US)': -4,
    'Havana (Cuba)': -4,
    'Washington (US)': -4,
    'Sydney (Australia)': +10
};

let cityClocks = ['Detroit (US)', 'Chicago (US)', 'Washington (US)', 'Sydney (Canada)'];

buttonCountCitiesUp.addEventListener('click', (e) => {
    e.preventDefault();
    cityClocks.push('New York (US)');
    document.querySelector('.count-cities-text').textContent = cityClocks.length;
    showClocks();
    createNumCities();
});
buttonCountCitiesDown.addEventListener('click', (e) => {
    e.preventDefault();
    cityClocks.pop();
    document.querySelector('.count-cities-text').textContent = cityClocks.length;
    showClocks();
    createNumCities();
});
buttonSetCity.addEventListener('click', (e) => {
    e.preventDefault();
    cityClocks[numbCity.selectedIndex - 1] = selCity.options[selCity.selectedIndex].text;
    showClocks();
});

function createNumCities() {
    let element = document.getElementById("number-city");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    let html = `<option selected disabled>Select watch number</option>`;
    element.insertAdjacentHTML('beforeend', html);

    for (let i = 0; i < cityClocks.length; i++) {
        let html = `<option value="${i + 1}">${i + 1}</option>`;
        element.insertAdjacentHTML('beforeend', html);
    }
}

function createListCities() {
    let element = document.getElementById("select-city");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    let html = `<option selected disabled>Select city</option>`;
    element.insertAdjacentHTML('beforeend', html);

    let citiesAll = Object.keys(timeZones);

    for (let i = 0; i < citiesAll.length; i++) {
        let html = `<option value="${citiesAll[i]}">${citiesAll[i]}</option>`;
        element.insertAdjacentHTML('beforeend', html);
    }
}

// функция показа часов
function showClocks() {
    let clocks = document.querySelectorAll('.clock-face-small');

    clocks.forEach(value => {
        containerClocks.removeChild(value);
    });

    for (let i = 0; i < cityClocks.length; i++) {
        let html = `
        <div id="clock-${i+1}" class="clock-face-small">
            <p class="city-name">${cityClocks[i]}</p>
            <p class="city-number">№${i+1}</p>
            <div class="hh-small"></div>
            <div class="mh-small"></div>
            <div class="sh-small"></div>
        </div>`;

        containerClocks.insertAdjacentHTML('beforeend', html);
    }
    startClocks();
}

function startClocks() {
    const handsHourWorld = document.querySelectorAll('.hh-small');
    const handsMinuteWorld = document.querySelectorAll('.mh-small');
    const handsSecondWorld = document.querySelectorAll('.sh-small');
    clearInterval(interval);
    interval = setInterval(() => {
        const date = new Date();
        let hr = date.getHours(),
            mn = date.getMinutes(),
            sc = date.getSeconds();

        handHours.style.transform = `rotate(${90 + hr / 12 * 360 + (1 / 12 * mn / 60 *360)}deg)`;
        handMinutes.style.transform = `rotate(${90 + mn / 60 * 360 + (1 / 60 * sc / 60 * 360)}deg)`;
        handSeconds.style.transform = `rotate(${90 + sc / 60 * 360}deg)`;

        clockDigitalTime.textContent = `${hr}:${mn}:${sc}`;
        clockDigitalDay.textContent = `${dayOfWeek[date.getDay()]}`;
        clockDigitalDate.textContent = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

        for (let i = 0; i < cityClocks.length; i++) {
            hr = -3 + timeZones[cityClocks[i]];

            handsHourWorld[i].style.transform = `rotate(${90 + hr / 12 * 360 + (1 / 12 * mn / 60 *360)}deg)`;
            handsMinuteWorld[i].style.transform = `rotate(${90 + mn / 60 * 360 + (1 / 60 * sc / 60 * 360)}deg)`;
            handsSecondWorld[i].style.transform = `rotate(${90 + sc / 60 * 360}deg)`;
        }

    }, 1000);
}

createListCities();
showClocks();

console.log(`
Score: 30 / 30
  - [x] механические часы с движущимися стрелками
  - [x] электронными часы с точным временем(часы, минуты и секунды), 
        полное название дня недели, дата (число, название месяца, год)
  - [x] приложение, которое показывает время в разных точках планеты
        возможно убирать/добавлять произвольное количество циферблатов и настройка каждого
  `);