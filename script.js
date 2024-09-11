function shake(){

   var ball= document.getElementById("ball")
   var messageText = document.getElementById("message")

   //remove previous message if it exists
   if(messageText != null){
    messageText.parentNode.removeChild(messageText);
   }
   
   //Make the ball shake by adding the css class
   ball.classList.add("shake");

   //Remove the shake class after it stops shaking
   setTimeout(function(){ ball.classList.remove("shake"); }, 1500);
   
   //call the fortune function to get your fortune only after 2sec
   setTimeout(function(){ getFortune(); }, 1500);
}

// add your logic in here in place of the array
function getFortune(){
    // test array of image urls
    var fortunes = [
        'https://i.imgur.com/5JK2lIS.jpeg', 
        'https://i.imgur.com/QkA4sXh.jpeg', 
        'https://i.imgur.com/JIf91sD.jpeg', 
        'https://i.imgur.com/0Im9fE6.jpeg', 
        'https://i.imgur.com/ncvz0US.jpeg', 
        'https://i.imgur.com/OkS8jSu.jpeg', 
        'https://i.imgur.com/EplUQyv.jpeg', 
        'https://i.imgur.com/TsA68iy.png', 
        'https://i.imgur.com/VhYtkqW.jpeg', 
        'https://i.imgur.com/oVrcJxv.jpeg',
        'https://i.imgur.com/HQEFdEX.jpeg',
        'https://i.imgur.com/kjbkBeq.jpeg',
        'https://i.imgur.com/o44nGp2.jpeg',
        'https://i.imgur.com/R82KgwB.jpeg']

    // pick a random entry from the array
    var fortune = fortunes[Math.floor(Math.random()*fortunes.length)];

    // fetch the image
    getFortuneFromURL(fortune);
}

function getFortuneFromURL(url){
    fetch(url)
    .then(res => res.blob())
    .then(blob => handler(blob))
}

function handler(inputBlob) {

    const url = URL.createObjectURL(inputBlob);
    
    document.getElementById("fortune").src = url;
}

// another approach if you do not need to use a blob - just call this instead from line 18
function getFortuneFromApi(){
    url = "https://your-api/decisionmaker";

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        document.getElementById("fortune").src = url;
    })
}
