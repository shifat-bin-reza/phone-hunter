// Load phone data
const loadPhoneData = async (searchItem) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchItem}`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data);
}


// Search results
document.getElementById('btn-search').addEventListener('click', function () {
    const searchItem = document.getElementById('search-item').value;
    loadPhoneData(searchItem);
})

// Display all the cards
const displayData = phones => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    const showAll = document.getElementById('show-all');
    if (phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
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
}