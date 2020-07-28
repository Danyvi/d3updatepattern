const colorScale = d3.scaleOrdinal()
  .domain(['apple','lemon'])
  .range(['#c11d1d','#eae600']);

const radiusScale = d3.scaleOrdinal()
  .domain(['apple','lemon'])
  .range([80,50]);

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
      .attr('cx', (d,i) => i * 180 + 100)
      .attr('cy', (d,i) => height/2)
    .merge(circles)
      .attr('r', d => radiusScale(d.type))
      .attr('fill', d => colorScale(d.type));

  circles
    .exit()
    .remove();

  // text label logic without nesting
  const text = selection.selectAll('text')
    .data(fruits);

  text
    .enter()
      .append('text')
      .attr('x', (d,i) => i * 180 + 100)
      .attr('y', (d,i) => height/2 + 120)
    .merge(text)
      .text(d => d.type);

  text
    .exit()
    .remove();
}