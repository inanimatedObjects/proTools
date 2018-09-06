function slider(data) {
  let margin = {top: 100, left: 15},
    width  = 280,
    height = 150,
    axisWidth = width - 2 * margin,
    handle, slider, line;

  let x = d3.scaleLinear()
    .domain([0, 1])
    .range ([0, width])
    .clamp(true);


  function drawSlider(svg) {

    slider = svg.append("g")
      .attr("class", "slider")
      .attr("transform", "translate(37.5, 25)")
      .attr("width", width)
      .attr("height", height)
      // ^ needs adjustment

    let id = svg.attr("id");

    line = slider.append("line")
      .attr("class", "slideLine")
      .attr("x1", x.range()[0])
    	.attr("x2", x.range()[1])
    	.attr("y1", height / 2)
    	.attr("y2", height / 2)

    slider.append("circle")
    	.attr("class", "handle" + id)
    	.attr("cy", height / 2)
    	.attr("r", 13)
      .call(d3.drag()
      	.on("start drag", function() { handleSlide(x.invert(d3.event.x), id, this.totalComp) }))

    function handleSlide(d, id) {
        let startVal = offerArr[id]
        console.log('sv: ', startVal)

        d3.select(".handle" + id)
            .attr("cx", x(d));

        d3.select(".val" + id)
            .text("$" + Math.round(data[id].min + (d * (data[id].max - data[id].min))) + "k")

        let endVal = d3.select(".val" + id).text()
        endVal = Number(endVal.substring(1, endVal.length - 1))
        console.log('ev: ', endVal)

        newTotal = newTotal - startVal + endVal;
        console.log('tc:', newTotal)

        offerArr[id] = endVal

        d3.select(".adjustedValue")
            .text("counter-offer: $" + Math.round(newTotal, 0) + "k")

    }
  }
  return drawSlider;
}
