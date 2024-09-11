function shake(){

   const ball= document.getElementById("ball")
	ball.src = "./images/8ball.png"
   const shake= document.getElementById("shake")
   //Make the ball shake by adding the css class
   ball.classList.add("shake");

   //Remove the shake class after it stops shaking
   setTimeout(function(){ ball.classList.remove("shake"); }, 1500);
   
   //call the fortune function to get your fortune only after 2sec
   setTimeout(function(){ getFortuneFromApi(); }, 1500);
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
    
    document.getElementById("ball").src = url;
}

// another approach if you do not need to use a blob - just call this instead from line 18
//function getFortuneFromApi(){
//    url = "https://1zacj58fte.execute-api.us-east-2.amazonaws.com/default/magic8ball";
//    fetch(url)
//    .then(function(response){
//        return response.text();
//    })
//    .then(function(data){
//        document.getElementById("ball").src = url;
//    })
//}
function getFortuneFromApi() {
    const url = "https://1zacj58fte.execute-api.us-east-2.amazonaws.com/default/magic8ball";

    fetch(url)
        .then(function(response) {
            // Check if the response is OK (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // The API returns the URL as plain text
        })
        .then(function(imageUrl) {
            // Check if the image URL is not empty
            if (imageUrl) {
                document.getElementById("ball").src = imageUrl;
            } else {
                console.error('Empty image URL received from API.');
                // Optionally handle the empty URL case here
            }
        })
        .catch(function(error) {
            console.error('Error fetching image URL:', error);
            // Optionally handle the error here
        });
}
