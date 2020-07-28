import { fruitBowl } from './fruitBowl.js';

const svg = d3.select('svg');

const makeFruit = type => ({
  type,
  id: Math.random()
});

let fruits = d3
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
  render();
}, 2000);

// Eat an Apple
setTimeout(()=>{
  fruits = fruits.filter( (d,i) => i !== 1); // removing everything that doesn't have index 1 (the second element)
  render();
}, 3000);