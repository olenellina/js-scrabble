'use strict';

// Primary Requirements
//
// Create the following functions within the Scrabble module.
//
// score(word): returns the total score value for the given word. The word is input as a string (case insensitive). The chart below shows the point value for a given letter.
// highestScoreFrom(arrayOfWords): returns the word in the array with the highest score.
// Note that it’s better to use fewer tiles, so if the top score is tied between multiple words, pick the one with the fewest letters.
// Note that there is a bonus (50 points) for using all seven letters. If the top score is tied between multiple words and one used all seven letters, choose the one with seven letters over the one with fewer tiles.
// If the there are multiple words that are the same score and same length, pick the first one in supplied list.

var Scrabble = function() {
};

// YOUR CODE HERE
Scrabble.prototype.helloWorld = function() {
  return 'hello world!';
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

// Commenting this out because I'm not sure why it's needed
module.exports = Scrabble;

///////////// PLAYER ////////////////

// Create a new Player object. The object should have the following functions:
//
// Constructor: Called when you use new Player(name), sets up an instance with the instance variable name assigned
// name: property which returns the value of the player's name
// plays: property which returns an Array of the words played by the player
// play(word): Function which adds the input word to the plays Array
// Returns false if player has already won
// totalScore(): Function which sums up and returns the score of the players words
// hasWon(): Function which returns true if the player has over 100 points, otherwise returns false
// highestScoringWord(): Function which returns the highest scoring word the user has played
// highestWordScore(): Function which returns the highestScoringWord score


var Player = function(name) {
  // Using the keyword this is what makes it a constructor
  var array = [];
  this.name = name;
  this.plays = array;
  this.play = function(word) {
    array.push(word);
  };
  this.totalScore = function() {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
      total += myGame.score(array[i]);
    }
    return total;
  };
  this.hasWon = function() {
    return (this.totalScore() > 100);
  };
  this.highestScoringWord = function() {
    return myGame.highestScoreFrom(this.plays);
  };
  this.highestWordScore = function() {
    return myGame.score(this.highestScoringWord());
  }
};

// Testing

var myPlayer = new Player("Bob");
console.log(myPlayer.play("Cat"));
console.log(myPlayer.play("ZZZZZZZ"));
console.log(myPlayer.play("QQQQQQ"));
console.log(myPlayer.play("QZE"));
console.log(myPlayer.totalScore());
console.log(myPlayer.hasWon());
console.log(myPlayer.highestScoringWord());
console.log(myPlayer.highestWordScore());
