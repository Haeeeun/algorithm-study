import assert from 'assert';

const solution = (arr) => {
    let max;
    for (let i = 0; i < arr.length - 1; i++) {
        max = arr[i + 1];
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] > max) max = arr[j];
        }
        arr[i] = max;
    }
    arr[arr.length - 1] = -1;
    return arr;
};

const tc = () => {
    assert.deepStrictEqual(solution([17, 18, 5, 4, 6, 1]), [18, 6, 6, 6, 1, -1]);
};

export default tc;
