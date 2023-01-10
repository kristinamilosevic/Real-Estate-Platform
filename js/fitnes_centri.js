const FITNESCENTRI_URL = 'https://fitnescentri-6790a-default-rtdb.firebaseio.com/fitnesCentri';

  const fetchFitnesCentre = async () => {
      const response = await fetch(FITNESCENTRI_URL + '.json');
  
    if (response.status !== 200) {
      throw new Error();
    }
  
    const responseJson = await response.json();
  
    return responseJson;
};

const obrisiFitnesCentarById = async (fitnesCentarId) => {
    const response = await fetch(FITNESCENTRI_URL + '/' + fitnesCentarId + '.json', {
      method: "DELETE",
    });

    if (response.status !== 200) {
      return false;
    }

    return true;
}

const onObrisiFitnesCentar = async (fitnesCentarId) => {
  if (confirm("Da li ste sigurni da zelite da obrisete ovaj fitnes centar ?")) {
    const daLiJeFitnesCentarObrisan = await obrisiFitnesCentarById(fitnesCentarId);

    if (daLiJeFitnesCentarObrisan) {
      const fitnesCentarEl = document.getElementById('fitnesCentar-' + fitnesCentarId);
      fitnesCentarEl.remove();
    }
  }
}
  
  const populateData = async () => {
    const data = await fetchFitnesCentre();
    let tableFitnesCentri = document.getElementsByClassName('table-fitnes-centri');
  
    Object.keys(data).forEach((fitnesCentarId) => {
      let tr = document.createElement('tr');
      tr.id = 'fitnesCentar-' + fitnesCentarId;

      let td = document.createElement('td');
      let tdbtn = document.createElement('td');
  
      let btn = document.createElement('button');
      btn.className = 'button4';
      btn.innerHTML = 'Obrisi';
      btn.onclick = () => onObrisiFitnesCentar(fitnesCentarId); 

      tdbtn.append(btn);
      td.innerHTML = data[fitnesCentarId].naziv;
      tr.append(td);
      tr.append(tdbtn);
      tableFitnesCentri[0].appendChild(tr);
    });
  };
  
  populateData(); 