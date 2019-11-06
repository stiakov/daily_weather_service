import { getById, append, create } from "./setup";
import { getWeather} from "./owmHandler";

const mainContainer = getById('main-container');

export const initLayout = () => {
  const formContainer = create('div', [
    { className: 'form-container' }
  ]);
  const searchInput = create('input', [
    { id: 'search' },
    { type: 'text' },
    { placeholder: 'City' }
  ]);
  const submit = create('button', [{ type: 'submit' }]);
  const submitIcon = create('i', [{ className: 'icon ion-android-globe input-icon' }]);
  const searchHelper = create('div' [{ id: 'cities' }]);

  const searchCities = async (city) => {
    const res =  await fetch('./city.list.json');
    const cities = await res.json();
    let matches = cities.filter((city) => {
      const regex = new RegExp(`^${city}`, 'gi');
      return city['name'].match(regex) || city['country'].match(regex);
    });

    if (matches.length === 0) {
      matches = [];
    }
    console.log(matches);
  };
  //searchInput.addEventListener('input', () => searchCities(searchInput.value));
  searchInput.addEventListener('keydown', (e) => {
    let location;
    if (searchInput.value.length > 0) location = searchInput.value;
    if (e.key === 'Enter') {
      submitIcon.classList.remove('ion-android-globe');
      submitIcon.classList.add('ion-loading-c');

      const response = getWeather(location)
        .then(data => {
          submitIcon.classList.add('ion-android-globe');
          submitIcon.classList.remove('ion-loading-c');
          console.log('data', data)
        })
        .catch(error => console.log('error', error));
    }
  });

  append(submit, [submitIcon]);
  append(formContainer, [searchInput, submit]);
  append(mainContainer, [formContainer, searchHelper]);
};
export const renderData = (data) => {
  const dataReceptor = create('div', [
    { id: 'data-receptor' },
    { innerText: 'OHHH!' }
  ]);

  const firstRow = create('div', [{ id: 'firstRow' }]);
  const col1 = create('div', [{ id: 'col1' }, { innerText: 'Hey!' }]);
  const col2 = create('div', [{ id: 'col2' }, { innerText: 'Hey!' }]);
  const col3 = create('div', [{ id: 'col3' }, { innerText: 'Hey!' }]);

  append(dataReceptor, [firstRow]);
  append(firstRow, [col1, col2, col3]);
};