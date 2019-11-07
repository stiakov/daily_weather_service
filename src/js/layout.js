import { getById, append, create } from "./setup";
import { getWeather, getKtoF, minmaxKtoF, getKtoC, minmaxKtoC } from "./owmHandler";
import { collection } from "./cities";
import gif from '../img/loading_weather.gif'


const mainContainer = getById('main-container');

const preloadDatalist = async () => {
  getById('modalgif').src = await gif;
  const searchHelper = await create('datalist', [{ id: 'citiesList' }]);

  await collection.forEach((item) => {
    const option = create('option', [{ value: `${item.nm} – ${item.nat}/${item.id}` }]);
    append(searchHelper, [option]);
  });
  await append(mainContainer, [searchHelper]);
};

export const initLayout = () => {
  preloadDatalist().then(() => {
    getById('modal').classList.add('closed');
  });

  const formContainer = create('div', [{ className: 'form-container' }]);
  const searchInput = create('input', [
    { id: 'search' },
    { type: 'text' },
    { placeholder: 'City' }
  ]);
  searchInput.setAttribute('list', 'citiesList');
  const submit = create('button', [{ type: 'submit' }]);
  const submitIcon = create('i', [{ className: 'icon ion-android-earth input-icon' }]);

  const iconToggler = () => {
    submitIcon.classList.toggle('ion-android-earth');
    submitIcon.classList.toggle('ion-loading-c');
  };

  const getWeatherHandler = (id) => {
    const input = getById('search');
    if (input.value === '') {
      input.placeholder = 'Type a city';
      submitIcon.classList.remove('ion-loading-c');
      submitIcon.classList.remove('ion-android-earth');
      submitIcon.classList.add('ion-ios7-information')
      setTimeout(() => {
        submitIcon.classList.toggle('ion-ios7-information')
        submitIcon.classList.add('ion-android-earth');
      }, 1500);
    } else {
      const cityId = input.value.split('/');
      input.value = cityId[0]
      getWeather(cityId[1])
        .then((data) => {
          console.log(data);
          iconToggler();
          renderData(data);
        })
        .catch(() => {
          iconToggler();
        });
    }
  };

  submit.addEventListener('click', () => {
    iconToggler();
    getWeatherHandler();
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      iconToggler();
      getWeatherHandler();
    }
  });

  append(submit, [submitIcon]);
  append(formContainer, [searchInput, submit]);
  append(mainContainer, [formContainer]);
};
export const renderData = (data) => {
  getById('search').value = '';
  const dataReceptor = create('div', [{ id: 'data-receptor' }]);

  const titleContainer = create('div', [{ id: 'titleContainer'}]);
  const cityName = create('div', [{ id: 'cityName'}]);
  const locationIcon = create('i', [{ className: 'ion-location' }]);
  cityName.innerText = `${data.name} - ${data.sys.country} `;
  append(titleContainer, [locationIcon, cityName]);
  
  const firstRow = create('div', [{ id: 'firstRow' }]);
  const col1 = create('div', [{ className: 'col' }]);
  const col2 = create('div', [{ className: 'col' }]);
  const col3 = create('div', [{ className: 'col' }]);
  const icon = create('img', [
    { className: 'weatherIcon' },
    { src: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` }
  ]);
  const desc = create('h4', [{ id: 'desc' }, { innerText: data.weather[0].description }]);
  const temp = create('div', [{ id: 'temp' }, { innerText: getKtoC(data.main.temp) }]);
  const minmax = create('div', [{ id: 'minmax' }, { innerText: minmaxKtoC(data.main.temp_min, data.main.temp_max) }]);
  append(col2, [icon, desc]);
  append(col3, [temp, minmax]);
  append(dataReceptor, [titleContainer, firstRow]);
  append(firstRow, [col1, col2, col3]);
  append(mainContainer, [dataReceptor]);
};