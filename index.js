const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const inputColorText = document.getElementById('inputColorText');

// const cBox = document.getElementsByClassName('CBox');
const iBox = document.querySelectorAll('.IBox');
const cBox = document.querySelectorAll('.CBox');
const hBox = document.querySelectorAll('.HBox');
const sBox = document.querySelectorAll('.SBox');

const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider');

const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

/* event listener arrow function switches lighten/darken switch using 
    getBy and .classList to add and remove the needed classes */
toggleBtn.addEventListener('click', () => {
  
  if(toggleBtn.classList.contains('toggled')){
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
  } else {
    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
  }
  reset();
})

/* event listener arrow function reads hex input and assines it to main
     input color background */
hexInput.addEventListener('keyup', () => {
    
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;
    
    const strippedHex = hex.replace('#', '');
    inputColor.style.backgroundColor = "#" + strippedHex;
    inputColorText.innerText = `Hex Color: ${strippedHex}`;  
    reset();
})

/* event listener arrow function */
slider.addEventListener('input', () => {
    if(!isValidHex(hexInput.value)) return;
    
    sliderText.textContent = `${slider.value}%`;

    const valueAddition = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value;
    
    const alteredHex = alterColor(hexInput.value, valueAddition);

    for (let i = 0; i < iBox.length; i++){
      iBox[i].style.backgroundColor = alteredHex;
      if(i == 0){iBox[i].style.filter = "invert(25%)";}
      if(i == 1){iBox[i].style.filter = "invert(75%)";}
      if(i == 2){iBox[i].style.filter = "invert(100%)";}
    }

    for (let i = 0; i < cBox.length; i++){
      cBox[i].style.backgroundColor = alteredHex;
      if(i == 0){cBox[i].style.filter = "contrast(25%)";}
      if(i == 1){cBox[i].style.filter = "contrast(75%)";}
      if(i == 2){cBox[i].style.filter = "contrast(100%)";}
    }

    for (let i = 0; i < hBox.length; i++){
      hBox[i].style.backgroundColor = alteredHex;
      if(i == 0){hBox[i].style.filter = "hue-rotate(90deg)";}
      if(i == 1){hBox[i].style.filter = "hue-rotate(180deg)";}
      if(i == 2){hBox[i].style.filter = "hue-rotate(270deg)";}
    }

    for (let i = 0; i < sBox.length; i++){
      sBox[i].style.backgroundColor = alteredHex;
      if(i == 0){sBox[i].style.filter = "sepia(25%)";}
      if(i == 1){sBox[i].style.filter = "sepia(75%)";}
      if(i == 2){sBox[i].style.filter = "sepia(100%)";}
    }

  })   

const isValidHex = (hex) => {
    var re = /[0-9A-Fa-f]{6}/;
    var re2 = /[0-9A-Fa-f]{3}/;
    if(!hex) return false;

    const strippedHex = hex.replace('#', '');
    return (re2.test(strippedHex) && strippedHex.length === 3) || (re.test(strippedHex) && strippedHex.length === 6) ;
}

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;
    
    let strippedHex = hex.replace('#', '');

    if(strippedHex.length === 3){
        strippedHex = strippedHex[0] + strippedHex[0] 
        + strippedHex[1] + strippedHex[1] 
        + strippedHex[2] + strippedHex[2];
    }
  
    const r  = parseInt(strippedHex.substring(0,2), 16);
    const g  = parseInt(strippedHex.substring(2,4), 16);
    const b  = parseInt(strippedHex.substring(4,6), 16);
     
    return {r, g, b};
}

const convertRGBToHex = (r,g,b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);
  
  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
}
    
const alterColor = (hex, percentage) => {
    const {r, g, b} = convertHexToRGB(hex);
    const amount = Math.floor((percentage/100) * 255);

    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);
    return convertRGBToHex(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
    return Math.min(255, Math.max(0, hex + amount));
}

const reset = () =>{ 
    slider.value = 0;
    sliderText.innerText=`0%`;
    cBox.style.backgroundColor = hexInput.value;
    alteredColorText.innerText = `Complementary Color: ${hexInput.value}`; 
  
}


  