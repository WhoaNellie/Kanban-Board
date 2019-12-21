$(document).ready(function () {

    // checking for values in local storage and initializing if none
    let cardNum;
    if (localStorage.getItem("cardNum")) {
        cardNum = localStorage.getItem("cardNum");
    } else {
        cardNum = 0;
    }

    let taskArr;
    if (localStorage.getItem("tasks")) {
        taskArr = JSON.parse(localStorage.getItem("tasks"));
    } else {
        taskArr = [];
    }

    let stateArr;
    if (localStorage.getItem("states")) {
        stateArr = JSON.parse(localStorage.getItem("states"));
    } else {
        stateArr = [];
    }

    let deleteArr;
    if(localStorage.getItem("deleted")){
        deleteArr = JSON.parse(localStorage.getItem("deleted"));
    } else {
        deleteArr = [];
    }

    //populates previously made cards

    function renewCards(){
        for(let i = 0; i < deleteArr.length; i++){
            if(deleteArr[i] == "visible"){
                genCards(stateArr[i], taskArr[i], i);
            }
        }
    }

    if (stateArr.length > 0) {
        renewCards();
    }

    // adding event listener to button to make new kanban card
    $(document).on("click", ".newCard", function () {
        genCards($(this).attr("data-state"), "", cardNum);

        // not DRY but whatever
        if (stateArr[cardNum]) {
            stateArr[cardNum] = $(this).attr("data-state");
        } else {
            stateArr.push($(this).attr("data-state"));
        }

        localStorage.setItem("states", JSON.stringify(stateArr));
        localStorage.setItem("tasks", JSON.stringify(taskArr));

        cardNum++;
        localStorage.setItem("cardNum", cardNum);
    });

    // event listener for changes in card text
    $(document).on("blur", ".task", saveTask);

    //enter causes blur
    $(document).on("keypress", ".task", function(event){
        if(event.which == 13){
            $(this).blur();
        }
    });
    
    // event listener for changes in card state
    $(document).on("click", ".state", saveState);

    function genCards(cardState, cardTask, num) {

        stateArr[num] = cardState;
        // adding class for styling
        let card = $("<div>").attr({
            class: "card",
            "data-id": num
        });

        // delete card
        let ex = $('<i class="fas fa-times ex"></i>');

        //input for adding text to note, data attr for local storage
        let input = $("<input>").attr({
            type: "text",
            class: "task",
            "data-id": num,
        });

        if(cardTask == ""){
            taskArr[num] = "";
        }else{
            input.attr("value", cardTask);
        }

        let toDo;
        let inProg;
        let done = null;

        let stateDiv = $("<div>");

        if (cardState == "toDo") {

            inProg = $("<button>").attr({
                class: "state",
                "data-id" : "inProg"
            });

            stateDiv.append(inProg);

            done = $("<button>").attr({
                class: "state",
                "data-id" : "done"
            });

            stateDiv.append(done);

            $(".toDo").append(card);

            inProg.text("In Progress");
            done.text("Done");

        } else if (cardState == "inProg") {
            toDo = $("<button>").attr({
                class: "state",
                "data-id" : "toDo"
            });

            stateDiv.append(toDo);

            done = $("<button>").attr({
                class: "state",
                "data-id" : "done"
            });

            stateDiv.append(done);

            $(".inProg").append(card);

            toDo.text("To Do");
            done.text("Done");

        } else if (cardState == "done") {
            toDo = $("<button>").attr({

                class: "state",
                "data-id" : "toDo"
            });

            stateDiv.append(toDo);

            inProg = $("<button>").attr({
                class: "state",
                "data-id" : "inProg"
            });

            stateDiv.append(inProg);

            $(".done").append(card);

            toDo.text("To Do");
            inProg.text("In Progress");
        } else {
            console.log("whoops");
        }

        if(done != null){
            done.on("click", getGif);
        }

        if(!deleteArr[num]){
            deleteArr.push("visible");
        }
        localStorage.setItem("deleted", JSON.stringify(deleteArr));

        card.append(stateDiv);
        card.append(ex);
        card.append(input);

    }

    // delete buttons
    $(document).on("click", ".ex" ,function() {
        $(this).parent().remove();
        deleteArr[$(this).parent().attr("data-id")] = "hidden";
        localStorage.setItem("deleted", JSON.stringify(deleteArr));
    });


    function saveTask() {

        // pushing a new index/value if this is a new card, else updating the old card's value

        if (taskArr[$(this).attr("data-id")] != null) {
            taskArr[$(this).attr("data-id")] = $(this).val();
        } else {
            taskArr.push($(this).val());
        }

        localStorage.setItem("tasks", JSON.stringify(taskArr));

    }

    function saveState() {

        if (stateArr[$(this).parent().parent().attr("data-id")]) {
            stateArr[$(this).parent().parent().attr("data-id")] = $(this).attr("data-id");
        } else {
            stateArr.push($(this).attr("data-id"));
        }

        localStorage.setItem("states", JSON.stringify(stateArr));
        $(".card").remove();
        renewCards();
    }



});