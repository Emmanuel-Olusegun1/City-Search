const endpoint = 'https://gist.githubusercontent.com/miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(response => response.json())
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function numbersWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const suggestions = document.querySelector('.suggestions');

    if (!this.value) {
        suggestions.innerHTML = "";
        suggestions.style.opacity = 0;
        return;
    }

    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="text-blue-400 font-semibold">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="text-blue-400 font-semibold">${this.value}</span>`);

        return `
        <li class="p-3 border-b border-white/20 last:border-none hover:bg-white/20 transition-all rounded-md cursor-pointer">
            <span class="text-lg">${cityName}, ${stateName}</span>
            <span class="block text-sm text-gray-300">Population: ${numbersWithCommas(place.population)}</span>
        </li>
        `;
    }).join('');

    suggestions.innerHTML = html || `<li class="p-3 text-gray-300">No matches found...</li>`;
    suggestions.style.opacity = 1;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('input', displayMatches);
