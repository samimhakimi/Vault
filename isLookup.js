$(document).ready(function(){

function ipLookUp() {
  $.ajax("http://ip-api.com/json").then(
    function success(response) { 
  
      console.log("User's Country is ==  ", response.country);
  
    
      if(response.country === "Italy")
      {
        document.getElementById('congrats').src = './images/Wazamba_Germany_Austria_Luxembourg_Italy.png';
      }
      
      
    },

    function fail(data, status) {
      console.log("Request failed.  Returned status of", status);
    }
  );
}
ipLookUp();

});
