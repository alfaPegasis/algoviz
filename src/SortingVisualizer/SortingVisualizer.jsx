import React from "react";
import "./SortingVisualizer.css";
import { Component } from "react";
import * as algorithms from "../algorithms/algorithms.js";
export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }
  componentDidMount() {
    this.resetArray();
  }
  resetArray() {
    const array = [];
    for (let i = 0; i < 250; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({ array });
  }
  mergeSort() {
    // const jsSortedArray = this.state.array.slice().sort((a, b) => a - b)
    // const sortedArray = algorithms.mergeSort(this.state.array)
    // console.log(arraysAreEqual(jsSortedArray, sortedArray))
    // console.log(sortedArray)

    const animations = algorithms.mergeSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "blue" : "turquoise";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 3);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 3);
      }
    }
  }
  quickSort() {}
  heapSort() {}
  bubbleSort() {}
  render() {
    const { array } = this.state;
    return (
      <div className="container">
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
      <button onClick={() => this.heapSort()}>Heap Sort</button>
      <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
      </div>
    );
  }
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(array1, array2) {
//   if (array1.length !== array2.length){
//     return false
//   }
//   for (let i = 0; i< array1.length; i++){
//     if (array1[i] !== array2[i]){
//       return false

//     }
//   return true
//   }

// }
