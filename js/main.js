const fetchIndex = async () => {
    const response = await fetch('https://fitnescentri-6790a-default-rtdb.firebaseio.com/fitnesCentri.json');
  
    if (response.status !== 200) {
      throw new Error();
    }
  
    const responseJson = await response.json();
  
    return responseJson;
  };
  
  const populateData = async () => {
    const data = await fetchIndex();
    const gymWrapper = document.getElementById('gymWrapper');
    Object.keys(data).forEach((key) => { 
      let gym = document.createElement('div');
      let gymL = document.createElement('div');
      let gymD = document.createElement('div');
  
      gym.className = 'gym';
  
      gymL.className = 'gymL';
      gymL.id = 'flexL';
  
      gymD.className = 'gymD';
      gymD.id = 'flexD';
  
      let h1 = document.createElement('h1');
      h1.innerHTML = data[key].naziv;
      h1.className = 'naziv';
      gymD.append(h1);
  
      let img = document.createElement('img');
      img.src = data[key].slika;
      img.className = 'gymimg';
      img.id = 'fleximg';
      gymL.append(img);
  
      let btn = document.createElement('button');
      btn.className = 'button';
      btn.type = 'button';
  
      let atag = document.createElement('a');
      atag.className = 'buttontxt';
      atag.href = `flex.html?gym=${key}`;
      atag.innerHTML = 'Vise...';
      btn.append(atag);
      gymD.append(btn);
  
      gym.append(gymL);
      gym.append(gymD);
      gymWrapper.append(gym);
    });
  };
  
  populateData();
  