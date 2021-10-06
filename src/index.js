import _, { sortBy } from 'lodash';
import './style.css'

let array = [];

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

    array.forEach((num) => {
        const arrayBlockContainer = document.createElement('div');
        arrayBlockContainer.classList = 'array-block-container';
        
        const arrayBlock = document.createElement('div');
        arrayBlock.classList = 'array-block';
        arrayBlock.style.width = arrayContainer.offsetWidth / array.length + 'px';
        arrayBlock.style.height = (num * 10) + 'px';

        const arrayBlockText = document.createElement('p');
        arrayBlockText.classList = 'array-block-text';
        arrayBlockText.textContent = num;
        
        arrayBlockContainer.appendChild(arrayBlock);
        arrayBlockContainer.appendChild(arrayBlockText);
        arrayContainer.appendChild(arrayBlockContainer);
    });
}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

randomizeArray(10);
setup();