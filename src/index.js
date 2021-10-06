import _ from 'lodash';
import { bubbleSort } from './bubbleSort'
import { selectionSort } from './selectionSort';
import './style.css'

const SLEEP_TIME_MS = 10;
const NUMBER_OF_ELEMENTS = 30;

const DEFAULT_COLOR = 'lightskyblue';
const HIGHLIGHT_COLOR = 'tomato';
const COMPLETED_COLOR = 'gold';

let array = [];

const visualizeSort = () => {
    selectionSort();
}

const swap = (i, j) => {
    const blockOne = document.querySelector(`[data-index="${i}"]`);
    const blockTwo = document.querySelector(`[data-index="${j}"]`);

    (blockOne.childNodes[0]).style.height = (array[j] * 10) + 'px';
    (blockOne.childNodes[1]).textContent = array[j];

    (blockTwo.childNodes[0]).style.height = (array[i] * 10) + 'px';
    (blockTwo.childNodes[1]).textContent = array[i];

    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// STATUS: complete = COMPLETED_COLOR
// STATUS: default = DEFAULT_COLOR
// STATUS: comparing = HIGHLIGHT_COLOR
const highlightBlock = (index, status) => {
    const block = document.querySelector(`[data-index="${index}"]`);
    switch (status) {
        case 'default':
            block.firstChild.style.backgroundColor = DEFAULT_COLOR;
            break;
        case 'complete':
            block.firstChild.style.backgroundColor = COMPLETED_COLOR;
            break;
        case 'comparing':
            block.firstChild.style.backgroundColor = HIGHLIGHT_COLOR;
            break;
        default:
            block.firstChild.style.backgroundColor = DEFAULT_COLOR;
    }
}

const randomizeArray = (numberOfElements) => {
    for (let i = 0; i < numberOfElements; i++) {
        array.push(_.random(1, 100));
    }
}

const setup = () => {
    renderArray();
    setupButtons();
}

const setupButtons = () => {
    const buttonContainer = document.getElementById('button-container');
    
    const playButton = document.createElement('button');
    playButton.textContent = 'VISUALIZE';
    playButton.addEventListener('click', () => visualizeSort());

    buttonContainer.appendChild(playButton);
}

const renderArray = () => {
    const arrayContainer = document.getElementById('array-container');
    removeAllChildNodes(arrayContainer);

    for (let i = 0; i < array.length; i++) {
        const arrayBlockContainer = document.createElement('div');
        arrayBlockContainer.classList = 'array-block-container';
        arrayBlockContainer.setAttribute('data-index', i);
        
        const arrayBlock = document.createElement('div');
        arrayBlock.classList = 'array-block';
        arrayBlock.style.width = arrayContainer.offsetWidth / array.length + 'px';
        arrayBlock.style.height = (array[i] * 10) + 'px';

        const arrayBlockText = document.createElement('p');
        arrayBlockText.classList = 'array-block-text';
        arrayBlockText.textContent = array[i];
        
        arrayBlockContainer.appendChild(arrayBlock);
        arrayBlockContainer.appendChild(arrayBlockText);
        arrayContainer.appendChild(arrayBlockContainer);
    }
}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

randomizeArray(NUMBER_OF_ELEMENTS);
setup();

export { SLEEP_TIME_MS, array, swap, highlightBlock, sleep };