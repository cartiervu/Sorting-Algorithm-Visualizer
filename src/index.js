import _, { sortBy } from 'lodash';
import './style.css'

const SLEEP_TIME_MS = 250;
const NUMBER_OF_ELEMENTS = 30;

let array = [];

const visualizeSort = () => {
    bubbleSort();
}

const visualizeSwap = (indexOne, indexTwo) => {
    const blockOne = document.querySelector(`[data-index="${indexOne}"]`);
    const blockTwo = document.querySelector(`[data-index="${indexTwo}"]`);
    blockOne.setAttribute('data-index', indexTwo);
    blockTwo.setAttribute('data-index', indexOne);

    swap(indexOne, indexTwo);

    blockTwo.parentNode.insertBefore(blockTwo, blockOne);
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            highlightBlocks(j, j+1);
            await sleep(SLEEP_TIME_MS);
            if (array[j] > array[j+1]) {
                visualizeSwap(j, j+1);
                await sleep(SLEEP_TIME_MS);
            }
            unhighlightBlock(j);
            await sleep(SLEEP_TIME_MS);
            if (j == array.length - i - 2) {
                highlightCompletedBlock(array.length - i - 1);
            }
        }
    }
}

const swap = (i, j) => {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

const highlightBlocks = (indexOne, indexTwo) => {
    const blockOne = document.querySelector(`[data-index="${indexOne}"]`);
    const blockTwo = document.querySelector(`[data-index="${indexTwo}"]`);

    blockOne.firstChild.style.backgroundColor = 'tomato';
    blockTwo.firstChild.style.backgroundColor = 'tomato';
}

const unhighlightBlock = (index) => {
    const block = document.querySelector(`[data-index="${index}"]`);

    block.firstChild.style.backgroundColor = 'lightskyblue';
}

const highlightCompletedBlock = (index) => {
    const block = document.querySelector(`[data-index="${index}"]`);
    block.firstChild.style.backgroundColor = 'gold';
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