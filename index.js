const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const colorScale = d3.scaleOrdinal()
  .domain(['apple','lemon'])
  .range(['#c11d1d','#eae600']);

const radiusScale = d3.scaleOrdinal()
  .domain(['apple','lemon'])
  .range([50,30]);


// selection is the selection of the parent element, in our case the svg 
// { fruits } (destructures whatever comes in as fruits). It acts as props and is an object
const render = (selection, { fruits }) => {
  // the circles variable is the data join itself 
  const circles = selection.selectAll('circle')
    .data(fruits);

  
  circles
    .enter() // defining enter selection
      .append('circle')
      .attr('cx', (d,i) => i * 120 + 60)
      .attr('cy', (d,i) => height/2)
  // end of enter selection
    /**
     * when you are calling merge on the enter selection and pass the update selection 
     * this merge function returns a brand new selection
     * that contains both the enter selection and the update selection
     */
    .merge(circles) // we are passing the circles, that is the update selection
      // the next 2 lines of code takes effect both on the entering items and the updating items
      // any attributes that you want to change with subsequent invocations,
      // needs to be called in the merge selection
      .attr('r', d => radiusScale(d.type))
      .attr('fill', d => colorScale(d.type));

  // update selection
  // circles
  //   .attr('r', d => radiusScale(d.type))
  //   .attr('fill', d => colorScale(d.type));

  // exit selection
  circles
    .exit()
    .remove();
}

const makeFruit = type => ({type});

const fruits = d3
  .range(5)
  .map(() => makeFruit('apple'));

render(svg, { fruits });

// Eat an Apple
setTimeout(()=>{
  fruits.pop();
  render(svg, { fruits });
}, 1000);

// Replacing an Apple with a Lemon
setTimeout(()=>{
  fruits[2].type='lemon';
  console.log('updated with lemon: ',fruits);
  render(svg, { fruits });
}, 2000);

