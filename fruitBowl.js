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

  const groups = selection.selectAll('g')
    .data(fruits);

  const groupsEnter = groups
      .enter()
        .append('g');

  groupsEnter
      .merge(groups)
        .attr('transform', (d,i) => `translate(${i * 180 + 100}, ${height/2})`)
    groups
      .exit()
      .remove();

  groupsEnter
    .append('circle')
    .merge(groups.select('circle'))
      .attr('r', d => radiusScale(d.type))
      .attr('fill', d => colorScale(d.type));

  groupsEnter
    .append('text')
    .merge(groups.select('text'))
      .text(d => d.type)
      .attr('y', 120);

}