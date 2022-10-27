const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText')

const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider');

const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
  //simplifly to a turnary
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

hexInput.addEventListener('keyup', () => {
  
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;
    
    const strippedHex = hex.replace('#', '');
  
    inputColor.style.backgroundColor = "#" + strippedHex;  
    reset();
})

slider.addEventListener('input', () => {
    if(!isValidHex(hexInput.value)) return;
    
    sliderText.textContent = `${slider.value}%`;

    const valueAddition = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value;
    
    const alteredHex = alterColor(hexInput.value, valueAddition);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color ${alteredHex}`; 
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
    let rgb = '';
    let strippedHex = hex.replace('#', '');
        /*|| strippedHex.length === 6 adding to if statment made new color in alter, test?*/

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

// alterColor("fff", 10)

const reset = () =>{ 
    slider.value = 0;
    sliderText.innerText=`0%`;
    alteredColor.style.backgroundColor = hexInput.value;
    alteredColorText.innerText = `Altered Color ${hexInput.value}`; 
  
}

//use of filter test - worked
// inputColor.style.filter = "blur(5px) grayscale(100%)"
  