   
function getGif() {

    let queryInspire = 'http://quotes.rest/qod.json?category=inspire';

    $.ajax ({
        url: queryInspire,
        method: 'GET'
    }).then(function(response){
        let quote = response.contents.quotes[0].quote;
        let author = response.contents.quotes[0].author;
    
        $('#quoteArea').html(quote);
        $('#quoteAuthor').html(author);
    });

    let queryURL = "https://api.giphy.com/v1/gifs/random?tag=" +
        "congrats" + "&api_key=lJvM8CYrpxziVxv5vy11SIH5QRxU7OU8" + "&limit=1";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log("get response");
        //Trigger Modal
        $("#new-modal").attr("src", response.data.images.original.url);
        $("#myModal").attr("style", "display : block;");
        
        //When user clicks (x), the modal closes
        $(".close").on("click", function () {
            console.log('heyyyyy');
            $("#myModal").attr("style", "display : none;");
        });
        
        //When user clicks anywhere outside the modal, it closes
        $(document).on("click", function() {
            if (event.target == myModal) {
                console.log("hello")
                $("#myModal").attr("style", "display : none;");
            }
        });
    });
}

//Run this when page loads
// $(document).ready(function () {
//     console.log("hi");
// //Populate random gif when radio button "done" selected
//     $("#complete").on("click", function () {

//         let queryURL = "https://api.giphy.com/v1/gifs/random?tag=" +
//             "congrats" + "&api_key=lJvM8CYrpxziVxv5vy11SIH5QRxU7OU8" + "&limit=1";

//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).then(function (response) {
//             console.log(response);
//             let results = response.data; 
//             console.log(results.length);
                
//                 $("#new-modal").attr("src", response.data.images.original.url);
//                 console.log(response.data.url);

//         });

//     });
// });


