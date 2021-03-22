var searchSubmitButtonE1 = $("#searchSubmitButton"); // used within searchbarID Div
var citySearchHistoryE1 = $("#citySearchHistory"); 
var recentCitySearch1E1 = $("#recentCitySearch1");




searchSubmitButtonE1.on("click", function(event) {
    event.preventDefault();

    // What is being typed into the search box. Will eventially be a drop down list
    var citySearchBoxText = document.getElementById("searchInput").value; // Text we want stored. 
    var citySearchBoxSave = recentCitySearch1E1.text(citySearchBoxText); // Where we are storing it to.  
    citySearchBoxSave; // Displays CitySearchBoxText on screen.

    console.log(citySearchBoxText + " | Was typed into the search box"); // delete me when no longer needed :) 
    
    localStorage.setItem(citySearchBoxSave, citySearchBoxText); 
 // localStorage.setItem(what you're storing to, what you are actually storing)
  

})

var localStorageContainer = $("#recentCitySearch1").val(localStorage.getItem("searchInput"));
localStorageContainer;



// recentCitySearch1
// $("#citySearchHistory .searchHistoryCityBlock").val(localStorage.getItem("recentCitySearch1")); //calls the local storage
// $(DivContainer  theChild).val(localStorage.getItem("lineID where it was saved")) 





 








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



