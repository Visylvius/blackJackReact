//Global Variables
var deck;
var currentHands;
var hasStood = false;
//Constructor function, creates ranks and suits for cards.
// Get Card Image Path Function takes the suit and rank of the class, and then matches it the corresponding jpg file
// rendering the card image to the DOM
function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.getCardImagePath = function() {
    return 'http://localhost:8000/classic-cards/' + suit + rank + '.png';
  };
}

//Using the suits array, we push a new card onto the deck array, with 4 suits, and 14 cards per suit.
function makeDeck() {
  var deck = [];
  var suits = ['club', 'diamonds', 'hearts', 'spades'];
  for (var rank = 1; rank < 14; rank++) {
	   for (var suit = 0; suit < suits.length; suit++) {
      deck.push(new Card(rank, suits[suit]));
     }
  }
  return deck;
}

//shuffle takes an array of objects, and randomizes the array.
function shuffle(deck) {
 for (var i = deck.length - 1; i > 0; i--) {
   var j = Math.floor(Math.random() * (i + 1));
   var temp = deck[i];
   deck[i] = deck[j];
   deck[j] = temp;
 }
  return deck;
}

//takes the first index of the array, or card.
function dealCard(deck) {
  return deck.shift();
}

//creates an empty array for each player, making sure to leave the 0 index for the dealer.
//we also dynamically create DOM elements for the players cards and use the getCardImagePath function to show what the player drew
function dealRound(deck, numberOfPlayers) {
  var round = [];
  //we use numberOfPlayers + 1 to make that the zero index is saved for the dealer. This will allow us to card code the dealer values in the future
  for (var i = 0; i < numberOfPlayers + 1; i++) {
    round.push([]);
  }
  //first for loop in order to make sure each player gets two cards
  for (var k = 0; k < 2; k++) {
    // we set j equal to one to make sure we skip over the dealer which is index 0, house deals to players, then deals to itself.
   for (var j = 1; j <= numberOfPlayers; j++) {
     round[j].push(dealCard(deck));
     //Grab the players Ul dynmically and append list an item with a img tag.
    }
    // after the players have all been dealt one card, then we deal one card to the dealer
     round[0].push(dealCard(deck));
  }
  return round;
}

//takes the rank key of the Card object and applies the logic to make 11 and above equal to face cards
//also adds logic for aces. As they can be equal to 1 or 11.
function handValue(hand) {
  var score = [];
  score[0] = 0;
  var theHand = [];
  // takes each card in the hand and pushes the rank value onto the blank hand array, we will then
  //add the appropriate value to the players hand according to the integer value
  for (var i = 0; i < hand.length; i++) {
    theHand.push(hand[i].rank);
  }
  console.log(theHand);
  //blackjack logic, it first checks to see if either of the two cards in your hand are an ace, then if you have a face card in addition to the ace
  // it shows the dealers card, and declares that you have blackjack
  if ( theHand[0] === 1 || (theHand[1] === 1)) {
    if (
      (theHand[0] === 11 || theHand[0] === 12 || theHand[0] === 13) ||
      theHand[1] === 11 || theHand[1] === 12 || theHand[1] === 13 )
       {
       return 21;
    }
  }
  //we sort the hand in order to properly execute the following logic.
  theHand.sort(sortNumber);

//logic for face cards
  for (var i = 0; i < theHand.length; i++) {
    if (theHand[i] === 11 || theHand[i] === 12 || theHand[i] === 13) {
      for (var j = 0; j < score.length; j++) {
          score[j] = score[j] + 10;
      }
    }
    //logic for 2-10
    if (theHand[i] >= 2 && theHand[i] <= 10) {
      for (var j = 0; j < score.length; j++) {
          score[j] = score[j] + theHand[i];
      }
    }
    //ace logic
    if (theHand[i] === 1) {
      //the score length changes, so if we use score.length in the for loop we would encounter errors.
      var currentScoreLength = score.length;
      for (var k = 0; k < currentScoreLength; k++) {
        //if our score is greater than 10, you would want your ace to only be equal to 1
        if (score[k] > 10) {
          score[k] += 1;
          //if you draw an ace and your hand is less then 10, you would want your ace to be equal to 11.
        } else if (score[k] <= 10) {
          score[k] += 11;
          //but an ace can count for 1 as well as 11, so we push a new point onto the array, that way
          //if we bust with the ace being 11, it will go back the second value, with an ace being equal to just 1
          score.push(score[k] + 1);
        }
      }
    }
  }
  return score[0];
}
// in use at line 122
function sortNumber(a,b) {
    return b - a;
}

//whenever a play clicks the hit button, they get dealt a card, this function dynmically creates DOM elements, and then uses
//the getCardImagePath function to render the appropriate card on screen
// this function also deals with if the players hand goes over 21
var hit = function() {
  var newCard = dealCard(deck);
  currentHands[1].push(newCard);
  render();
  //shows what the player's hand value is currently


  //creating DOM elements

  //sets img tag src to the appropriate card, and renders it to the page


  // if the players hand is over 21 they bust meaning the game is over and they lose
  if ((handValue(currentHands[1]) > 21)) {


    //the dealer then shows his hand.

    //sinc the game is over the player can no longer hit, so we remove the event listener

  }
};
//function that makes the dealer hit until he has 17, and also compares the dealers score, to the players score
// and updates the h2 with the id of result accordingly.
  var dealerPlays = function() {
    //players shouldn't be able to hit after they stand

    //setting up for while loop
    var dealerHit = true;
    var dealerHand = currentHands[0];
    hasStood = true;
    // now that the players have finished, the dealers card that was facedown, now gets flipped face up
    // so we take the card that was previously down, and use the getCardImagePath function on it, to render the card to the DOM
    // and show it to the players


    while (dealerHit) {
      //the dealer hits until he gets 17
      if (handValue(dealerHand) < 17) {
        var newCard = dealCard(deck);
        currentHands[0].push(newCard);

        //create DOM elements



        //use the img src and set it to getCardImagePath in order to render it to the page

      } else {
        dealerHit = false;

        //if the dealer gets over 21, the player automatically wins
        if (handValue(dealerHand) > 21) {

          // compares values of both players hands, and if the dealer has a better hand, they win.
        } else if (handValue(dealerHand) > handValue(currentHands[1])) {

          //tie result
        } else if (handValue(dealerHand) === handValue(currentHands[1])) {

          //player win logic
        } else {

        }
      }
    }
    render();
  };
//whenever the new game button is clicked, it starts a fresh game. This function also clears any of the previous children from the dealerLi
// or dynmically created playerLi, and removes them from the DOM
function newGame() {

  // when you've already played a game and want to start a new one, this while loop will clear away all the previous cards,
  // by removing any children from the players Div.

  //because we defined deck variable at the top, we can access it within the function, and we use the deck variable within other functions
  deck = shuffle(makeDeck());
  currentHands = dealRound(deck, 1);
  hasStood = false;
  render();

}


//DOM Event Listeners
// we set these at the bottom, as they don't get hoisted, like variable declerations do.
var App = React.createClass({
	hitHandler: function() {
   if (this.props.stillPlaying) {
    hit();
   }

  },
  standHandler: function() {
  	dealerPlays();
  },
	render: function() {
   var playerCardLoop = this.props.player.map(function(e, i) {
   	return <li key={e.suit + e.rank}><img src={e.getCardImagePath()} /></li>;
   })
   var dealerCardLoop = this.props.dealer.map(function(e, i) {
		return <li key={e.suit + e.rank}><img src={e.getCardImagePath()} /></li>;
   })
   var header = null;
    if (this.props.score > 21) {
    	header = <h2>you've busted</h2>
    } else if (!this.props.stillPlaying && this.props.dealerScore > 21) {
		 header = <h2>The dealer has busted you win!</h2>;
    } else if (!this.props.stillPlaying && this.props.score < this.props.dealerScore) {
     header = <h2>The dealer has a better hand, you have lost.</h2>;
    } else if (!this.props.stillPlaying && this.props.score > this.props.dealerScore) {
     header = <h2>You have a better hand then the dealer, you win!</h2>;
    } else {
    	header = <h2>your score is {this.props.score}</h2>
    }


  	return (

     <div>
      {header}
      <ul>{dealerCardLoop}</ul>
      <ul>{playerCardLoop}</ul>
      <div className="buttons">
       <button disabled={!this.hitHandler} onClick={this.hitHandler}>Hit</button>
       <button disabled={!this.props.stillPlaying} onClick={this.standHandler}>Stand</button>
      </div>
     </div>
    )
  }
})

function render() {
	var dealersHand = currentHands[0];
  var playersHand = currentHands[1];
  var score = handValue(playersHand);
  var dealerScore = handValue(dealersHand);
  var stillPlaying = score < 21 && !hasStood;
  ReactDOM.render(
   <App dealer={dealersHand} player={playersHand} stillPlaying={stillPlaying} score={score}  />,
   document.querySelector('.container')
  )
}

newGame()
