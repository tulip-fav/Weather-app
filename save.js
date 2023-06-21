const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const wbox = document.querySelector('.wbox');
const wdet = document.querySelector('.wdet');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', ()=>{
    const APIKey ='728b0ee6df5687559812bd3169ad77b7';
    const city = document.querySelector('.search-box input').value;

    if(city === '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(Response=>Response.json())
    .then(json => {
    

    if(json.cod === '404') {
        container.style.height= '400px';
        wbox.style.display= 'none';
        wdet.style.display='none';
        error404.style.display= 'block';
        error404.classList.add('fadeIn');
        return;
    }
    error404.style.display='none';
    error404.classList.remove('fadeIn');

    const image= document.querySelector('.wbox img');
    const temp =document.querySelector('.wbox .temp');
    const des = document.querySelector('.wbox .des');
    const humidity = document.querySelector('.wdet .humidity span');
    const wind = document.querySelector('.wdet .wind span');

    switch (json.weather[0].main) {
        case 'clear':
            image.src ='clear2.png';
            break;
            case 'rain':
             image.src ='rain.png';
             break;
             case 'snow':
              image.src ='snow.png';
             break;  
             case 'cloud':
            image.src ='cloud.png';
            break;
            case 'haze':
            image.src ='haze.png';
            break;   
            
            default:
                image.scr= '';
    }
     temp.innerHTML = `${parseIn(json.main.temp)}<span>*C</span>`;
     des.innerHTML=`${json.weather[0].des}`;
     humidity.innerHTML=`${json.main.humidity}%`;
     wind.innerHTML= `${parseInt(json.wind.speed)}Km/h`;

     wbox.style.display='';
     wdet.style.display= '';
     wbox.classList.add('fadeIn');
     wdet.classList.add('fdeIn');
     container.style.height= '590px';

    });


});  