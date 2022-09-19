import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import loadAll from './components/loadAll.js';
import titleSearch from './components/titleSearch.js';
import printWatchlist from './components/printWatchlist.js';
import close from './images/close-logo.png';

// Load all data
loadAll();

// Search the titles
document.querySelector('#searchInput').addEventListener('keyup', titleSearch);

// Print the watch later length
const newArray = JSON.parse(localStorage.getItem('idArray'));
if (newArray !== null) {
  document.querySelector('#watchLater').innerHTML = `Watch Later(${newArray.length})<br><small>(drag and drop your anime here)`;
}
// Drag and drop event.
document.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('data', event.target.id);
});
document.addEventListener('dragover', (event) => {
  event.preventDefault();
});

document.addEventListener('drop', (event) => {
  event.preventDefault();
  if (event.target.className === 'catcher') {
    const data = event.dataTransfer.getData('data');
    const id = document.getElementById(data).id.split('-')[1];
    const storedArray = JSON.parse(localStorage.getItem('idArray'));

    if (storedArray === null) {
      const idArrayList = [];
      idArrayList.push({
        animeId: id,
      });
      localStorage.setItem('idArray', JSON.stringify(idArrayList));
      const newArray = JSON.parse(localStorage.getItem('idArray'));
      document.querySelector('#watchLater').innerHTML = `Watch Later(${newArray.length})<br><small>(drag and drop your anime here)`;
    } else {
      const idArray = [];
      storedArray.forEach((element) => {
        idArray.push(element.animeId);
      });
      if (idArray.includes(id) === true) {
        const alert = document.createElement('div');
        alert.className = 'alert';
        alert.innerHTML = `<div><a><img src="${close}" alt="close logo" id="close-logo"></a></div><div class="alert--msg-box"><h2>Already in your watchlist</h2></div>`;
        document.querySelector('.all-animes').appendChild(alert);
        document.querySelector('#watchLater').style.display = 'none';
        document.querySelector('#close-logo').addEventListener('click', () => {
          window.location.reload();
        });
        return false;
      }
      storedArray.push({
        animeId: id,
      });
      localStorage.setItem('idArray', JSON.stringify(storedArray));
      const newArray = JSON.parse(localStorage.getItem('idArray'));
      document.querySelector('#watchLater').innerHTML = `Watch Later(${newArray.length})<br><small>(drag and drop your anime here)`;
    }
  }
  return true;
});

// Watch list print
document.querySelector('#watchLater').addEventListener('click', printWatchlist);

// Home button refresh
document.querySelector('.home').addEventListener('click', () => {
  window.location.reload();
});