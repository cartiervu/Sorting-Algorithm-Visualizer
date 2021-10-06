import { SLEEP_TIME_MS, array, swap, highlightBlock, sleep } from './index';

async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        highlightBlock(minIndex, 'comparing');
        await sleep(SLEEP_TIME_MS);
        for (let j = i + 1; j < array.length; j++) {
            highlightBlock(j, 'comparing');
            await sleep(SLEEP_TIME_MS);
            if (array[j] < array[minIndex]) {
                highlightBlock(minIndex, 'default');
                minIndex = j;
            } else {
                highlightBlock(j, 'default');
            }
        }
        swap(i, minIndex);
        highlightBlock(minIndex, 'default');
        highlightBlock(i, 'complete');
        await sleep(SLEEP_TIME_MS);
    }
    highlightBlock(array.length - 1, 'complete');
}

export { selectionSort };