const printWatchlist = () => {
  document.querySelector('#watchLater').style.display = 'none';
  const table = document.querySelector('#animes');
  for (let i = 1; i < table.rows.length; i += 1) {
    table.rows[i].style.display = 'none';
  }
  const newArray = JSON.parse(localStorage.getItem('idArray'));
  const allArrayList = [];
  newArray.forEach((element) => {
    allArrayList.push(element.animeId);
  });
  const uniqueGeners = allArrayList.filter((item, index) => index === allArrayList.indexOf(item));
  uniqueGeners.forEach((element) => {
    document.querySelector(`#anime-${element}`).style.display = 'table-row';
  });
};

export default printWatchlist;