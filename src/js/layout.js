import { getById, append, create } from "./setup";
import { getWeather, getKtoF, minmaxKtoF, getKtoC, minmaxKtoC, getWeatherIcon } from "./owmHandler";
import { collection } from "./cities";
import gif from '../img/loading_weather.gif'


const mainContainer = getById('main-container');
const cards = getById('cards');

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
  mainContainer.classList.remove('main-container');
  mainContainer.classList.add('toTop');
  const input = getById('search');
  input.value = '';
  cards.style.display = 'flex';

  const dataReceptor = create('div', [{ className: 'data-receptor spin1 cardToggler' }]);

  const titleContainer = create('div', [{ className: 'titleContainer'}]);
  const cityName = create('div', [{ className: 'cityName'}]);
  const locationIcon = create('i', [{ className: 'ion-location' }]);
  cityName.innerText = data.name;
  append(titleContainer, [locationIcon, cityName]);
  
  const firstRow = create('div', [{ className: 'firstRow' }]);
  const col1 = create('div', [{ className: 'col' }]);
  const col2 = create('div', [{ className: 'col' }]);
  const col3 = create('div', [{ className: 'col' }]);
  const icon = create('img', [
    { className: 'weatherIcon' },
    { src: getWeatherIcon(data.weather[0].icon) }
  ]);
  const desc = create('h4', [{ className: 'desc' }, { innerText: data.weather[0].description }]);
  const temp = create('div', [{ className: 'temp' }, { innerText: getKtoC(data.main.temp) }, { id: 'temp' }]);
  const minmax = create('div', [{ className: 'minmax' }, { innerText: minmaxKtoC(data.main.temp_min, data.main.temp_max) }]);
  append(col2, [temp, minmax]);
  dataReceptor.addEventListener('click', () => {
    cardToggler(col2, data);
  });
  append(col3, [icon, desc]);
  append(dataReceptor, [titleContainer, firstRow]);
  append(firstRow, [col1, col2, col3]);
  append(cards, [dataReceptor]);
};

const cardToggler = (obj, data) => {
  const parent = obj.parentElement.parentElement;
  parent.classList.toggle('spin1');
  parent.classList.toggle('spin2');
  const key = obj.firstChild.innerText.split('º');
  setTimeout(() => {
    if (key[1] === 'C') {
      obj.firstChild.innerText = getKtoF(data.main.temp);
      obj.lastChild.innerText = minmaxKtoF(data.main.temp_min, data.main.temp_max);
    } else {
      obj.firstChild.innerText = getKtoC(data.main.temp);
      obj.lastChild.innerText = minmaxKtoC(data.main.temp_min, data.main.temp_max);
    }
  }, 250);
};