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

const fetchFitnesCentarById = async (fitnesCentarId) => {
  const response = await fetch(FITNESCENTRI_URL + '/' + fitnesCentarId + '.json');

  if (response.status !== 200) {
    throw new Error();
  }

  return await response.json();
}

const izmeniFitnesCentarById = async (fitnesCentarId, podaci) => {
  const response = await fetch(FITNESCENTRI_URL + '/' + fitnesCentarId + '.json', {
    method: 'PATCH',
    body: JSON.stringify(podaci),
  });

  if (response.status !== 200) {
    return false;
  }

  return true;
}

function onFitnesCentarEdit() {
  const podaciFitnesCentraReadOnlyEl = document.getElementById("podaciFitnesCentraReadOnly");
  const podaciFitnesCentraikaEditEl = document.getElementById("podaciFitnesCentraEdit");

  podaciFitnesCentraReadOnlyEl.style.display = podaciFitnesCentraReadOnlyEl.style.display === "none" ? "initial" : "none";
  podaciFitnesCentraikaEditEl.style.display = podaciFitnesCentraikaEditEl.style.display === "none" ? "initial" : "none";
}

const izmeniFitnesCentar = async () => {
  const searchParams = new URLSearchParams(location.search);
  const fitnesCentarId = searchParams.get("fitnesCentar");
  
  const adresa = document.getElementById("teretana-adresa").value; 
  const godinaOtvaranja = document.getElementById("teretana-godinaOtvaranja").value; 
  const mesecnaClanarina = document.getElementById("teretana-mesecnaClanarina").value; 
  const prosecnaOcena = document.getElementById("teretana-prosecnaOcena").value; 
  const dostupniTreninzi = document.getElementById("teretana-dostupniTreninzi").value; 

  const podaciZaAzuriranje = {
    adresa,
    godinaOtvaranja,
    mesecnaClanarina,
    prosecnaOcena,
    dostupniTreninzi,
  };

  const izmenaUspesna = await izmeniFitnesCentarById(fitnesCentarId, podaciZaAzuriranje);

  if (izmenaUspesna) {
    onFitnesCentarEdit();

    prikaziPodatkeOFitnesCentru(fitnesCentarId);
  }
}


const prikaziPodatkeOFitnesCentru = async (fitnesCentarId) => {
  const teretana = await fetchFitnesCentarById(fitnesCentarId);
  const podaciFitnesCentra = document.getElementById("podaciFitnesCentra");
 
  podaciFitnesCentra.innerHTML = `
   <div id="podaciFitnesCentraReadOnly">
     <p><b>Adresa:</b> <span>${teretana.adresa}</span></p>
     <p><b>Godina otvaranja:</b> <span>${teretana.godinaOtvaranja}</span></p>
     <p><b>Mesecna clanarina:</b> <span>${teretana.mesecnaClanarina}</span></p>
     <p><b>Prosecna ocena:</b> <span>${teretana.prosecnaOcena}</span></p>
     <p><b>Dostupni treninzi:</b> <span>${teretana.dostupniTreninzi}</span></p>
   </div>
   <div id="podaciFitnesCentraEdit" style="display: none;">
     <p>Adresa: <input id="teretana-adresa" value="${teretana.adresa}"></input></p>
     <p>Godina otvaranja: <input id="teretana-godinaOtvaranja" value="${teretana.godinaOtvaranja}"></input></p>
     <p>Mesecna clanarina: <input id="teretana-mesecnaClanarina" value="${teretana.mesecnaClanarina}"></input></p>
     <p>Prosecna ocena: <input id="teretana-prosecnaOcena" value="${teretana.prosecnaOcena}"></input></p>
     <p>Dostupni treninzi: <input id="teretana-dostupniTreninzi" value="${teretana.dostupniTreninzi}"></input></p>
     <button onclick="izmeniFitnesCentar()">Sacuvaj</button>
   </div>
  `;
 }
  
  const populateData = async () => {
    const data = await fetchFitnesCentre();
    let tableFitnesCentri = document.getElementsByClassName('table-fitnes-centri');
    Object.keys(data).forEach((fitnesCentarId) => {
      let tr = document.createElement('tr');
      tr.id = 'fitnesCentar-' + fitnesCentarId;

      let td = document.createElement('td');
      let tdbtn = document.createElement('td');
      let tdEditBttn = document.createElement('td');
  
      let btn = document.createElement('button');
      btn.className = 'button4';
      btn.innerHTML = 'Obrisi';
      btn.onclick = () => onObrisiFitnesCentar(fitnesCentarId); 

      let editbtn = document.createElement('a');
      // editbtn.className = 'button4';
      editbtn.innerHTML = 'Prikazi vise';
      editbtn.href = 'edit_fitnes_centri.html' + '?fitnesCentar=' + fitnesCentarId;


      tdbtn.append(btn);
      tdEditBttn.append(editbtn);
      td.innerHTML = data[fitnesCentarId].naziv;
      tr.append(td);
      tr.append(tdbtn);
      tr.append(tdEditBttn);
      tableFitnesCentri[0].append(tr);
    });
  };
  
  populateData(); 