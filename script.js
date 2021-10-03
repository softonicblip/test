//Get Countries From Json File
const searchcountry = async searchBox => {
  const res = await fetch('https://gdbrowser.com/api/level/4284013');
  const countries = await res.json();

  //Get Entered Data
  let fits = countries.filter(country => {
    const regex = new RegExp(`^${searchBox}`, 'gi');
    return country.name.match(regex) || country.version.match(regex);
  });

  if (searchBox.length === 0) {
    fits = [];
    countryList.innerHTML = '';
  }

  outputHtml(fits);
};

// show results in HTML
const outputHtml = fits => {
  if (fits.length > 0) {
    const html = fits
      .map(
        fit => `
     <div class="row">
     <div class="col s12">
       <div class="card  grey darken-4 darken-1">
         <div class="card-content white-text">
           <h4 class="card-title m1">${fit.name} (${
          fit.version
        })<span class="blue-text m-4"> ${fit.id}</span></h4>
        <div class="card-action">
        <a>Country Code :</a>
        <a>${fit.epic}</a>
      </div>
         </div>
       </div>
     </div>
   </div>
     `
      )
      .join('');

    document.getElementById('countryList').innerHTML = html;
  }
};

document
  .getElementById('search')
  .addEventListener('input', () => searchcountry(search.value));
