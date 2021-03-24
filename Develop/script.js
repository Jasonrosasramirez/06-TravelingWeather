
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

    var dateToday = moment().format("MMM DD,YYYY");
    cityNameE1 = document.getElementById("cityName");
    cityNameE1.textContent = city + " ("+ dateToday + ")__";
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
            
            forecastDisplay(result.main.temp, result.main.humidity, result.wind.speed); // triggers the display forecast within this main loop

            getUVindex(result.coord.lat, result.coord.lon); // passes the city latitude and longitude 
        }
        
    })
    
    function forecastDisplay(temperature, humidity, windSpeed) {
        // carries information from json results over. triggered by the AJAX call above.  

        // access the DOM for each display below 
        var temperatureDisplayE1 = document.getElementById("temperatureDisplay");
        var humidityDisplayE1 =  document.getElementById("humidityDisplay");
        var windSpeedDisplayE1 =  document.getElementById("windSpeedDisplay");
        
        // displays the ajax json results on screen below 
        temperatureDisplayE1.textContent = temperature + " F"; 
        humidityDisplayE1.textContent = humidity + " %"; 
        windSpeedDisplayE1.textContent = windSpeed + " MPH";

    } // I display today's information on screen :) 


    getFiveDayForecast(city); // passes the city name. Triggers the five day forecast. 
}


function getFiveDayForecast(city) {

    $.ajax({
        // Used in asynchronous (continious updating) operations with weather application
        type: "GET", // read information 
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=imperial", 
        dataType: "json", // in this formating  
        success: function (result) {
            console.log("five day results");
            console.log(result);
        }
    })  
}



function getUVindex(latitude, longitude) {
    // scope issues with UVindexofToday. 

    $.ajax({
        
        type: "GET", 
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey, 
        dataType: "json", 
        success: function (result) {
            
            console.log("UV Index is " + result.value); // result.value in this case is the UV index
            colorUVindex(result.value); // passes on index value for coloring
        }
    })


    function colorUVindex (UVindexValueofToday) {
        // sets the UV color background color based on index

        var UVindexDisplayE1 =  document.getElementById("UVindexDisplay"); // accesses the DOM
        UVindexDisplayE1.textContent = UVindexValueofToday; // displays UVIndex to screen
        UVindexValueofTodayFloat = parseFloat(UVindexValueofToday); // converts index of today into a float for comparison

        // sets the color index 
        if (UVindexValueofTodayFloat > 5) {
            UVindexDisplay.setAttribute("class", "UVindexSevere"); // severe red
        } 
        else if (UVindexValueofTodayFloat < 3) {
            UVindexDisplay.setAttribute("class", "UVindexFavorable"); // favorable blue
        } else {
            // index is between 3 and 5. 
            UVindexDisplay.setAttribute("class", "UVindexModerate"); // moderate green 
        }

    }

} // all things UV index :) 


/* --+--                                      -- Local Storage --                                      --+-- */

// Search History
$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage")); //$(where is this displayed to).text(localStorage.getItem(where it was saved to using setItem));









