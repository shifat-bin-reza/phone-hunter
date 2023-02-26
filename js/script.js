// Search data
const searchElements = (dataLimit) => {
    // Start spinner
    toggleSpinner(true);
    const searchItem = document.getElementById('search-item').value;
    loadPhoneData(searchItem, dataLimit);
}

// Search results on for 10 data
document.getElementById('btn-search').addEventListener('click', function () {
    searchElements(10);
})

// Search results for all data
document.getElementById('btn-showall').addEventListener('click', function () {
    searchElements();
})

// Enter key functionality
document.getElementById('search-item').addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        searchElements(10);
    }
})

// Spinner for data loading
const toggleSpinner = isLoading => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('d-none');
    } else {
        loadingSpinner.classList.add('d-none');
    }
}

// Load phone data
const loadPhoneData = async (searchItem, dataLimit) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchItem}`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data, dataLimit);
}

// Display all the cards
const displayData = (phones, dataLimit) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    // Display data limit
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }

    // Display no match result
    const noMatch = document.getElementById('no-match');
    if (phones.length === 0) {
        noMatch.classList.remove('d-none');
    } else {
        noMatch.classList.add('d-none');
    }

    phones.forEach(phone => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `
        cardContainer.appendChild(newDiv);
    })
    // Stop spinner
    toggleSpinner(false);
}