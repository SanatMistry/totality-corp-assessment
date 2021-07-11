// slider js
const curve = {
    x: 0,
    y: 0,
    cpx: 175,
    cpy: 75,
    endx: 350,
    endy: 0
  }

  let percent = 0.5
  
  let curveEl = document.getElementById('curve')
  let thumbEl = document.getElementById('thumb')
  
  // get the XY at the specified percentage along the curve
  const getQuadraticBezierXYatPercent = (curve, percent) => {
    let x = Math.pow(1 - percent, 2) * curve.x + 2 * (1 - percent) * percent 
      * curve.cpx + Math.pow(percent, 2) * curve.endx
    let y = Math.pow(1 - percent, 2) * curve.y + 2 * (1 - percent) * percent 
      * curve.cpy + Math.pow(percent, 2) * curve.endy
  
    return { x, y }
  }
  
  const drawCurve = () => {
    curveEl.setAttribute(
      'd',
      `M${curve.x},${curve.y} Q ${curve.cpx},${curve.cpy} ${curve.endx},${curve.endy}`
    )
  }
  
  const drawThumb = percent => {
      let pos = getQuadraticBezierXYatPercent(curve, percent)
    // document.getElementById('value').textContent = percent * 100
    
    thumbEl.setAttribute('cx', pos.x)
    thumbEl.setAttribute('cy', pos.y)
  }
  
  const moveThumb = e => {
    percent = (e.target.value-50) / 100
    // console.log(percent)
    drawThumb((e.target.value) / 100)
  }
  
  // event on the range input
  let rangeEl = document.getElementById('range')
  rangeEl.value = percent * 100
  rangeEl.addEventListener('input', moveThumb)
  
  // init
  drawCurve()
  drawThumb(percent)