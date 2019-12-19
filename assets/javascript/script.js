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

    //populates previously made cards
    if (stateArr.length > 0 || taskArr.length) {
        for (let i = 0; i < stateArr.length; i++) {
            genCards(stateArr[i], taskArr[i], i);
        }
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
            saveTask();
        }
    });

    $(document).trigger("change",".task", saveTask);
    
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

        input.attr("value", cardTask);

        // if (taskArr[num]) {
        //     input.attr("value", taskArr[num]);
        // }

        let toDo;
        let inProg;
        let done;

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

        card.append(stateDiv);
        card.append(ex);
        card.append(input);

    }

    $('.ex').click(function() {
        console.log();
        $(this).parent().remove();
        localStorage.removeItem(this);
    })


    function saveTask() {
        console.log("save task");
        console.log($(this).attr("data-id"));
        // pushing a new index/value if this is a new card, else updating the old card's value

        console.log(taskArr[0]);
        console.log(taskArr[$(this).attr("data-id")]);

        if (taskArr[$(this).attr("data-id")]) {
            console.log("if");
            taskArr[$(this).attr("data-id")] = $(this).val();
        } else {
            console.log("else");
            taskArr.push($(this).val());
        }

        localStorage.setItem("tasks", JSON.stringify(taskArr));

    }

    function saveState() {
        console.log("save state");

        if (stateArr[$(this).parent().parent().attr("data-id")]) {
            stateArr[$(this).parent().parent().attr("data-id")] = $(this).attr("data-id");
        } else {
            stateArr.push($(this).attr("data-id"));
        }

        // convert JSON to jquery? might cause problems at some point. getJSON()
        localStorage.setItem("states", JSON.stringify(stateArr));
    }



});