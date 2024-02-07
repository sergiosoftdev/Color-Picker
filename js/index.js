function hexToHsl(hex) {
  
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
  
    const normalizedR = r / 255;
    const normalizedG = g / 255;
    const normalizedB = b / 255;
  
    const minVal = Math.min(normalizedR, normalizedG, normalizedB);
    const maxVal = Math.max(normalizedR, normalizedG, normalizedB);
  
    const luminosity = (maxVal + minVal) / 2;
  
    let hue, saturation;
  
    if (maxVal === minVal) {
      hue = saturation = 0;
    } else {
      const d = maxVal - minVal;
      saturation = luminosity > 0.5 ? d / (2 - maxVal - minVal) : d / (maxVal + minVal);
  
      // Calcular el matiz
      switch (maxVal) {
        case normalizedR:
          hue = (normalizedG - normalizedB) / d + (normalizedG < normalizedB ? 6 : 0);
          break;
        case normalizedG:
          hue = (normalizedB - normalizedR) / d + 2;
          break;
        case normalizedB:
          hue = (normalizedR - normalizedG) / d + 4;
          break;
      }
  
      hue /= 6;
    }
  
    return {
      h: Math.round(hue * 360),
      s: Math.round(saturation * 100),
      l: Math.round(luminosity * 100)
    };
}

function generatePalette(hsl, flexParent){
    let h = 10;
    for(let elemento of flexParent.children){
        elemento.style.backgroundColor = "hsl("+hsl["h"]+", "+hsl["s"]+"%,"+h+"%)";
        elemento.setAttribute("data-color", "hsl("+hsl["h"]+", "+hsl["s"]+"%,"+h+"%)")
        h = h + 10;
    }

}

function newGeneratePalette(hsl, flexParent){
  let h = 10;
  let index = 0;

  const myInterval = setInterval(()=>{

    if (index >= flexParent.children.length) {
      clearInterval(myInterval); 
      setTimeout(() => {
        for(let elemento of flexParent.children){
          elemento.classList.remove("animated")
          console.log("hola");
        }
      }, 500);
      return;
    }

    if(index < flexParent.children.length){

      const elemento = flexParent.children[index];
      elemento.style.backgroundColor = "hsl("+hsl["h"]+", "+hsl["s"]+"%,"+h+"%)";
      elemento.setAttribute("data-color", "hsl("+hsl["h"]+", "+hsl["s"]+"%,"+h+"%)")
      elemento.classList.add("animated")
      h = h + 10;
      index++;

    }
  }, 100)


}

function myClick(){
    
    let hexInput = document.getElementById("colorInput");
    let flexColor = document.getElementById("flexColor");
    let colorBall = document.getElementById("color");
    
    colorBall.style.backgroundColor = "#"+hexInput.value;

    newGeneratePalette(hexToHsl(hexInput.value), flexColor);
}


document.addEventListener('DOMContentLoaded', () => {

    let flexColor = document.getElementById("flexColor");
    generatePalette({h: 0, s: 0, l: 0}, flexColor)

    let firstRec = document.getElementById("firstRec");
    let secRec = document.getElementById("secRec");
    let thirdRec = document.getElementById("thirdRec");

    generatePalette(hexToHsl("A4975F"), firstRec);
    generatePalette(hexToHsl("FF1177"), secRec);
    generatePalette(hexToHsl("99FF9C"), thirdRec);

    let colorBasis = document.querySelectorAll(".color-basis");
    
    colorBasis.forEach(color => {

      color.addEventListener("click", () => {

        navigator.clipboard.writeText(color.getAttribute("data-color"));
        if(color.classList.contains("copied")){
          color.classList.remove("copied");
        }else{
          color.classList.add("copied");
        }
        setTimeout(() => {
          color.classList.remove("copied");
        }, 2000)

      })

      color.addEventListener("mouseover", () => {
        color.classList.add("copy");
      })

      color.addEventListener("mouseout", () => {
        color.classList.remove("copy");
      })

    })
    

})