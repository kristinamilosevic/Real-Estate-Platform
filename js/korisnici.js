const KORISNICI_URL = 'https://fitnescentri-6790a-default-rtdb.firebaseio.com/korisnici';

const fetchKorisnici = async () => {
    const response = await fetch(KORISNICI_URL + '.json');
  
    if (response.status !== 200) {
      throw new Error();
    }
  
    const responseJson = await response.json();
  
    return responseJson;
  };

const fetchKorisnikById = async (korisnikId) => {
  const response = await fetch(KORISNICI_URL + '/' + korisnikId + '.json');

  if (response.status !== 200) {
    throw new Error();
  }

  return await response.json();
}

const obrisiKorisnikaById = async (korisnikId) => {
    const response = await fetch(KORISNICI_URL + '/' + korisnikId + '.json', {
      method: "DELETE",
    });

    if (response.status !== 200) {
      return false;
    }

    return true;
}

const onObrisiKorisnika = async (korisnikId) => {
  if (confirm("Da li ste sigurni da zelite da obrisete korisnika ?")) {
    const daLiJeKorisnikObrisan = await obrisiKorisnikaById(korisnikId);

    if (daLiJeKorisnikObrisan) {
      const korisnikEl = document.getElementById('korisnik-' + korisnikId);
      korisnikEl.remove();
    }
  }
}

const izmeniKorisnikaById = async (korisnikId, podaci) => {
  const response = await fetch(KORISNICI_URL + '/' + korisnikId + '.json', {
    method: 'PATCH',
    body: JSON.stringify(podaci),
  });

  if (response.status !== 200) {
    return false;
  }

  return true;
}

function onKorisnikEdit() {
  const podaciKorisnikaReadOnlyEl = document.getElementById("podaciKorisnikaReadOnly");
  const podaciKorisnikaEditEl = document.getElementById("podaciKorisnikaEdit");

  podaciKorisnikaReadOnlyEl.style.display = podaciKorisnikaReadOnlyEl.style.display === "none" ? "initial" : "none";
  podaciKorisnikaEditEl.style.display = podaciKorisnikaEditEl.style.display === "none" ? "initial" : "none";
}

const izmeniKorisnika = async () => {
  const searchParams = new URLSearchParams(location.search);
  const korisnikId = searchParams.get("korisnik");
  
  const ime = document.getElementById("korisnik-ime").value; 
  const prezime = document.getElementById("korisnik-prezime").value; 
  const datumRodjenja = document.getElementById("korisnik-datumRodjenja").value; 
  const korisnickoIme = document.getElementById("korisnik-korisnicko-ime").value; 
  const email = document.getElementById("korisnik-email").value; 
  const adresa = document.getElementById("korisnik-adresa").value; 
  const telefon = document.getElementById("korisnik-telefon").value; 

  const podaciZaAzuriranje = {
    ime,
    prezime,
    datumRodjenja,
    korisnickoIme,
    email,
    adresa,
    telefon,
  };

  const izmenaUspesna = await izmeniKorisnikaById(korisnikId, podaciZaAzuriranje);

  if (izmenaUspesna) {
    onKorisnikEdit();

    prikaziPodatkeOKorisniku(korisnikId);
  }
}

const prikaziPodatkeOKorisniku = async (korisnikId) => {
 const korisnik = await fetchKorisnikById(korisnikId);

 const podaciKorisnika = document.getElementById("podaciKorisnika");

 podaciKorisnika.innerHTML = `
  <div id="podaciKorisnikaReadOnly">
    <p><b>Ime:</b> <span>${korisnik.ime}</span></p>
    <p><b>Prezime:</b> <span>${korisnik.prezime}</span></p>
    <p><b>Datum Rodjenja:</b> <span>${korisnik.datumRodjenja}</span></p>
    <p><b>Korisničko ime:</b> <span>${korisnik.korisnickoIme}</span></p>
    <p><b>E-mail adresa:</b> <span>${korisnik.email}</span></p>
    <p><b>Adresa:</b> <span>${korisnik.adresa}</span></p>
    <p><b>Broj:</b> <span>${korisnik.telefon}</span></p>
  </div>
  <div id="podaciKorisnikaEdit" style="display: none;">
    <p>Ime: <input id="korisnik-ime" value="${korisnik.ime}"></input></p>
    <p>Prezime: <input id="korisnik-prezime" value="${korisnik.prezime}"></input></p>
    <p>Datum Rodjenja: <input id="korisnik-datumRodjenja" type="date" value="${korisnik.datumRodjenja}"></input></p>
    <p>Korisničko ime: <input id="korisnik-korisnicko-ime" value="${korisnik.korisnickoIme}"></input></p>
    <p>E-mail adresa: <input id="korisnik-email" type="email" value="${korisnik.email}"></input></p>
    <p>Adresa: <input id="korisnik-adresa" value="${korisnik.adresa}"></input></p>
    <p>Broj: <input id="korisnik-telefon" value="${korisnik.telefon}"></input></p>
    <button onclick="izmeniKorisnika()">Sacuvaj</button>
  </div>
 `;
}
  const populateData = async () => {
    const data = await fetchKorisnici();
    let tableKorisnici = document.getElementsByClassName('table-korisnici');
  
    Object.keys(data).forEach((korisnikId) => {
      let tr = document.createElement('tr');
      tr.id = 'korisnik-' + korisnikId;

      let tdIme = document.createElement('td');
      let tdPrezime = document.createElement('td');
      let tdmorebtn = document.createElement('td');
      let tddeletebtn = document.createElement('td');
      
      let morebtn = document.createElement('a');
      // morebtn.className = 'button4';
      morebtn.innerHTML = 'Prikazi vise';
      morebtn.href = 'detalji_o_korisniku.html' + '?korisnik=' + korisnikId;

      let deletebtn = document.createElement('button');
      deletebtn.className = 'button4';
      deletebtn.innerHTML = 'Obrisi';
      deletebtn.onclick = () => onObrisiKorisnika(korisnikId); 

      tdmorebtn.append(morebtn);
      tddeletebtn.append(deletebtn);
      tdIme.innerHTML = data[korisnikId].ime;
      tr.append(tdIme);
      tdPrezime.innerHTML = data[korisnikId].prezime;
      tr.append(tdPrezime);
      tr.append(tdmorebtn);
      tr.append(tddeletebtn);
      tableKorisnici[0].appendChild(tr);
    });
  };

