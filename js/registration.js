const REGISTRATION_URL = 'https://fitnescentri-6790a-default-rtdb.firebaseio.com/korisnici';

const fetchUsers = async () => {
    const response = await fetch(REGISTRATION_URL + '.json');
  
    if (response.status !== 200) {
      throw new Error();
    }
  
    const responseJson = await response.json();
  
    return responseJson;
  };


const togglePopup = () => {
    const userNav = document.getElementById('popup')
    userNav.style.display = userNav.style.display === 'flex' ? 'none' : 'flex'
}

switchRegistration = () => {
    const LoginForm = document.getElementById('LoginForm')
    const RegForm = document.getElementById('RegForm')

    LoginForm.style.display = LoginForm.style.display === 'block' ? 'none' : 'block'
    RegForm.style.display = RegForm.style.display === 'none' ? 'block' : 'none'
}

loginHandler = async () =>{
    const email = document.getElementById('korisnickoIme').value
    const sifra = document.getElementById('sifra').value

    const data = await fetchUsers();
    const isTrue = false;
    Object.keys(data).forEach((korisnikId) => {
        if(data[korisnikId].email===email && data[korisnikId].lozinka===sifra){
            alert("Uspesno ste se prijavili!")
            isTrue = true;
        }
    }
    )
    if(!isTrue){
        alert("Podaci nisu ispravni")
    }
    location.reload()
}

registerHandler = async () => {
    const ime = document.getElementById('ime').value
    const prezime = document.getElementById('prezime').value
    const email = document.getElementById('email').value
    const korisnickoIme = document.getElementById('korisnickoImeR').value
    const sifra = document.getElementById('sifraR').value
    const adresa = document.getElementById('adresa').value
    const datumRodjenja = document.getElementById('datumRodjenja').value
    const telefon = document.getElementById('telefon').value

    const korisnik = {
        ime,
        prezime,
        email,
        sifra,
        korisnickoIme,
        adresa,
        datumRodjenja,
        telefon
    }
    const sacuvanKorisnik = await sacuvajKorisnika(korisnik)

    if(sacuvanKorisnik){
        alert('Uspesno sacuvan korisnik')
    }else{
        alert("Podaci nisu korektni")
    }

    location.reload()

}

const sacuvajKorisnika = async (podaci) => {
    const response = await fetch(REGISTRATION_URL + '.json', {
      method: 'POST',
      body: JSON.stringify(podaci),
    });

    if (response.status !== 200) {
      return false;
    }
  
    return true;
  }