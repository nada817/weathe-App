const notFoundSection =document.getElementById("notFoundSection");
const searchFadySection =document.getElementById("searchFadySection");
const weatherAllData =document.getElementById("weatherAllData");
const temprature =document.querySelector('.temprature');
const ciytName =document.querySelector('.city-name');
const currentDate =document.querySelector('.current-date');
const weatherCondition =document.querySelector(".weather-condition");
const imgWeatherContainer =document.querySelector(".img-weather-container")
const humainityValue =document.querySelector(".hum-value");
const windValue =document.querySelector(".wind-value");
const  weatherOfDayDate=document.querySelector(".weather-of-day-date");
let  weatherOfDayImg=document.querySelector(".weather-of-days-img");
const  weatherOfDayTemp=document.querySelector(".weather-of-day-temp");


// ================================ search section =====================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener('click',function(){
    if (searchInput.value != ''){
        weatherDataDisplay(searchInput.value);
        // console.log(searchInput.value);
        searchInput.value = "";
    }
   
})
searchInput.addEventListener('keydown',function(e){
    if (e.key == 'Enter' && searchInput.value != '' ){
        weatherDataDisplay(searchInput.value);
        // console.log(searchInput.value)
        searchInput.value = "";
    }
})
// ================================ end search section =====================

// ===================fetch api =================
const apiKeY ='3ed39189653e93ca369103a5516bdfb6';

 async function getFetchApi(endPoint ,city){
const apiUrl= `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKeY}&units=metric`
const response = await fetch(apiUrl);    
let finalResponse = await response.json()
return finalResponse
}
// ===================end  fetch api =================

// =====================weather condition Image ==============
function getWeatherImgCondition(id){
    if (id<=232) return 'thunderstorm.svg'
    if (id<=321) return 'drizzle.svg'
    if (id<=531) return 'rain.svg'
    if (id<=622) return 'snow.svg'
    if (id<=781) return 'atmosphere.svg'
    if (id<=800) return 'clear.svg'
    if (id<=804) return 'clouds.svg'
    else return 'clouds.svg'
    console.log(id);
}
// ======================current date =====================
function getCurrentDate(){
    const date =new Date();
    const options ={
        weekday:'short',
        day:'2-digit',
        month:'short'
    }
    return date.toLocaleDateString('en-GB',options);
}

// ====================display weather data =========================
   async function weatherDataDisplay(city){
    const weatherInfo =await getFetchApi('weather' ,city);
    if(weatherInfo.cod != 200){
        notFoundSection.classList.remove("d-none");
        searchFadySection.classList.add("d-none");
        weatherAllData.classList.add("d-none");

    }
    else{
        notFoundSection.classList.add("d-none");
        searchFadySection.classList.add("d-none");
        weatherAllData.classList.remove("d-none");

    }
// ===============3shan abasi el data fi el section bt23o ============
    const {
        name:country ,
        main :{temp , humidity},
        weather :[{id , main}],
        wind :{speed}
    } =weatherInfo;
    // ----------put data b2a 3shn a3lha display  -----------------
    ciytName.textContent =country ;
    temprature.textContent =Math.round(temp) +" °C" ;
    humainityValue.textContent =humidity + " %";
    weatherCondition.textContent = main ;
    windValue.textContent =Math.round(speed) + ' M/s ';
    imgWeatherContainer.src=`./images/weather/${getWeatherImgCondition(id)}`;
    currentDate.textContent=getCurrentDate();
    await DisplayWeatherOfDays(city);
    console.log(weatherInfo)

    }

// ===============display weather of days ==============

async function DisplayWeatherOfDays(city){
  const weatherOfDays =await getFetchApi('forecast',city);
  let weatherArray =weatherOfDays.list ; 
let cartona ='';
let today =new Date().getDate(); //tare7 el yom
  for ( let i=0;i< weatherArray.length ;i++){
    // b2sm eltare7 w sa3a kol wa7ed l wa7do  3san bytharo sawa
let  apiDate =new Date(weatherArray[i].dt_txt); //da eltare7 
let  apiTome =new Date(weatherArray[i].dt_txt).toISOString().split('T')[1]; // da el time
let dayNumber = apiDate.getDate(); //bgeb el day num 
let dayName = apiDate.toLocaleDateString('en-GB', { weekday: 'short' }); //bgeb el day name
let imageUrl='./images/weather/'
let FinalImageUrl=imageUrl+`${getWeatherImgCondition(weatherArray[i].weather[0].id)}`;

if (apiTome == '12:00:00.000Z' && dayNumber >today ){
    cartona+=`
    <div class="weather-of-days ">
          <p class="regular-txt weather-of-day-date">
          ${dayNumber} ${dayName}
          </p>
<img src='${FinalImageUrl}' alt="" class="weather-of-days-img">
<p class="weather-of-day-temp">
${Math.round(weatherArray[i++].main.temp)} °C
</p>
      </div>
  `
}
}
document.querySelector(".weather-of-days-container").innerHTML=cartona;
console.log(weatherArray)
}
 
 