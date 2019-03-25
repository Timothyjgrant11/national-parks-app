const apiKey = 'As6CAPSV8yCUHyJnzYOBfAnk8VAMtFnA0UkUEPD9'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function getParks(query, maxResults) {
    const params = {
        api_key: apiKey,
        stateCode: query,
        part: 'snippit',
        limit: maxResults
    };
    
    const queryString = formatQueryParams(params);
    const url = searchURL + "?" + queryString;
    
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        } throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
          });
}

function displayResults(responseJson){
    console.log(responseJson);
    $('#results').empty();
    
    for (let i=0; i < responseJson.data.length; i++) {
    $('#results').append(
    `<h2>${responseJson.data[i].fullName}</h2>
    <p>${responseJson.data[i].description}</p>
    <a href="${responseJson.data[i].url}">Link</a>`)};
    
    $('#results').removeClass('hidden');
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let stateInput = $('#userInput').val();
        let maxNumber = $('#numberInput').val();
        console.log(stateInput);
        console.log(maxNumber);
        getParks(stateInput, maxNumber - 1);
    });
}

$(watchForm);