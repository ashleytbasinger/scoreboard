(function() {
  var Rank, compare, scoreRanks, showRanks, findExisting;

  Rank = (function() {
    function Rank(name1, points1, rank) {
      this.name = name1;
      this.points = points1;
      this.rank = rank != null ? rank : null;
    }

    return Rank;

  })();
    // I cheated: this function was on Stack Overflow somewhere
  compare = function(a, b) {
    if (a.points < b.points) {
      return 1;
    }
    if (a.points > b.points) {
      return -1;
    }
    return 0;
  };
// Check back with Codecademy for reference on arrays stuff    
  scoreRanks = function(scores) {
    var i, results;
    scores[0].rank = 1;
    if (scores.length > 1) {
      i = 1;
      results = [];
      while (i < scores.length) {
        if (scores[i].points === scores[i - 1].points) {
          scores[i].rank = scores[i - 1].rank;
        } else {
          scores[i].rank = scores[i - 1].rank + 1;
        }
        results.push(i++);
      }
      return results;
    }
  };
// so, <li> "name, ##" </li>   
  showRanks = function(scores) {
    $("#scoreboard").removeClass("hide");
    return $("#rankings").slideUp(300, "linear", function() {
      var i, len, score;
      $("#rankings").empty();
      for (i = 0, len = scores.length; i < len; i++) {
        score = scores[i];
        $("#rankings").append("<li>" + score.name + ", " + score.points + "</li>");
      }
      return $("#rankings").slideDown(300, "linear");
    });
  };  
// Add to my score!    
  findExisting = function(scores, name) {
    var i, len, score;
    for (i = 0, len = scores.length; i < len; i++) {
      score = scores[i];
      if (score.name === name) {
        return score;
      }
    }
  };
// Adding together all the methods and stuffs
  $(function() {
    var scores;
    scores = [];
    $("#add").click(function() {
      var input, name, newRank, player, points;
      if ($(this).hasClass("disabled")) {
        return false;
      } else {
        input = $("input").val().split(",");
        name = input[0];
        points = parseInt(input[1], 10);
        if (findExisting(scores, name)) {
          player = findExisting(scores, name);
          player.points += points;
        } else {
          newRank = new Rank(name, points);
          scores.push(newRank);
        }
        $("input").val("");
        $("#add").addClass("disabled");
        scores.sort(compare);
        scoreRanks(scores);
        return showRanks(scores);
      }
    });
    // Hitting the clear button empties everything
    $("#clear").click(function() {
      return $("#rankings").slideUp(300, "linear", function() {
        scores.length = 0;
        $("#rankings").empty();
        return $("#scoreboard").addClass("hide");
      });
    });
    return $("input").on('keyup change', function() {
      var valid;
      valid = $("input")[0].validity.valid === true;
      if (valid) {
        return $("#add").removeClass("disabled");
      } else {
        return $("#add").addClass("disabled");
      }
    });
  });

}).call(this);