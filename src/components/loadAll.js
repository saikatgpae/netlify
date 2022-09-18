const loadAll = async () => {
  const response = await fetch('https://api.jikan.moe/v4/anime');
  const json = await response.json();
  json.data.forEach((element) => {
    const anime = document.createElement('tr');
    anime.setAttribute('draggable', true);
    anime.id = `anime-${element.mal_id}`;
    anime.className = 'anime';
    anime.innerHTML = `
        <td class="title">${element.title}</td>
        <td><img src="${element.images.jpg.small_image_url}" alt=""></td>
        <td>${element.genres[0].name}</td>
        <td>${element.rating}</td>
        `;
    document.querySelector('#animes').appendChild(anime);
  });
  const table = document.querySelector('#animes');
  const genersArray = [];
  for (let i = 1; i < table.rows.length; i += 1) {
    genersArray.push(table.rows[i].cells[2].innerHTML);
  }
  const uniqueGeners = genersArray.filter((item, index) => index === genersArray.indexOf(item));

  const genere = document.querySelector('#gener');
  for (let i = 0; i < uniqueGeners.length; i += 1) {
    const option = document.createElement('option');
    option.innerHTML = `${uniqueGeners[i]}`;
    genere.appendChild(option);
  }
  document.querySelector('#gener').addEventListener('change', function selectGener() {
    const selectData = this.value;
    const filter = selectData.toUpperCase();
    const table = document.getElementById('animes');
    const tr = table.getElementsByTagName('tr');
    if (filter === 'SELECT') {
      window.location.reload();
    } else {
      for (let i = 0; i < tr.length; i += 1) {
        const td = tr[i].getElementsByTagName('td')[2];
        if (td) {
          const txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = '';
          } else {
            tr[i].style.display = 'none';
          }
        }
      }
    }
  });
  document.querySelectorAll('.anime').forEach((element) => {
    element.addEventListener('click', () => {
      const id = parseInt(element.id.split('-')[1], 10);
      for (let i = 0; i < json.data.length; i += 1) {
        if (json.data[i].mal_id === id) {
          window.open(json.data[i].url);
        }
      }
    });
  });
};
export default loadAll;