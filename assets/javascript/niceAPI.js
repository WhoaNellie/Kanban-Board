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

    
function getGif() {

    let queryURL = "https://api.giphy.com/v1/gifs/random?tag=" +
        "congrats" + "&api_key=lJvM8CYrpxziVxv5vy11SIH5QRxU7OU8" + "&limit=1";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //Trigger Modal
        $("#new-modal").attr("src", response.data.images.original.url);
        $("#myModal").attr("style", "display : block;");
        
        //When user clicks (x), the modal closes
        $(".close").on("click", function () {
            $("#myModal").attr("style", "display : none;");
        });
        
        //When user clicks anywhere outside the modal, it closes
        $(document).on("click", function() {
            if (event.target == myModal) {
                $("#myModal").attr("style", "display : none;");
            }
        });
    });
}



