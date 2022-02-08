import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    function checkStatus(code) {
      if (code != 200) {
        return new Error("Not a valid number!");
      } else {
        return true;
      }
    }

    try {
      let request = new XMLHttpRequest();
     // const url = `http://api.openweathermap.org/data/2.5/weather?zip=${city}&units=imperial&appid=${process.env.API_KEY}`;
      const url = `http://api.openweathermap.org/data/2.5/forecast?zip=${city}&units=imperial&appid=${process.env.API_KEY}`;
      request.onreadystatechange = function() {
        console.log(this.status);

        const isNumberValid = checkStatus(this.status);
        if (isNumberValid instanceof Error) {
          console.error(isNumberValid.message);
          throw RangeError("Not a valid number!");
        } else {
          console.log("Try was successful, so no need to catch!");
          //$('#displayNumber').text("This number is valid. You may continue.");
        }

        if (this.readyState === 4 && this.status === 200) {
          const response = JSON.parse(this.responseText);
          getElements(response);
        }
      };

      request.open("GET", url, true);
      request.send();


    } catch (e) {
      console.error(e);
    }

    function getElements(response) {

      
     for(let i=0;i<=response.list.length;i++){

      //let date= response.list[i].dt
      $('.showdate').append(`The date in ${city} is ${new Date(response.list[i].dt)}`);

      // let temp =response.list[i].main.temp
       $('.showTempForcaste').append(`The temp in ${city} is ${response.list[i].main.temp}`);

     }

      
      
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${response.main.temp} degrees.`);
    }
  });
});
