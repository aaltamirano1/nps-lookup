const KEY = "nKPOK2qiAUIWx5A3E9cCXu9LZeUL4dfBqNkr9V0S";

function generateResultHtml(result){
  return `
      <h1>${result.fullName}</h1>
      <p>${result.description}</p>
      <a href="${result.url}" target="_blank">More information</a>
      <hr>
    `;
}

function displayResults(data){
  data.forEach(function(result){
    var html = generateResultHtml(result);
    $('#results').append(html);
  });
}

function getParks(url){
  fetch(url)
    .then(res=>{
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(resJson=>displayResults(resJson.data))
    .catch(err=> {
      alert(`Something went wrong: ${err.message}`);
    });
}

function generateUrl(state, searchTerm, number){
  if(state!=='All'){
    return `https://developer.nps.gov/api/v1/parks?stateCode=${state}&q=${searchTerm}&limit=${number}&api_key=${KEY}`;
  }
  return `https://developer.nps.gov/api/v1/parks?q=${searchTerm}&limit=${number}&api_key=${KEY}`;
}

function watchForm(){
  $('form').submit(function(e){
    e.preventDefault();
    $('#results').empty();

    var state = $('select').val();
    var searchTerm = $('#search-input').val();
    var number = $('#number-input').val()-1;

    var url = generateUrl(state, searchTerm, number);
    getParks(url);
  })
}

$(watchForm);