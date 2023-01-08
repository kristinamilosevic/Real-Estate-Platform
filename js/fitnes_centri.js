const fetchFitnesCentre = async () => {
    const response = await fetch('https://fitnescentri-6790a-default-rtdb.firebaseio.com/fitnesCentri.json');
  
    if (response.status !== 200) {
      throw new Error();
    }
  
    const responseJson = await response.json();
  
    return responseJson;
  };
  
  const populateData = async () => {
    const data = await fetchFitnesCentre();
    let tableFitnesCentri = document.getElementsByClassName('table-fitnes-centri');
  
    Object.keys(data).forEach((key) => {
      let tr = document.createElement('tr');
      let td = document.createElement('td');
      let tdbtn = document.createElement('td');
  
      let btn = document.createElement('button');
      btn.className = 'button4';
      btn.innerHTML = 'Obrisi';
      tdbtn.append(btn);
      td.innerHTML = data[key].naziv;
      tr.append(td);
      tr.append(tdbtn);
      tableFitnesCentri[0].appendChild(tr);
    });
  };
  
  populateData(); 