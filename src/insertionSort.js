import { SLEEP_TIME_MS, array, swap, highlightBlock, sleep } from './index';

async function insertionSort() {
    highlightBlock(0, 'complete');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        highlightBlock(i, 'comparing');
        await sleep(SLEEP_TIME_MS);
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            highlightBlock(j, 'comparing');
            highlightBlock(j+1, 'comparing');
            await sleep(SLEEP_TIME_MS);
            swap(j, j+1);
            await sleep(SLEEP_TIME_MS);
            highlightBlock(j, 'complete');
            highlightBlock(j+1, 'complete');
            j--;
        }
        array[j+1] = key;
        highlightBlock(i, 'complete');
        await sleep(SLEEP_TIME_MS);
    }
}

export { insertionSort };