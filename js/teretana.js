const TERETANA_URL = 'https://fitnescentri-6790a-default-rtdb.firebaseio.com/fitnesCentri';

const fetchTeretana = async () => {
    const response = await fetch(TERETANA_URL + '.json');
  
    if (response.status !== 200) {
      throw new Error();
    }
  
    const responseJson = await response.json();
  
    return responseJson;
  }; 

const fetchTeretanaById = async (teretanaId) => {
  const response = await fetch(TERETANA_URL + '/' + teretanaId + '.json');

  if (response.status !== 200) {
    throw new Error();
  }

  return await response.json();
}

const prikaziPodatkeOTeretani = async (teretanaId) => {
  const teretana = await fetchTeretanaById(teretanaId);
 
}  
 

const populateData = async () => {
  const searchParams = new URLSearchParams(location.search);
  const teretanaId = searchParams.get("gym");
  const data = await fetchTeretanaById(teretanaId);
  console.log('aa', data['naziv'])
  const gymWrapper2 = document.getElementById('gymWrapper2');
  
  { 
    let br = document.createElement('br');
    let br1 = document.createElement('br');
    let br2 = document.createElement('br');
    let br3 = document.createElement('br');
    let naslov = document.createElement('div'); 
    let glavnigym = document.createElement('div');
    let glgymL = document.createElement('div');
    let glgymD = document.createElement('div');

    naslov.className = 'naslov';
    naslov.id = 'naslov';

    glavnigym.className = 'glavnigym';
    glavnigym.id = 'glavnigym'

    glgymL.className = 'glgymL';
    glgymL.id = 'glgymL';

    glgymD.className = 'glgymD';
    glgymD.id = 'glgymD';

    let h1 = document.createElement('h1');
    h1.innerHTML = data.naziv;
    h1.className = 'ime';
    naslov.append(h1);

    let img = document.createElement('img');
    img.src = data.slika;
    img.className = 'slika2';
    img.id = 'slika2';
    glgymL.append(img);

    let lista = document.createElement('ul');

    let adresa = document.createElement('li');
    adresa.innerHTML = `ADRESA: ${data.adresa}`;

    let godinaOtvaranja = document.createElement('li');
    godinaOtvaranja.innerHTML = `GODINA OTVARANJA: ${data.godinaOtvaranja}`;

    let mesecnaClanarina = document.createElement('li');
    mesecnaClanarina.innerHTML = `MESECNA CLANARINA: ${data.mesecnaClanarina}`;

    let prosecnaOcena = document.createElement('li');
    prosecnaOcena.innerHTML = `PROSECNA OCENA: ${data.prosecnaOcena}`;

    let dostupniTreninzi = document.createElement('li');
    dostupniTreninzi.innerHTML = `DOSTUPNI TRENINZI: ${data.brojDostupnihTreninga}`;  

    lista.append(adresa);
    lista.append(br);
    lista.append(godinaOtvaranja);
    lista.append(br1);
    lista.append(mesecnaClanarina);
    lista.append(br2);
    lista.append(prosecnaOcena);
    lista.append(br3);
    lista.append(dostupniTreninzi);

    glgymD.append(lista)
  
    glavnigym.append(glgymL);
    glavnigym.append(glgymD);
    gymWrapper2.append(naslov);
    gymWrapper2.append(glavnigym);
  };
}; 

populateData();
