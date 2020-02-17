//shuffle cards using the Fisher-Yates (aka Knuth) Shuffle function
function shuffle(array) {
    let curIdex = array.length, temp, ranIndex;

    while (curIdex !== 0) {
        ranIndex = Math.floor(Math.random() * curIdex);
        curIdex -= 1;
        temp = array[curIdex];
        array[curIdex] = array[ranIndex];
        array[ranIndex] = temp;
    }

    return array;
}

// satrat game
window.onload = function () {
    let openedCards	 = 	[];
        matchedCards = 	[];
        currentCard  = 	[];
        previouseCard= 0 ;
        Mcount = 0 ;
        restart = document.getElementsByClassName ('restart');
        modal = document.getElementById('myModal');
        span = document.getElementsByClassName('close')[0];
        
        // if restart works
        restart[0].addEventListener ('click', function (){
            location.reload();


        })
        //when game starts show all the cards for a  second
    
        //flashCards(); 

    // decler cards
    const cards = ['fa-diamond','fa-diamond', 'fa-paper-plane-o','fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle',
     'fa-bomb','fa-bomb' ]; 
    let shuffleCards = shuffle (cards);
     
    let cardSymbols = document.getElementsByClassName('symbols');
    
    for (i=0; i < cardSymbols.length; i++ ) {
        cardSymbols[i].className = shuffleCards[i]+ ' fa symbols';
      
    }
  
    
   /* function flashCards() {
        for(i=0; i<cardSymbols.length; i++) {
            cardSymbols[i].classList.add("symbols")
        }
        setTimeout(function(){
            for(i=0; i<cardSymbols.length; i++) {
                cardSymbols[i].classList.remove("cards")
            }
        }, 1000)
    }*/
   
    //  popup when finish game

    function popup() {
                    modal.style.display = "flex";
                    document.getElementById('p1').innerHTML = 'You did it in '+ Mcount+ 
                    ' moves'  + ' and ' + seconds+ ' seconds.';
    }

    // Closing popup by  x
    span.onclick = function closeX () {
                        modal.style.display = "none";
                    }

    //  closing popup by clicking any where
    window.onclick = function(e) {
                        if (e.target == modal) {
                            modal.style.display = "none";
                        }
                    }

    //  time initialisation
    let stopT = document.getElementById ('timer');
        time = 0;
        seconds=0
    
    // start time
    function startTime () {
        time = setInterval ( function (){
            seconds++;
            stopT.innerHTML = seconds + ' s';
        }, 1000); 
    }

    // stop the time function
    function stopTime ()	{
        clearInterval (time);
    }
    
    let displayCards = document.getElementsByClassName ('card');       
        
var clickFlag=true;
    // Click Event
    function cardClick () {
  if(!clickFlag){
    alert("Please wait");
    return;
    }
         currentCard = this;
         currentCard.removeEventListener ('click', cardClick); 
        

         // updating move counts
         let countM = document.getElementById ('moves');

         Mcount++ ;
         countM.innerHTML= Mcount;
         

         // sit the star ranking up to the moving count ;
         if ( Mcount === 25) {
             let removeST = document.getElementById('star3');
            removeST.style.display = 'none';
         } else if (Mcount ===35) {
             let removeSTTwo = document.getElementById ('star2');
             removeSTTwo.style.display = 'none';
             }	

         // start  stopT at the first click.
         if ( Mcount ===1) {
             startTime ();
         }
             
             currentCard.classList.add('open', 'show');


             if (previouseCard) {
      clickFlag=false;
                 // matching cards
                 if (currentCard.innerHTML === previouseCard.innerHTML) {
                     currentCard.classList.add('match');
                     previouseCard.classList.add('match');
                     matchedCards.push(currentCard,previouseCard);
         
                     
                     previouseCard = null ;
                     
                     // check if finish the game
                     if (cards.length === matchedCards.length) {
                     
                         // stopping stopT 
                         stopTime();

                         // calling popup function 
                         popup ();
                    
                     }
       clickFlag=true;
                 } else {
                     // when cards are not matched
                     setTimeout (function(){

                         currentCard.classList.remove ('open', 'show');	
                         previouseCard.classList.remove ('open', 'show');
                         currentCard.addEventListener ('click', cardClick);
                         previouseCard.addEventListener ('click', cardClick);
                         previouseCard = null ;
                         clickFlag=true;
                     }, 500);
                 
                 }
                  

             } else {
                     previouseCard = currentCard ;	
                     openedCards.push(this);	
      clickFlag=true;
                 }		
     } 
         
         // event listener function 
     for (i=0; i < displayCards.length; i++) {
        displayCards[i].addEventListener('click', cardClick);

    }
    
 }