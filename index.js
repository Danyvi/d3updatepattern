import { fruitBowl } from './fruitBowl.js';

const svg = d3.select('svg');

const makeFruit = type => ({type});

const fruits = d3
.range(5)
.map(() => makeFruit('apple'));

const render = () => {
  fruitBowl(svg, {
    fruits,
    height: +svg.attr('height')
  })
};

render();

// Eat an Apple
setTimeout(()=>{
  fruits.pop();
  render();
}, 1000);

// Replacing an Apple with a Lemon
setTimeout(()=>{
  fruits[2].type='lemon';
  console.log('updated with lemon: ',fruits);
  render();
}, 2000);