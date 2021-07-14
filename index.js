// variables
const url = 'https://api.jikan.moe/v3';

// elements
const searchInput = document.getElementById('search-input');
const animeListDiv = document.getElementById('anime-list');

// logic
const getAnimeByTerm = async (term) => {
    const response = await fetch(`${url}/search/anime?q=${encodeURI(term)}`);
    const { results } = await response.json();
    return results;
}

const showAnimes = ({ image_url, title, synopsis }) => {
    const div = document.createElement('div');
    div.classList.add('col')
    const structure = `
            <div class="card">
                <img src="${image_url}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${synopsis}</p>
                </div>
            </div>
    `;
    div.innerHTML = structure;
    animeListDiv.append(div);
}

// events
searchInput.addEventListener('keyup', ({ target }) => {
    const { value } = target;
    animeListDiv.innerHTML = '';
    getAnimeByTerm(value).then(response => {
        if (response instanceof Array) {
            response.map(anime => showAnimes(anime))
        }
    }).catch(err => {
        console.log('Error', err);
    });
});
