$(document).ready(function () {

    // funny quotes
    let queryFunny = 'http://quotes.rest/qod.json?category=funny';

    $.ajax ({
        url: queryFunny,
        method: 'GET'
    }).then(function(response){
        let quote = response.contents.quotes[0].quote;
        let author = response.contents.quotes[0].author;
    
        $('#quoteArea').html(quote);
        $('#quoteAuthor').html(author);
    });


    // adding event listener to button to make new kanban cards
    let cardNum = 0; // keeping track of the number of kanban cards
    $("#newCard").on("click", function () {
        // adding class for styling
        let card = $("<div>").attr({
            class: "card"
        });
        //input for adding text to note, data attr for local storage
        let input = $("<input>").attr({
            type: "text",
            "data-num": cardNum
        });
        // making radio buttons for task state
        // div to add radio buttons for organization
        let radioDiv = $("<div>");
        let toDo = $("<input>").attr({
            type: "radio",
            name: "progress",
            value: "toDo",
            "data-id": "toDo" + cardNum
        });
        // adding labels to buttons
        let toDoLabel = $("<label>").attr({
            for: "toDo" + cardNum
        })
        toDoLabel.text("To Do");
        let inProg = $("<input>").attr({
            type: "radio",
            name: "progress",
            value: "inProg",
            "data-id": "inProg" + cardNum
        });
        let inProgLabel = $("<label>").attr({
            for: "toDo" + cardNum
        })
        inProgLabel.text("In Progress");
        let done = $("<input>").attr({
            type: "radio",
            name: "progress",
            value: "done",
            id: "complete",
            "data-id": "done" + cardNum
        });
        //Populate random gif when radio button "done" with card
        done.on("click", function () {
            let queryURL = "https://api.giphy.com/v1/gifs/random?tag=" +
                "sassy" + "&api_key=lJvM8CYrpxziVxv5vy11SIH5QRxU7OU8" + "&limit=1";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                let results = response.data;
                console.log(results.length);
                //Trigger Modal
                $("#myBtn").on("click");
                myModal.style.display = "block";
                $("#new-modal").attr("src", response.data.images.original.url);
                console.log(response.data.url);
                //When user clicks (x), the modal closes
                $(".close").on("click", function () {
                    console.log('heyyyyy');
                    myModal.style.display = "none";
                });
                //When user clicks anywhere outside the modal, it closes
                window.onclick = function (event) {
                    if (event.target == myModal) {
                        console.log("hello")
                        myModal.style.display = "none";
                    }
                };
            });
        });
        let doneLabel = $("<label>").attr({
            for: "done" + cardNum
        })
        doneLabel.text("Done");
        // appending everything
        card.append(radioDiv);
        card.append(input);
        radioDiv.append(toDo);
        radioDiv.append(toDoLabel);
        radioDiv.append(inProg);
        radioDiv.append(inProgLabel);
        radioDiv.append(done);
        radioDiv.append(doneLabel);
        $("#cards").append(card);
        cardNum++;
    });
    // add event listener for enter
    // add stuff to local storage
    // array of cards with text and progress saved
});

//Run this when page loads
$(document).ready(function () {
    console.log("hi");
    //Populate random gif when radio button "done" selected
    $("#complete").on("click", function () {
        let queryURL = "https://api.giphy.com/v1/gifs/random?tag=" +
            "sassy" + "&api_key=lJvM8CYrpxziVxv5vy11SIH5QRxU7OU8" + "&limit=1";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let results = response.data;
            console.log(results.length);
            $("#new-modal").attr("src", response.data.images.original.url);
            console.log(response.data.url);
        });
    });
});