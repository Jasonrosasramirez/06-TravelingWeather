var searchSubmitButtonE1 = $("#searchSubmitButton"); // used within searchbarID Div. Links to the submit button. 
var recentCitySearch1E1 = $("#recentCitySearch1"); // displays under the recent search history



searchSubmitButtonE1.on("click", function(event) {
    // Once the search button is clicked, the search is displayed on the search history. Pressing enter on the seach bar also counts as a button press. 
    event.preventDefault();

    var citySearchBoxText = document.getElementById("searchInput").value; // Text we want stored. using .value because it is an input.   
    recentCitySearch1E1.text(citySearchBoxText); // Displays CitySearchBoxText on screen. .text is a jquerry method
    
    localStorage.setItem("searchInputStorage", citySearchBoxText); 
  //localStorage.setItem(what you're storing to, what you are actually storing)

// circle back to complete items appearing and dissapearing. Using add and remove attribute for .dissapear.
})

$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage")); //$(where is this displayed to).text(localStorage.getItem(where it was saved to using setItem));








/* Basic ajax structure

$.ajax({
    // Used in asynchronous (continious updating) operations with weather application
    url: google.com, 
    success: function (result) {
        console.log("Hello! Ajax function has been accessed");
    }
})

*/ 



/* basic fetch request structure 

var badRequestURL = "";
var responseText = document.getElementById("responseText"); to be made

function getAPI(requestURL) {
    fetch(requestURL)
        .then(function (response) {
            console.log(response.status);

            if (response.status !== 200) {
                responseText.textContent = response.status;
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

getAPI(badRequestURL);

*/



