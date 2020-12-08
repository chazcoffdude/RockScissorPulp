//rocks and rocks and rocks and rocks and rocks

scissor = document.getElementById("scissor");
paper = document.getElementById("paper");
rock = document.getElementById("rock");
dorp = document.getElementById("dorp");

let ready = true;
//^ for dorp's animations
let crc = true;
let rc = 0;

//player1 score
let p1s = 0;
let p2s = 0;
//rounds played
let rp = 0;

//crc = choosing round count, best out of 3, 5 or 7
//rc

//the two lines below me are for cool scissors effect, snip snip!
scissor.onmouseenter = function scissoropen(){
    if(crc == true){
    scissor.src = "images/fiv2.png";
    }else{
    scissor.src = "images/scissoropen.png";
    }
}
scissor.onmouseleave = function scissorclose(){
    if(crc == true){
    scissor.src = "images/fiv.png";
    }else{
    scissor.src = "images/scissorclosed.png";
    }

}


//the two lines below me are for a cool paper effect, crinkle!

//also, the rock paper scissor buttons serve as the 3,5,7 round buttons at the beginning. Hence why it checks what to display
paper.onmouseenter = () =>{
    if(crc == true){
    paper.src = "images/sev2.png";
    }else{
    paper.src = "images/paper1.png";
    }
}
paper.onmouseleave = () =>{
    if(crc == true){
    paper.src = "images/sev.png";
    }else{
    paper.src = "images/paper0.png";
    }
}

//the two lines below me are for cool rock effects, radda radda!
rock.onmouseenter = () =>{
    if(crc == true){
    rock.src = "images/tree2.png";
    }else{
    rock.src = "images/rock.png";
    }
}
rock.onmouseleave = () =>{
    if(crc == true){
    rock.src = "images/tree.png";
    }else{
    rock.src = "images/rock.png";
    }
}




//down here meat and potatos
alert("Ready Begin!");

//choice detect 
rock.onclick = () =>{
choice(-1);
}

paper.onclick = () =>{
choice(.5);
}

scissor.onclick = () =>{
choice(2);
}


//dorp's attack possibilities
let p2list = Array(
-1, //rock
.5, //paper
2   //scissor
)


function choice(p1){
    if(ready == false){
        return false;
        //so, this prevents the player from pressing anything while Dorp is doing his thing
    }
    //rock = -1
    //paper = .5
    //scissor = 2
    if(crc == true){
      switch(p1){
          case(-1):
          rc = 3;
          break;
          case(.5):
          rc = 7;
          break;
          case(2):
          rc = 5;
          break;
      }
      console.log("You chose "+rc+" rounds!");
      crc = false;
      scissor.src="images/scissoropen.png";
      paper.src="images/paper0.png";
      rock.src="images/rock.png";
      
      //now dorp will start doing the hand motion for rock paper scissors
      dorp.src = "images/dorprc.gif";
    }else{
    p2 = p2list[Math.floor(Math.random()*p2list.length)]; //picks randomly from dorps list
    console.log(("You chose "+p1+"! Dorp chose "+p2+"!").replace(/-1/g, "rock").replace(/.5|0.5/g, "paper").replace(/2/g, "scissor")); //logging what you & dorp picked, with replace converting the numbers into their real-world counterparts.
    
    //code below detects what hand gesture dorp should do
    if(p2 == 2){
        dorp.src = "images/dorpscis.gif";
    }
    else if(p2 == -1){
        dorp.src = "images/dorprock.gif";
    }
    else if(p2 == .5){
        dorp.src = "images/dorppap.gif";
    }
    ready = false;

    
    let wait = setInterval(() =>{dorp.src="images/dorprc.gif"; ready = true; clearInterval(wait)}, 6000);
    //^ ^ this pauses the javascript for 5 seconds so dorp can do his gesture
    
    console.log("Happy?")
    //result
    p1r = p1/p2;   //Dorp wins
    p2r = p2/p1;

    if(p1r > p2r){
        console.log(("Player wins! "+p1+" beats "+p2+"!").replace(/-1/g, "rock").replace(/.5|0.5/g, "paper").replace(/2/g, "scissor")); //  /x/g for gobal, without it, the code only replaced one instance.
        p1s++;  //Player wins
        rp++;
         ready = false;
        let wait0 = setInterval(() =>{dorp.src="images/dorpdamage.gif"; clearInterval(wait0);}, 2000);

        let wait2 = setInterval(() =>{dorp.src="images/dorpsad.gif"; clearInterval(wait2);}, 3000);
         console.log("Joe");
        clearInterval(wait);
        let wait3 = setInterval(() =>{dorp.src="images/dorprc.gif"; ready = true; clearInterval(wait3);}, 6000);
        //dorp losing effects above
        
    }else if(p1r < p2r){ 

        console.log(("Dorp wins! "+p2+" beats "+p1+"!").replace(/-1/g, "rock").replace(/.5|0.5/g, "paper").replace(/2/g, "scissor"));
        p2s++;
        rp++;  //round count goes up
        ready = false;
        let wait4 = setInterval(() =>{dorp.src="images/dorphap.gif"; clearInterval(wait4);}, 2000);
        let wait5 = setInterval(() => {dorp.src="images/dorprc.gif"; ready = true; clearInterval(wait5);}, 6000);

        //dorp winning effect above
    }else{
        console.log("Tie!");
      
    }
}

if(p2s+p1s < rc){
console.log("Player's score - "+p1s);
console.log("Dorp's score - "+p2s);
console.log("Rounds played - "+rp);
}else{

if(p2s>p1s){

    wait6 = setInterval(() => {window.open("outcomes/lose.html"); window.close(), 6000});

}
else if(p1s > p2s){
  
    
    wait7 = setInterval(() => {window.open("outcomes/win.html"); window.close(), 6000});



}else{
    console.log("You tie!");
}



}

}


//okay, so I got the idea, what if I could
//use numbers to more efficiently calculate the winner,
//instead of writing an else if statement for every scenario

//this idea lead me to an interesting reddit post
//https://www.reddit.com/r/math/comments/3k4imj/rock_paper_scissors_with_numbers/

//basically, 
//they assigned values to rock,paper,scissors accordingly:
//-1 - rock
//.5 - paper
// 2 - scissors

//from there, they take the two players' answers, lets say;
// rock & paper

//they take rock & paper then divide them both ways;
// rock/paper     and      paper/rock

//in other words, -1/.5   and   .5/-1

//the equation that provides a bigger answer,

//          .5/-1 = -0.5  >  -1/.5 = -2
//          (paper/rock)  > (rock/paper)

//the numerator becomes the answer. Because the bigger equation is paper/rock,
//we know that the numerator, paper, is the winner.

//I felt doing it this way warranted an explanation 