// Resources

// https://www.mediawiki.org/wiki/API:Cross-site_requests
// https://friends.fandom.com/api.php?action=parse&pageid=1627&wrapoutputclass&format=json
// https://friends.fandom.com/api.php?action=query&list=search&srsearch=abstain&format=json
// https://www.mediawiki.org/w/api.php?action=help&modules=main
// url1: https://friends.fandom.com/api.php?action=opensearch&search=joey&format=json&origin=*

// fetch(url).then(res =>
//   res.json()).then(d => {
//     console.log(d);
//   });

window.onload = function () {

  document.getElementById('btn01').addEventListener("click", fetchMovies);

  //

  // Get the input field
  var input = document.getElementById("querykey");

  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("btn01").click();
    }
  });
}



const url = ['https://friends.fandom.com/',
  'https://how-i-met-your-mother.fandom.com/',
  'https://theoffice.fandom.com/',
  'https://bigbangtheory.fandom.com/',
  'https://batman.fandom.com/',
  'https://harrypotter.fandom.com/',
  'https://breakingbad.fandom.com/',
  'https://gameofthrones.fandom.com/'
];

const series = ['Friends', 'H.I.M.Y.M', 'The Office (US)', 'The Big Bang Theory',
  'Batman', 'Harry Potter', 'Breaking Bad', 'G.O.T'];

var title;
var link;
var countWords = 0;
var html = '';

async function fetchMovies() {

  const key = document.getElementById('querykey').value;

  html = '';
  document.getElementById('result').innerHTML = null;

  for (i = 0; i < 8; i++) {

    const response = await fetch(url[i] + 'api.php?action=opensearch&search=' + key + '&format=json&origin=*').then(res =>
      res.json()).then(d => {
        console.log(d);

        title = d[1];
        link = d[3];
      });

    console.log(title);
    console.log(link);
    // console.log(len);

    len = title.length;

    // len == 0 ? alert(series[i] + ' no data'): null;

    html += `<p class="text-white">${series[i]}</p>`;
    for (j = 0; j < len; j++) {
      // console.log(title[j] + link[j]);

      // Regex the link
      // Fetch the title
      // Call the new API with title and fetch the html
      // search HTML for the word and count it
      // display the count next to the result in UI

      var input = link[j];
      var wiki = input.split('wiki/');

      // console.log(wiki + 'line 89');

      // always find ways to add 'await'. #life Tip#
    
      await fetch(wiki[0] + 'api.php?action=query&prop=revisions&titles='+ wiki[1] +'&rvprop=content&format=json&origin=*')
      .then(response => response.text())
      .then((data) => {
        // console.log(data);
    
        lowCaseData = data.toLowerCase();
    
        // var count = (lowCaseData.match(/apothecary/g) || []).length;

        // var word = 'acrimony';
        var word = document.getElementById('querykey').value.toLowerCase();
        var reGex = new RegExp(word, 'g');
        var count = (lowCaseData.match(reGex) || []).length;

        //

        console.log(count);
        countWords =count;
      });

      // end of the new feature

      html += `
        <div class="card my-2 py-0">
          <div class="card-body d-flex justify-content-between py-1">
              <h6 class="card-title my-auto col-md-6">${title[j]}</h6>
              <div class="col-md-2"></div>
              <h6 class="card-title my-auto col-md-2">${'~(' + countWords + ')'}</h6>
              <a href="${link[j]}" target="_blank" class="btn btn-primary p-2 col-md-1">Link</a>
            </div>
          </div>`;
    } // end of for loop

    document.getElementById('result').innerHTML += html;

    html = '';
    title = '';
    link = '';

  } // end of for loop

  //toast

  function toastCall(){

    var options = {
      animation: true,
      delay: 2000
    };

    var ToastHTML = document.getElementById('liveToast');
    var ToastEle = new bootstrap.Toast(ToastHTML, options);

    ToastEle.show();

  }

  toastCall();
  
}

// updateCount = (val) => {
//   countWords = 100;
// }

// fetchMovies();
// console.log('bye');