var searchSubmitButtonE1 = $("#searchSubmitButton"); // used within searchbarID Div
var citySearchHistoryE1 = $("#citySearchHistory"); 

var searchInputE1 = $("#searchInput");


searchSubmitButtonE1.on("click", function(event) {
    event.preventDefault();

    var TestMe = event.target.value;1
    console.log("test me " + TestMe);

    var searchTypeIn = document.getElementById("searchInput").value;
    console.log("what is the text input? " + searchTypeIn);


})




$("#citySearchHistory .searchHistoryCityBlock").val(localStorage.getItem("recentCitySearch1")); //calls the local storage
// $(DivContainer  theChild).val(localStorage.getItem("lineID where it was saved")) 


// Debug section 
var recentCitySearch1E1 = $("#recentCitySearch1");
recentCitySearch1E1.text("Seattle, WA Testing 1");
 











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



/*


searchSubmitButtonE1.on("click", function(event) {
    event.preventDefault();

    var TestMe = event.target;

    console.log("searchSubmitButton has been clicked");
    console.log("Test me is " + TestMe);

    var saveText = $(this).find(".searchHistoryCityBlock").val(); // what we are storing
    var searchHistoryBlock = $(this).parent().attr("id");  // what we are storing to


    console.log("The save text is " + saveText);

    localStorage.setItem(searchHistoryBlock, saveText); 
 // localStorage.setItem(what you're storing to, what you are actually storing)

})


*/ 
