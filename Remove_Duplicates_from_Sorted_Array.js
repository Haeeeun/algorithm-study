// run this with Node.js
import assert from 'assert';

/*
Given a sorted array nums, remove the duplicates in-place 
such that each element appears only once and returns the new length.

Do not allocate extra space for another array, 
you must do this by modifying the input array 
in-place with O(1) extra memory.

It doesn't matter what you leave beyond the returned length.
*/
const solution = (arr) => {
    let cnt = 0;
    let last = arr[0];
    // O(N)
    for (let i = 1; i < arr.length; i++) {
        if (last !== arr[i]) {
            cnt++;
            arr[cnt] = arr[i];
        }
        last = arr[i];
    }
    return cnt + 1; // 비교 횟수보다 1 많음
};

const tc = () => {
    assert.deepStrictEqual(solution([1, 1, 2]), 2);
    assert.deepStrictEqual(solution([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]), 5);
    assert.deepStrictEqual(solution([1, 2, 3]), 3);
};

export default tc;
