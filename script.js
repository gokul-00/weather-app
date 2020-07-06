window.addEventListener('load',()=> {
   let long;
   let lat;
   let tempDescription = document.querySelector('.temp-description');
   let tempDegree = document.querySelector('.temp-degree');
   let icon = document.querySelector('.icon');
   let locationTimezone = document.querySelector('.location-timezone');
   if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position => {
           long = position.coords.longitude;
           lat = position.coords.latitude;
           const proxy = `https://cors-anywhere.herokuapp.com/`;
           const Id = `f8532618413cc9dcd03b5deb29838b73`;
           const api = `${proxy}https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${Id}`;
           
           fetch(api)
             .then(Response=>{
                 return Response.json();
             })
             .then(data =>{
                let {temp} = data.current;
                temp = temp - 273.15;
                temp = temp.toFixed(2);
                tempDegree.textContent = temp ;
                icon.src = ` http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
                locationTimezone.innerHTML = data.timezone;
                tempDescription.textContent = data.current.weather[0].description;

             })
             .catch(err => {
                 console.error(err);
             })
       })

   }else{
       h1.textContent = "please enable location access..."
   }

});