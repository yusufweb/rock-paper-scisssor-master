$(document).ready(function () {
    // get score from localStorage
    // or initailize score to 12 if playing for the first time
    var score = localStorage.getItem("gameScore") || 12;
    $("#score").text(score);

    // show modal rule image
    $("#rules").on("click", function () {
        $(".modal").css("display", "block");
    });

    // close modal rule Image
    $(".close-modal").on("click", function () {
        $(".modal").css("display", "none");
    })

    // player weapon/move/strategy
    $(".player-weapon").each(function () {
        $(this).on("click", function () {
            // hide the weapon/move/strategy section
            $("#strategies").fadeOut("fast");
             // show the weapon/move/strategy section
            $("#game-outcome").fadeIn("fast");
            
            // get the (id) of the weapon clicked for player strategy/move/weapon
            var playerMove = $(this).attr("id"); //id=paper|rock|scissors

            // change the border of the weapon selected to the corresponding weapon--
            // --on the outcome section for player
            if (playerMove === "paper") {
                var img = "images/icon-paper.svg";
                $("#player-move").addClass("paper-bordered");
            } else if (playerMove === "scissors") {
                var img = "images/icon-scissors.svg";
                $("#player-move").addClass("scissors-bordered");
            } else {
                var img = "images/icon-rock.svg";
                $("#player-move").addClass("rock-bordered");
            }
            $("#player-pick").attr("src", img);

            // house strategy/move/weapon
            var houseWeapon = generateHouseStrategy();

            // evaluate game result
            gameResult(playerMove,houseWeapon);

            // play again event
            $("#play-again").on("click", function () {
                // show the weapon/move/strategy section
                $("#game-outcome").fadeOut("fast");
                // hide the weapon/move/strategy section
                $("#strategies").fadeIn("fast");
                // reset and remove all classes from player and house outcome
                $("#player-move").removeClass("paper-bordered scissors-bordered rock-bordered");
                $("#house-move").removeClass("paper-bordered scissors-bordered rock-bordered");
            });

            console.log(img);
            console.log("player: " + playerMove);
            console.log("house: " + houseWeapon);
        });
    });

    // computer generate it weapon/strategt/move
    generateHouseStrategy = () => {
        var houseChoice = Math.random();
        if (houseChoice < 0.34) {
            houseChoice = "rock";
            var img = "images/icon-rock.svg";
            $("#house-move").addClass("rock-bordered");
        } else if (houseChoice < 0.67) {
            houseChoice = "paper";
            var img = "images/icon-paper.svg";
            $("#house-move").addClass("paper-bordered");
        } else {
            houseChoice = "scissors";
            var img = "images/icon-scissors.svg";
            $("#house-move").addClass("scissors-bordered");
        }

        $("#house-pick").attr("src", img);

        return houseChoice;
    }

    gameResult = (player1,player2) => {
        if (player1 === player2) {
            $("#result").text("Draw");
        }else if (player1 === "rock") {
            if (player2 === "scissors") {
                $("#result").text("You Win");
                score++;
            }else if (player2 === "paper") {
                $("#result").text("You Lose");
                avoidNegativeScore(score);
            }
        }else if (player1 === "paper") {
            if (player2 === "rock") {
                $("#result").text("You Win");
                score++;
            }else if (player2 === "scissors") {
                $("#result").text("You Lose");
                avoidNegativeScore();
            }
        }else if (player1 === "scissors") {
            if (player2 === "rock") {
                $("#result").text("You Lose");
                avoidNegativeScore(score);
            }else if (player2 === "paper") {
                $("#result").text("You Win");
                score++;
            }
        }
        localStorage.setItem("gameScore", score);
        $("#score").text(score);
    }

    // if player score = 0 and player loses the round avoid negative score
    // score = 0
    avoidNegativeScore = () => {
        if (score < 1) {
            score = 0;
        }else {
            score--;
        }
    }

});
