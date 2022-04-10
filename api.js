window.onload = function () {
    //get form and elements inside of it
    var formHandle = document.forms.myForm;
    var inputLocation = myForm.location;
    var heading = document.getElementById("h1");

    //form onsubmit event
    formHandle.onsubmit = processForm;

    //assign variables for output elements
    var section = document.getElementById("output");
    var out_tempt = document.getElementById("temperature");
    var out_conditions = document.getElementById("conditions");
    var out_icon = document.getElementById("icon");
    var out_humidity = document.getElementById("humidity");
    var out_feelsLike = document.getElementById("feelslike");
    var out_maxtemp = document.getElementById("maxtemp");
    var out_mintemp = document.getElementById("mintemp");


    const myAPI = "d6fc783f570e0e64e7e764899ef5edb6";


    //form onsubmit function
    function processForm() {


        //validation for search bar
        if (inputLocation.value == null || inputLocation.value == "") {
            inputLocation.focus();
            return false;
        }

        //assign the variable for the user's input (if valid) as location; it can be use later on in the url
        var location = inputLocation.value;

        //assign a variable for URL, inluding my own api key
        // URL: https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=d6fc783f570e0e64e7e764899ef5edb6&units=metric
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + myAPI + "&units=metric";


        //retrieve api data using XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {

                if (xhr.status === 200) {

                    //assign a variable for the data recieved from my api
                    const data = xhr.response;
                    console.log(data);
                    section.style.visibility = "visible";
                    //output results to html using api data
                    heading.innerHTML = data.name;
                    out_tempt.innerHTML = `${data.main.temp}°C`;
                    out_conditions.innerHTML = data.weather[0].description;
                    var iconUrl = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                    out_icon.innerHTML = `<img src='${iconUrl}'/>`;
                    out_humidity.innerHTML = ` ${data.main.humidity}%`;
                    out_feelsLike.innerHTML = `${data.main.feels_like}°C`;
                    out_maxtemp.innerHTML = `${data.main.temp_max}°C`;
                    out_mintemp.innerHTML = `${data.main.temp_min}°C`;
                } else {
                    inputLocation.focus();
                    return false;
                }

            } //end if statement - readyState
        }//end function - onreadystatechange

        //provide url & specify response type
        xhr.open('GET', url, true);
        xhr.responseType = "json";
        xhr.send(null);
        return false;
    } //end function - content

}//end function - window.onload
