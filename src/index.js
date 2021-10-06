import _ from 'lodash';
import { bubbleSort } from './bubbleSort'
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import './style.css'

const arrayContainer = document.getElementById('array-container');

const SLEEP_TIME_MS = 50;
const NUMBER_OF_ELEMENTS = 15;

const DEFAULT_COLOR = 'lightskyblue';
const HIGHLIGHT_COLOR = 'tomato';
const COMPLETED_COLOR = 'gold';

let array = [];


const swap = (i, j) => {
    const blockOne = document.querySelector(`[data-index="${i}"]`);
    const blockTwo = document.querySelector(`[data-index="${j}"]`);

    adjustNodeHeight(blockOne.childNodes[0], array[j]);
    (blockOne.childNodes[1]).textContent = array[j];

    adjustNodeHeight(blockTwo.childNodes[0], array[i]);
    (blockTwo.childNodes[1]).textContent = array[i];

    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

const resetArrayColor = () => {
    for (let i = 0; i < array.length; i++) {
        const block = document.querySelector(`[data-index="${i}"]`);
        block.firstChild.style.backgroundColor = DEFAULT_COLOR;
    }
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

const setupModeButtons = () => {
    const sortingModeContainer = document.getElementById('sorting-mode-container');

    const bubbleSortButton = document.createElement('button');
    bubbleSortButton.setAttribute('id', 'bubble-sort');
    bubbleSortButton.textContent = 'Bubble Sort'
    bubbleSortButton.addEventListener('click', () => {
        resetArrayColor();
        bubbleSort();
    });

    const selectionSortButton = document.createElement('button');
    selectionSortButton.setAttribute('id', 'selection-sort');
    selectionSortButton.textContent = 'Selection Sort';
    selectionSortButton.addEventListener('click', () => {
        resetArrayColor();
        selectionSort();
    });

    const insertionSortButton = document.createElement('button');
    insertionSortButton.setAttribute('id', 'insertion-sort');
    insertionSortButton.textContent = 'Insertion Sort';
    insertionSortButton.addEventListener('click', () => {
        resetArrayColor();
        insertionSort();
    });

    const mergeSortButton = document.createElement('button');
    mergeSortButton.setAttribute('id', 'merge-sort');
    mergeSortButton.textContent = 'Merge Sort';
    // mergeSort.addEventListener('click', () => {
    //     resetArrayColor();
    //     mergeSort();
    // });

    sortingModeContainer.appendChild(bubbleSortButton);
    sortingModeContainer.appendChild(selectionSortButton);
    sortingModeContainer.appendChild(insertionSortButton);
    sortingModeContainer.appendChild(mergeSortButton);
}

const setupOptionButtons = () => {

}

const setupButtons = () => {
    setupModeButtons();
    const buttonContainer = document.getElementById('options-container');
    
    const randomizeArrayButton = document.createElement('button');
    randomizeArrayButton.textContent = 'Randomize Array';
    randomizeArrayButton.setAttribute('id', 'randomize-array-button');
    randomizeArrayButton.addEventListener('click', () => {
        array.splice(0, array.length)
        randomizeArray(NUMBER_OF_ELEMENTS);
        renderArray();
    });

    const incrSortedArrayButton = document.createElement('button');
    incrSortedArrayButton.textContent = 'Increasingly Sorted Array';
    incrSortedArrayButton.setAttribute('id', 'increasingly-array-button');
    incrSortedArrayButton.addEventListener('click', () => {
        array.sort((a, b) => {return a - b});
        renderArray();
    });

    const decrSortedArrayButton = document.createElement('button');
    decrSortedArrayButton.textContent = 'Decreasingly Sorted Array';
    decrSortedArrayButton.setAttribute('id', 'decreasingly-array-button');
    decrSortedArrayButton.addEventListener('click', () => {
        array.sort((a, b) => {return b - a});
        renderArray();
    });


    buttonContainer.appendChild(randomizeArrayButton);
    buttonContainer.appendChild(incrSortedArrayButton);
    buttonContainer.appendChild(decrSortedArrayButton);
}

const adjustNodeHeight = (node, value) => {
    node.style.height = (value * 5) + 'px';
}

const renderArray = () => {
    removeAllChildNodes(arrayContainer);

    for (let i = 0; i < array.length; i++) {
        const arrayBlockContainer = document.createElement('div');
        arrayBlockContainer.classList = 'array-block-container';
        arrayBlockContainer.setAttribute('data-index', i);
        
        const arrayBlock = document.createElement('div');
        arrayBlock.classList = 'array-block';
        arrayBlock.style.width = arrayContainer.offsetWidth / array.length + 'px';
        adjustNodeHeight(arrayBlock, array[i]);

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