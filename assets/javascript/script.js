$(document).ready(function () {

    // checking for values in local storage and initializing if none
    let cardNum;
    if (localStorage.getItem("cardNum")) {
        cardNum = localStorage.getItem("cardNum");
        console.log("nums in storage");
    } else {
        cardNum = 0;
    }

    let taskArr;
    if (localStorage.getItem("tasks")) {
        taskArr = JSON.parse(localStorage.getItem("tasks"));
        console.log(taskArr);
        console.log("tasks in storage");
    } else {
        taskArr = [];
    }

    let stateArr;
    if (localStorage.getItem("states")) {
        stateArr = JSON.parse(localStorage.getItem("states"));
        console.log(stateArr);
        console.log("states in storage");
    } else {
        stateArr = [];
    }

    //populates previously made cards
    if (stateArr.length > 0 || taskArr.length) {
        console.log("old cards");
        for (let i = 0; i < stateArr.length; i++) {
            genCards(stateArr[i], i);
        }
    }

    // adding event listener to button to make new kanban card
    $(document).on("click", ".newCard", function () {
        genCards($(this).attr("data-state"), cardNum);
        console.log($(this).attr("data-state"));

        // not DRY but whatever
        if (stateArr[cardNum]) {
            stateArr[cardNum] = $(this).attr("data-state");
        } else {
            stateArr.push($(this).attr("data-state"));
        }

        localStorage.setItem("states", JSON.stringify(stateArr));

        cardNum++;
        localStorage.setItem("cardNum", cardNum);
    });

    // event listener for changes in card text
    $(document).on("blur", ".task", saveTask);

    //enter causes blur
    $(document).on("keypress", ".task", function(event){
        if(event.which == 13){
            $(this).blur();
            saveTask();
        }
    });

    // make cards save before page refresh

    // event listener for changes in card state
    $(document).on("click", ".state", changeState);

    function genCards(cardState, num) {
        console.log(cardState + num);

        stateArr[num] = cardState;
        // adding class for styling
        let card = $("<div>").attr({
            class: "card",
            "data-id": num
        });

        //input for adding text to note, data attr for local storage
        let input = $("<input>").attr({
            type: "text",
            class: "task",
            "data-id": num
        });

        if (taskArr[num]) {
            input.attr("value", taskArr[num]);
        }

        let toDo;
        let inProg;
        let done = null;

        let stateDiv = $("<div>");

        if (cardState == "toDo") {

            inProg = $("<button>").attr({
                class: "state",
                id: "inProg" + num
            });

            stateDiv.append(inProg);

            done = $("<button>").attr({
                class: "state",
                id: "done" + num
            });

            stateDiv.append(done);

            $(".toDo").append(card);

            inProg.text("In Progress");
            done.text("Done");

        } else if (cardState == "inProg") {
            toDo = $("<button>").attr({
                class: "state",
                id: "toDo" + num
            });

            stateDiv.append(toDo);

            done = $("<button>").attr({
                class: "state",
                id: "done" + num
            });

            stateDiv.append(done);

            $(".inProg").append(card);

            toDo.text("To Do");
            done.text("Done");

        } else if (cardState == "done") {
            toDo = $("<button>").attr({

                class: "state",
                id: "toDo" + num
            });

            stateDiv.append(toDo);

            inProg = $("<button>").attr({
                class: "state",
                id: "inProg" + num
            });

            stateDiv.append(inProg);

            $(".done").append(card);

            toDo.text("To Do");
            inProg.text("In Progress");
        } else {
            console.log("whoops");
        }

        if(done != null){
            done.on("click", function () {
    
                let queryURL = "https://api.giphy.com/v1/gifs/random?tag=" +
                    "congrats" + "&api_key=lJvM8CYrpxziVxv5vy11SIH5QRxU7OU8" + "&limit=1";

        
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    let results = response.data; 
                    console.log(results.length);
                    $("#modal-1").attr("checked",true);
                        
                        $("#new-modal").attr("src", response.data.images.original.url);
                        console.log(response.data.url);
        
                });
        
            });
        }

        card.append(stateDiv);
        card.append(input);


    }


    function saveTask() {
        console.log("save task");
        console.log($(this).val());
        console.log($(this).attr("data-id"));

        // pushing a new index/value if this is a new card, else updating the old card's value
        if (taskArr[$(this).attr("data-id")]) {
            taskArr[$(this).attr("data-id")] = $(this).val();
        } else {
            taskArr.push($(this).val());
        }

        localStorage.setItem("tasks", JSON.stringify(taskArr));

    }

    function changeState() {
        console.log("save state");
        console.log($(this).prop("nodeName"));
        console.log($(this).parent().parent().attr("data-id"));

        $(this).parent().parent().attr("state", $(this).attr("value"));

        if (stateArr[$(this).parent().parent().attr("data-id")]) {
            stateArr[$(this).parent().parent().attr("data-id")] = $(this).attr("value");
        } else {
            stateArr.push($(this).attr("value"));
        }

        // convert JSON to jquery? might cause problems at some point. getJSON()
        localStorage.setItem("states", JSON.stringify(stateArr));
    }

    //add a way to delete cards

});