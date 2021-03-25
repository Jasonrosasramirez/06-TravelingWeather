

var searchSubmitButtonE1 = $("#searchSubmitButton"); // used within searchbarID Div. Links to the submit button. 
var recentCitySearch1E1 = $("#recentCitySearch1"); // displays under the recent search history

var dayIndex = 1;

var APIkey = "22892ae50b03ea6718c5ea35fb5bc1f5"; // my personal API key for open weather


// weather condition icon variables. Icons referenced from font awesome. 

var weatherClearSkyIcon = "fas fa-dove"; // using a dove to show clear skies
var weatherFewCloudsIcon = "fas fa-cloud"; // single cloud
var weatherScatteredCloudsIcon = "fas fa-cloud-meatball"; // using the cloud meatball 
var weatherBrokenCloudsIcon = "fas fa-cloud-meatball"; // same icon as scattered clouds
var weatherShowerRainIcon = "fas fa-cloud-showers-heavy"; // used the heavy showers icon 
var weatherRainIcon = "fas fa-cloud-rain"; // using the cloud rain icon 
var weatherThunderstormIcon = "fas fa-bolt"; // using bolt icon
var weatherSnowIcon = "fas fa-snowflake"; // using snowflake icon
var weatherMistIcon = "fas fa-smog"; // using the smog icon. This was the closest match




/* --+--                                      -- Essential Functions --                                      --+-- */


searchSubmitButtonE1.on("click", function(event) { // This begins the whole chain of events :) 
    // Once the search button is clicked, the search is displayed on the search history. Pressing enter on the seach bar also counts as a button press. 
    
    event.preventDefault();

    var citySearchBoxText = document.getElementById("searchInput").value; // Text we want stored. using .value because it is an input. Variable was originally defined here instead of globally
    recentCitySearch1E1.text(citySearchBoxText); // Displays CitySearchBoxText on screen. .text is a jquerry method  
    localStorage.setItem("searchInputStorage", citySearchBoxText); //localStorage.setItem(what you're storing to, what you are actually storing)
  

    displayCityAndDate(citySearchBoxText);
    getForecast(citySearchBoxText); // access the server side API. passes on the citySearchBoxText as the parameters to other functions. 
    getFiveDayForecast(citySearchBoxText); // passes the city name. Triggers the five day forecast. 
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
            
            forecastDisplay(result.main.temp, result.main.humidity, result.wind.speed, result.weather[0].description); // triggers the display forecast within this main loop

            getUVindex(result.coord.lat, result.coord.lon); // passes the city latitude and longitude 
        }
        
    })
    
    function forecastDisplay(temperature, humidity, windSpeed, weather) {
        // carries information from json results over. triggered by the AJAX call above.  

        // access the DOM for each display below 
        var temperatureDisplayE1 = document.getElementById("temperatureDisplay");
        var humidityDisplayE1 =  document.getElementById("humidityDisplay");
        var windSpeedDisplayE1 =  document.getElementById("windSpeedDisplay");
        
        // displays the ajax json results on screen below 
        temperatureDisplayE1.textContent = temperature + " F"; 
        humidityDisplayE1.textContent = humidity + " %"; 
        windSpeedDisplayE1.textContent = windSpeed + " MPH";

        //weather icon section. I maight make this its own function 
        var todayWeatherIconStatusE1 = document.getElementById("todayWeatherIconStatus"); 
        var todayWeatherIconE1 = document.getElementById("todayWeatherIcon"); // references the spot for the weather icon :) 
        
        todayWeatherIconStatusE1.textContent = weather;

        console.log("what is the weather :) " + weather);

        // determines the weather icon
        if (weather == "clear sky") {
            todayWeatherIconE1.setAttribute("class", weatherClearSkyIcon);
        } 
        else if (weather == "few clouds") {
            todayWeatherIconE1.setAttribute("class", weatherFewCloudsIcon);
        }
        else if (weather == "scattered clouds") {
            todayWeatherIconE1.setAttribute("class", weatherScatteredCloudsIcon);
        }
        else if (weather == "broken clouds") {
            todayWeatherIconE1.setAttribute("class", weatherBrokenCloudsIcon);
        }
        else if (weather == "shower rain") {
            todayWeatherIconE1.setAttribute("class", weatherShowerRainIcon);
        }
        else if (weather == "rain") {
            todayWeatherIconE1.setAttribute("class", weatherRainIcon);
        }
        else if (weather == "thunderstorm") {
            todayWeatherIconE1.setAttribute("class", weatherThunderstormIcon);
        }
        else if (weather == "snow") {
            todayWeatherIconE1.setAttribute("class", weatherSnowIcon);
        }
        else { // it must be mist 
            todayWeatherIconE1.setAttribute("class", weatherMistIcon);
        }

    } // I display today's information on screen :) 

}


function getFiveDayForecast(city) {


    $.ajax({
        // Used in asynchronous (continious updating) operations with weather application
        type: "GET", // read information 
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=imperial", 
        dataType: "json", // in this formating  
        success: function (result) {
            console.log(result);
            fiveDayForecastElementSorting(result);
        }
    })  

    function fiveDayForecastElementSorting(ajaxResult) {
        // carriers over the whole json from the ajax above. It's just easier this way. 
        
        // access the information from the ajax results. Use terminal to view the direct information 
        var day1Index = 3; // This references from the json array.
        var day2Index = 11;
        var day3Index = 19;
        var day4Index = 27;
        var day5Index = 35;
        var dayReferenceIndex;

        // intended to store information about the results 
        var dayTemp;
        var dayHumidity;
        var dayWeather;


        // populates the 5-day forecast
        for (dayIndex; dayIndex < 6; dayIndex += 1) {
            
            // used to index reference the day we need topopulate for the forecast
            if (dayIndex == 1) {
                dayReferenceIndex = day1Index; // 3
            }
            else if (dayIndex == 2) {
                dayReferenceIndex = day2Index; // 11
            }
            else if (dayIndex == 3) {
                dayReferenceIndex = day3Index; // 19
            }
            else if (dayIndex == 4) {
                dayReferenceIndex = day4Index; // 27
            } else {
                // the dayIndex must be at 5
                dayReferenceIndex = day5Index; // 35
            }
            

            dayWeather = ajaxResult.list[dayReferenceIndex].weather[0].description;


            var dayNumber = "day"+dayIndex+"WeatherIcon"; // this access the day forecast by creating dynamic IDs        
            day1IconCheck(dayTemp, dayHumidity, dayWeather, dayNumber, dayIndex); // this adds the icon


            // for debugging 
            console.log("day index is "+dayIndex+" | Temp is " + dayTemp + " | humidity is " + dayHumidity + " | day reference is " + dayReferenceIndex + " | the weather is " + dayWeather); // remove me when finished debugging :) 
        }

    } 


    function day1IconCheck(temp, humidity, weather, dayNumberID, dayIndex) { // can probably make this more modular by adding a second or third parameter :)) 


        var dayWeatherIconE1 = document.getElementById(dayNumberID);

        // determines the weather icon
        if (weather == "clear sky") {
            dayWeatherIconE1.setAttribute("class", weatherClearSkyIcon);
        } 
        else if (weather == "few clouds") {
            dayWeatherIconE1.setAttribute("class", weatherFewCloudsIcon);
        }
        else if (weather == "scattered clouds") {
            dayWeatherIconE1.setAttribute("class", weatherScatteredCloudsIcon);
        }
        else if (weather == "broken clouds") {
            dayWeatherIconE1.setAttribute("class", weatherBrokenCloudsIcon);
        }
        else if (weather == "shower rain" || "light rain") {
            dayWeatherIconE1.setAttribute("class", weatherShowerRainIcon);
        }
        else if (weather == "rain" || "moderate rain") {
            dayWeatherIconE1.setAttribute("class", weatherRainIcon);
        }
        else if (weather == "thunderstorm") {
            dayWeatherIconE1.setAttribute("class", weatherThunderstormIcon);
        }
        else if (weather == "snow") {
            dayWeatherIconE1.setAttribute("class", weatherSnowIcon);
        }
        else { // it must be mist 
            dayWeatherIconE1.setAttribute("class", weatherMistIcon);
        }



    }
}


function getUVindex(latitude, longitude) {
    // scope issues with UVindexofToday. 

    $.ajax({
        
        type: "GET", 
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey, 
        dataType: "json", 
        success: function (result) {
            
            console.log("getUVIndex is " + result.value); // result.value in this case is the UV index
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



/* removing these variables to start fresh :)
    // references the day of the ajax results from above
        //dayTemp = ajaxResult.list[dayReferenceIndex].main.temp;
        //dayHumidity = ajaxResult.list[dayReferenceIndex].main.humidity;

    // display information on screen
        //dayTempDisplayE1.textContent = temp;
        //dayHumidityDisplayE1.textContent = humidity;

    // Access the html DOM
        //var dayTempDisplayE1 = document.getElementById("day"+dayIndex+"TempDisplay");
        //var dayHumidityDisplayE1 = document.getElementById("day"+dayIndex+"HumidityDisplay");
*/








/* working version to day 1 

function fiveDayForecastElementSorting(ajaxResult) {
        // carriers over the whole json from the ajax above. It's just easier this way. 
        
        // access the information from the ajax results
        var day1Index = 11; //  will probably incorp this into a FOR Loop for the future 
        var day1Temp = ajaxResult.list[day1Index].main.temp;
        var day1Humidity = ajaxResult.list[day1Index].main.humidity;
        var day1Weather = ajaxResult.list[day1Index].weather[0].description;
        console.log("day 1 is " + day1Temp + "humidity is " + day1Humidity + " the weather is " + day1Weather); // remove me when finished debugging :) 

        // Access the html DOM
        day1TempDisplayE1 = document.getElementById("day1TempDisplay");
        day1HumidityDisplayE1 = document.getElementById("day1HumidityDisplay");
        day1WeatherIconE1 = document.getElementById("day1WeatherIcon");

        // display information on screen
        day1TempDisplayE1.textContent = day1Temp;
        day1HumidityDisplayE1.textContent = day1Humidity;

        day1IconCheck(day1Weather, "day1WeatherIcon"); // this adds the icon 
    } 



*/



