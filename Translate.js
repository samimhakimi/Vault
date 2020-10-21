$(document).ready(function(){

    function ipLookUp() {

      $.ajax("http://ip-api.com/json").then(
          
        function success(response) { 

          response.country == "Norway"

           // document.getElementById('userLocation').innerHTML = country;

          if(response.country === "Germany") // Germany
          { 
              document.getElementById('headerPic').src = './assets/header_Germany.png';  
              window.startGame('assetsGerman.json', 'settingsSecretCodeJackpotMixed.json');
              document.getElementById('congrats').src = './images/Wildz_Germany2.png';
              document.getElementById('cat-g').src = './images/signUpButtonGermany.png';
              document.getElementById('cta-1').setAttribute('onclick', "window.location.href='https://api.wildzaffiliates.com/tracking.php?tracking_code&aid=101648&mid=37&sid=11327&pid=1';");
          }  

          else if(response.country === "India") // India
          { 
              document.getElementById('headerPic').src = './assets/header.png';  
              window.startGame('assets.json', 'settingsSecretCodeJackpotMixed.json');
              document.getElementById('congrats').src = './images/Wildz_India.png';
              document.getElementById('cat-g').src = './images/signUpButton.png';
              document.getElementById('cta-1').setAttribute('onclick', "window.location.href='https://api.wildzaffiliates.com/tracking.php?tracking_code&aid=101648&mid=37&sid=11327&pid=1';");
          } 

          else if(response.country === "Norway") // Norway
          { 
              document.getElementById('headerPic').src = './assets/header_Norway.png';  
              window.startGame('assetsNorway.json', 'settingsSecretCodeJackpotMixed.json');
              document.getElementById('congrats').src = './images/Wilds_Norway.png';
              document.getElementById('cat-g').src = './images/signUpButtonNorway.png';
              document.getElementById('cta-1').setAttribute('onclick', "window.location.href='https://api.wildzaffiliates.com/tracking.php?tracking_code=&aid=101648&mid=37&sid=11297&pid=1&keyword=';");
          } 

        else  if(response.country === "Canada") // Canada
          { 
              document.getElementById('headerPic').src = './assets/header.png';  
              window.startGame('assets.json', 'settingsSecretCodeJackpotMixed.json');
              document.getElementById('congrats').src = './images/Wildz_New_Zealand_Canada.png';
              document.getElementById('cat-g').src = './images/signUpButton.png';
              document.getElementById('cta-1').setAttribute('onclick', "window.location.href='https://api.wildzaffiliates.com/tracking.php?tracking_code&aid=101648&mid=37&sid=11342&pid=1';");
          } 
         else if(response.country === "Netherlands") // Netherlands
          { 
              document.getElementById('headerPic').src = './assets/header.png';  
              window.startGame('assets.json', 'settingsSecretCodeJackpotMixed.json');
              document.getElementById('congrats').src = './images/Wildz_Germany_Netherlands_Austria_Finland_Luxembourg_Andorra_Monaco.png';
              document.getElementById('cat-g').src = './images/signUpButton.png';
              document.getElementById('cta-1').setAttribute('onclick', "window.location.href='https://api.wildzaffiliates.com/tracking.php?tracking_code=&aid=101648&mid=37&sid=11297&pid=1&keyword=';");
          } 
          else if(response.country === "Finland") // Finland
          { 
              document.getElementById('headerPic').src = './assets/header.png';  
               window.startGame('assets.json', 'settingsSecretCodeJackpotMixed.json');
              document.getElementById('congrats').src = './images/Wildz_Germany_Netherlands_Austria_Finland_Luxembourg_Andorra_Monaco.png';
              document.getElementById('cat-g').src = './images/signUpButton.png';
              document.getElementById('cta-1').setAttribute('onclick', "window.location.href='https://api.wildzaffiliates.com/tracking.php?tracking_code&aid=101648&mid=37&sid=11315&pid=1';");
          } 

          else {
            document.getElementById('congrats').src = './images/Wildz_Germany_Netherlands_Austria_Finland_Luxembourg_Andorra_Monaco.png';
          window.startGame('assets.json', 'settingsSecretCodeJackpotMixed.json');
          }

          
   
          
        
      

        },
    
        function fail(data, status) {
          
          console.log("Request failed.  Returned status of", status);
        }
      );
    }
    ipLookUp();
    
    });