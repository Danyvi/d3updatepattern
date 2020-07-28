const colorScale = d3.scaleOrdinal()
  .domain(['apple','lemon'])
  .range(['#c11d1d','#eae600']);

const radiusScale = d3.scaleOrdinal()
  .domain(['apple','lemon'])
  .range([50,30]);

// selection is the selection of the parent element, in our case the svg 
// { fruits } (destructures whatever comes in as fruits)
export const fruitBowl = (selection, props) => {
  const { fruits, height } = props;
  // the circles variable is the data join itself 
  const circles = selection.selectAll('circle')
    .data(fruits);

  
  circles
    .enter()
      .append('circle')
      .attr('cx', (d,i) => i * 120 + 60)
      .attr('cy', (d,i) => height/2)
    .merge(circles)
      .attr('r', d => radiusScale(d.type))
      .attr('fill', d => colorScale(d.type));

  circles
    .exit()
    .remove();
}