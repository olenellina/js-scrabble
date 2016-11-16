'use strict';

///////////// SCRABBLE ////////////////

var Scrabble = function() {
};

Scrabble.prototype.score = function(word) {
  var total = 0;
  var word = word.toUpperCase();

  // Collapse this into a hash/object
  // var values = [["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"], ["D", "G"],
  // ["B", "C", "M", "P"], ["F", "H", "V", "W", "Y"], ["K"], ["J", "X"], ["Q", "Z"]]
  var one = ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"]
  var two = ["D", "G"]
  var three = ["B", "C", "M", "P"]
  var four = ["F", "H", "V", "W", "Y"]
  var five = ["K"]
  var eight = ["J", "X"]
  var ten = ["Q", "Z"]


  for (var i = 0; i < word.length; i++) {
    if (one.includes(word.charAt(i))) {
      total += 1;
    } else if (two.includes(word.charAt(i))) {
        total += 2;
    } else if (three.includes(word.charAt(i))) {
        total += 3;
    } else if (four.includes(word.charAt(i))) {
        total += 4;
    } else if (five.includes(word.charAt(i))) {
        total += 5;
    } else if (eight.includes(word.charAt(i))) {
        total += 8;
    } else if (ten.includes(word.charAt(i))) {
        total += 10;
    }
  }
  return total;
};

Scrabble.prototype.highestScoreFrom = function(array) {
  var highestScore = 0;
  var winningWord = "";
  var wordScore = 0;
  var tie = [];
  for (var i = 0; i < array.length; i++) {
    wordScore = myGame.score(array[i]);

    if (array[i].length == 7) {
      // It makes more sense to me to add the bonus on now for seven-letter words,
      // versus when when determining a tie.
      wordScore += 50;
    }

    if (wordScore > highestScore) {
      highestScore = wordScore;
      // Because I'm not updating winningWord if the scores are equal, winningWord
      // will return the first instance
      winningWord = array[i];
    } else if (wordScore == highestScore) {
      // Ensures winningWord is only updated in the case that it has a longer length
      // than the challenger
      if (array[i].length < winningWord.length) {
        winningWord = array[i];
      }
    }
  }
  return winningWord;
};

// Testing

var myGame = new Scrabble();

// console.log(myGame.score("cat"));
// console.log(myGame.winner(["cat","zebra", "zzzzzzzz", "qqqqqqq", "dog"]));
// console.log(myGame.winner(["AE", "D", "G"]));

///////////// PLAYER ////////////////

var Player = function(name, game) {
  var array = [];
  this.name = name;
  // Connecting a Player object to a Scrabble object:
  this.game = game;
  this.plays = array;
  this.play = function(word) {
    if (this.hasWon()) {
      return false;
    } else {
      // The word is only added to the plays array if the player hasn't already won
        array.push(word);
      }
  };
  this.totalScore = function() {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
      total += this.game.score(array[i]);
    }
    return total;
  };
  // A player has won if the totalScore is over 100
  this.hasWon = function() {
    return (this.totalScore() > 100);
  };
  this.highestScoringWord = function() {
    return this.game.highestScoreFrom(this.plays);
  };
  this.highestWordScore = function() {
    return this.game.score(this.highestScoringWord());
  };
};

// Testing

var myPlayer = new Player("Bob", myGame);

myPlayer.play("Cat");
myPlayer.play("ZZZZZZZ");
myPlayer.play("QQQQQQ");
myPlayer.play("QZE");
console.log(myPlayer.totalScore());
console.log(myPlayer.hasWon());
console.log(myPlayer.highestScoringWord());
console.log(myPlayer.highestWordScore());
console.log(myPlayer.play("QZE"));
