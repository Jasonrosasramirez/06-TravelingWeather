

//                  Project is incomplete. Still working on this 


/* --+--                                      -- Global Variables --                                      --+-- */


var citySearchBoxText; // will be used to store the search bar input. Probably the most valuable variable.

var searchSubmitButtonE1 = $("#searchSubmitButton"); // used within searchbarID Div. Links to the submit button. 
var recentCitySearch1E1 = $("#recentCitySearch1"); // displays under the recent search history


/* --+--                                      -- Essential Functions --                                      --+-- */


searchSubmitButtonE1.on("click", function(event) { // This begins the whole chain of events :) 
    // Once the search button is clicked, the search is displayed on the search history. Pressing enter on the seach bar also counts as a button press. 
    
    event.preventDefault();

    citySearchBoxText = document.getElementById("searchInput").value; // Text we want stored. using .value because it is an input. Variable was originally defined here instead of globally
    recentCitySearch1E1.text(citySearchBoxText); // Displays CitySearchBoxText on screen. .text is a jquerry method  
    localStorage.setItem("searchInputStorage", citySearchBoxText); //localStorage.setItem(what you're storing to, what you are actually storing)
  
    populateSearchHistory(); // manages local storage and makes search history appear
    getForecast(); // access the server side API

})  

$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage")); //$(where is this displayed to).text(localStorage.getItem(where it was saved to using setItem));


function populateSearchHistory() {
    // Triggered by search button click. 
    
    // This will become its own function at one point to make modular search boxes. 
    var searchHistoryContainer1E1 = document.getElementById("searchHistoryContainer1"); // will have to remake this to make it more modular
    searchHistoryContainer1E1.removeAttribute("class") // removes .disapear which makes search item appear on screen
    searchHistoryContainer1E1.setAttribute("class", "searchHistoryCityBlock");
} // circle back to me. Please :3


function getForecast() {
    // triggered by search button click. 

    console.log("The search input carries over " + citySearchBoxText); // citySearchBoxText does carry over

    // variables to store current day variables. Within scope of this function block.
    var tempOfToday;
    var humidityofToday; 
    var windSpeedofToday;
    var UVindexofToday; 
    
    // fetch infomration using the weather API 



    // Access the DOM for Current day forecast
    var temperatureDisplayE1 = document.getElementById("temperatureDisplay"); // Verified. Works outside of function
    var humidityDisplayE1 =  document.getElementById("humidityDisplay");
    var windSpeedDisplayE1 =  document.getElementById("windSpeedDisplay");
    var UVindexDisplayE1 =  document.getElementById("UVindexDisplay");

    // Updates display based on weather search
    temperatureDisplayE1.textContent = "90.9 F"; // These are all variable. Will eventually be updated by fetch section
    humidityDisplayE1.textContent = "41 % " ; // humidityofToday
    windSpeedDisplayE1.textContent = "4.7" + " MPH";
    UVindexDisplayE1.textContent = "9.49 "; // UVindexofToday
    
    //something to convert UV index into a number and give it a color class depending on index

}









/* Basic ajax structure

$.ajax({
    // Used in asynchronous (continious updating) operations with weather application
    url: google.com, 
    success: function (result) {
        console.log("Hello! Ajax function has been accessed");
    }
})

*/ 



/* basic fetch request structure. In case there is an error of some kind

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



