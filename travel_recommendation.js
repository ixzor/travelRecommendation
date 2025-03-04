const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnReset');
function searchCondition() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.style.visibility = 'visible';
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
        const place = Object.entries(data).find(([item, value]) => item.toLowerCase().includes(input.toLowerCase().slice(0, -2)));


        if (place) {
            console.log(place[1][0].imageUrl);
            if (place[0] == 'beaches' || place[0] == 'temples') {
                
                for (var i = 0; i < place[1].length; i++) {
                    resultDiv.innerHTML += `<div class="searchRes"></div>`;
                    resultDiv.innerHTML += `<img src="${place[1][i].imageUrl}" alt="hjh" class="image">`;
                    resultDiv.innerHTML += `<h2 class="searchNames">${place[1][i].name}</h2>`;
                    resultDiv.innerHTML += `<p class="searchText"><strong>${place[1][i].description}</p>`;
                }
            }
            if (place[0] == 'countries') {
                
                for (var i = 0; i < place[1].length; i++) {
                    for (var j = 0; j < place[1][i].cities.length; j++){
                    resultDiv.innerHTML += `<div class="searchRes"></div>`;
                    resultDiv.innerHTML += `<img src="${place[1][i].cities[j].imageUrl}" alt="hjh" class="image">`;
                    resultDiv.innerHTML += `<h2 class="searchNames">${place[1][i].cities[j].name}</h2>`;
                    resultDiv.innerHTML += `<p class="searchText"><strong>${place[1][i].cities[j].description}</p>`;
                    }
                }
            }
        } else {
            resultDiv.innerHTML = 'Place not found.';
        }
        })
        .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
    }
    btnSearch.addEventListener('click', searchCondition);



function clearSearch() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.style.visibility = 'hidden';
    const input = document.getElementById('searchInput').value = '';
}

btnClear.addEventListener('click', clearSearch);

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Stop the form from submitting to a server

        // Clear the form inputs
        form.reset();
    });
});