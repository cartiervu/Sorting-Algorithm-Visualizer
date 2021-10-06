import { SLEEP_TIME_MS, array, swap, highlightBlock, sleep } from './index';

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            highlightBlock(j, 'comparing');
            highlightBlock(j + 1, 'comparing');
            await sleep(SLEEP_TIME_MS);
            if (array[j] > array[j+1]) {
                swap(j, j+1);
                await sleep(SLEEP_TIME_MS);
            }
            highlightBlock(j, 'default');
            await sleep(SLEEP_TIME_MS);
        }
        highlightBlock(array.length - i - 1, 'complete');
    }
}


export { bubbleSort };