# HW - Giphy-API
It is best to prefix your Homework Names so that you may easily filter them out later when you may have actual projects that you are working on. It also important to let employers know that this was only a hw assignment and not your personal work. (ex. hw_giph-tastic)



## Live Link
 - https://ralphcomplido.github.io/Giphy-API/


## Description
#### In this homework, we will use the GIPHY API to make a dynamic web page that populates with gifs of  the user choice. To finish this task, we must call the GIPHY API and use JavaScript and jQuery to change the HTML of your site. 



- We have to understand how API is accessed.
- We have to manipulate the API JSON to use it for our HTML page.

## Technologies Used


- Jquery for Dom Manipulation

- AJAX for API GET requests


-------------

## Code Explaination


- The html only has 3 parts,

-- Buttons
-- Add Buttons
-- Show Results

- The css is only used to put margins, add colors to buttons, and arrange the position of the sections.

- The javascript does the most work for this code. I used Jquery and AJAX to access api then manipulate the DOM.


- Here are the brief explanations of the codes to achieve the goal:
	-
To access API, we use this code:
``` var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UM935ggzdYI5h9BsnSpl4Utwp0UV5kkm&q=" + animal + "&limit=25&offset=0&rating=G&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) { console.log(response) }); ```

	- To show the Giphy to the DOM, we use this code inside AJAX:
```var gifArray = response.data;
            for (var i = 0; i < 10; i++) {
                var animalDiv = $("<div class='animal'>");
                var rating = gifArray[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                animalDiv.append(p);
                var gifAnimate = gifArray[i].images.fixed_height_downsampled.url;
                var gifStill = gifArray[i].images.fixed_height_still.url;

                var image = $("<img>").attr("src", gifStill)
                    .attr("data-state", "still")
                    .attr("data-animate", gifAnimate)
                    .attr("data-still", gifStill)
                    .addClass("gif");
                animalDiv.append(image);
                $("#animals").prepend(animalDiv);```

	- To pause or play the GIF animation, we use this code inside AJAX:
```$(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                } ```

	- To render buttons, we use this code:
``` function renderButtons() {
        $("#animalButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var animalBtn = $("<button>");
            animalBtn.addClass("animal-button-color animal-button");
            animalBtn.attr("data-animal", topics[i]);
            animalBtn.text(topics[i]);
            $("#animalButtons").append(animalBtn);
        }
    } ```

	- To append the animals that the user wants to add, we use this code:
``` $("#addAnimal").on("click", function(event) {
        event.preventDefault();

        var animal = $("#animal-input").val().trim();
        topics.push(animal);
        renderButtons();
    }); ```