$(document).ready(function() {

    var topics = [
        "dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla",
        "hedgehog", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"
    ];

    // function to show animals to DOM
    function displayAnimals() {

        $("#animals").empty();
    // Giphy API
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UM935ggzdYI5h9BsnSpl4Utwp0UV5kkm&q=" + animal + "&limit=25&offset=0&rating=G&lang=en";

    //Ajax to access API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
    //Make animal div and set all class and attributes
            var gifArray = response.data;

            for (var i = 0; i < 10; i++) {

                var animalDiv = $("<div class='animal'>");
                var rating = gifArray[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                animalDiv.append(p);
            //set gif still and animate
                var gifAnimate = gifArray[i].images.fixed_height_downsampled.url;
                var gifStill = gifArray[i].images.fixed_height_still.url;
                var image = $("<img>").attr("src", gifStill)
                    .attr("data-state", "still")
                    .attr("data-animate", gifAnimate)
                    .attr("data-still", gifStill)
                    .addClass("gif");
                animalDiv.append(image);
                $("#animals").prepend(animalDiv);
            }
            //use click to change attribute
            $(".gif").on("click", function() {

                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });

        });


    }
    //render the animal buttons
    function renderButtons() {

        $("#animalButtons").empty();

        for (var i = 0; i < topics.length; i++) {
            var animalBtn = $("<button>");
            animalBtn.addClass("animal-button-color animal-button");
            animalBtn.attr("data-animal", topics[i]);
            animalBtn.text(topics[i]);
            $("#animalButtons").append(animalBtn);

        }

    }


    //add animal that the user types
    $("#addAnimal").on("click", function(event) {
        event.preventDefault();

        var animal = $("#animal-input").val().trim();

        topics.push(animal);

        renderButtons();
        
    });

    $(document).on("click", ".animal-button", displayAnimals);

    renderButtons();
});