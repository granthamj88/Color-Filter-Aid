const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');

hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;

    inputColor.style.backgroundColor = hex;
})

const isValidHex = (hex) => {
    var re = /[0-9A-Fa-f]{6}/;
    var re2 = /[0-9A-Fa-f]{3}/;
    if(!hex) return false;

    const strippedHex = hex.replace('#', '');
    return re.test(strippedHex) && strippedHex.length === 6 || re2.test(strippedHex) && strippedHex.length === 3 ;
}

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;
    let rgb = '';
    let strippedHex = hex.replace('#', '');

    if(strippedHex.length === 3) {
        for(let i = 0; i<strippedHex.length; i++){
            rgb += strippedHex[i] + strippedHex[i]
        }
    }
    const r = parseInt(rgb.substring(0, 2), 16);
    const g = parseInt(rgb.substring(2, 4), 16);
    const b = parseInt(rgb.substring(4, 6), 16);

    return {r, g, b}
}
    
console.log(convertHexToRGB("123"));
    