
//var citySearchBoxText; // will be used to store the search bar input. Probably the most valuable variable.

var searchSubmitButtonE1 = $("#searchSubmitButton"); // used within searchbarID Div. Links to the submit button. 
var recentCitySearch1E1 = $("#recentCitySearch1"); // displays under the recent search history

var APIkey = "22892ae50b03ea6718c5ea35fb5bc1f5"; // my personal API key for open weather


/* --+--                                      -- Essential Functions --                                      --+-- */


searchSubmitButtonE1.on("click", function(event) { // This begins the whole chain of events :) 
    // Once the search button is clicked, the search is displayed on the search history. Pressing enter on the seach bar also counts as a button press. 
    
    event.preventDefault();

    var citySearchBoxText = document.getElementById("searchInput").value; // Text we want stored. using .value because it is an input. Variable was originally defined here instead of globally
    recentCitySearch1E1.text(citySearchBoxText); // Displays CitySearchBoxText on screen. .text is a jquerry method  
    localStorage.setItem("searchInputStorage", citySearchBoxText); //localStorage.setItem(what you're storing to, what you are actually storing)
  

    displayCityAndDate(citySearchBoxText);
    //populateSearchHistory(); // manages local storage and makes search history appear
    getForecast(citySearchBoxText); // access the server side API. passes on the citySearchBoxText as the parameters to other functions. 
})  

function displayCityAndDate(city) {
    // triggered by search button click.

    console.log("display city " + city + "what is the date" + dateToday);

    var dateToday = moment().format("MMM DD, YYYY");
    cityNameE1 = document.getElementById("cityName");
    cityNameE1.textContent = city + "("+ dateToday + ")__";
}

function populateSearchHistory() {
    // Triggered by search button click. 
    
    // This will become its own function at one point to make modular search boxes. 
    var searchHistoryContainer1E1 = document.getElementById("searchHistoryContainer1"); // will have to remake this to make it more modular
    searchHistoryContainer1E1.removeAttribute("class") // removes .disapear which makes search item appear on screen
    searchHistoryContainer1E1.setAttribute("class", "searchHistoryCityBlock");
} // circle back to me. Please :3


function getForecast(city) {
    // triggered by search button click. citySearchBoxText is carried over as the city parameter 

    $.ajax({ // Used in asynchronous (continious updating) operations with weather application
        
        type: "GET", // read information 
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey + "&units=imperial", // the API being used. citySearchBoxText from submitSearchFunctionE1 as city. My API key. Setting the units to imperial   
        dataType: "json", // return in this formating  
        
        success: function (result) { // if the above was successful 
            console.log(result); // print out the data as a json
            
            getUVindex(result.coord.lat, result.coord.lon);
            fiveDayForecast(city);
        }
        
    })
    
    // variables to store current day variables. Within scope of this function block. but not within sub functions. May need to make this global
    var tempOfToday;
    var humidityofToday; 
    var windSpeedofToday;
    var UVindexofToday; 
    
    // fetch infomration using the weather API 


/* 

// Access the DOM for Current day forecast
    var temperatureDisplayE1 = document.getElementById("temperatureDisplay"); // Verified. Works outside of function
    var humidityDisplayE1 =  document.getElementById("humidityDisplay");
    var windSpeedDisplayE1 =  document.getElementById("windSpeedDisplay");
    var UVindexDisplayE1 =  document.getElementById("UVindexDisplay");

    // Updates display based on weather search. Currently using place holders
    temperatureDisplayE1.textContent = "90.9 F"; // These are all variable. Will eventually be updated by fetch section
    humidityDisplayE1.textContent = "41 % " ; // humidityofToday
    windSpeedDisplayE1.textContent = "4.7" + " MPH";
    UVindexDisplayE1.textContent = "9.49 "; // UVindexofToday
    
    //UVindexColor();
    //something to convert UV index into a number and give it a color class depending on index


*/
}


function fiveDayForecast(city) {

    $.ajax({
        // Used in asynchronous (continious updating) operations with weather application
        type: "GET", // read information 
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=imperial", 
        dataType: "json", // in this formating  
        success: function (result) {
            console.log(result);
        }
    })  
}



function getUVindex(lat, lon) {
    // scope issues with UVindexofToday. 

    $.ajax({
        // Used in asynchronous (continious updating) operations with weather application
        type: "GET", // read information 
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey, 
        dataType: "json", // in this formating  
        success: function (result) {
            
            console.log("UV Index is " + result.value);
        }
    })

}






/* --+--                                      -- Local Storage --                                      --+-- */

// Search History
$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage")); //$(where is this displayed to).text(localStorage.getItem(where it was saved to using setItem));









