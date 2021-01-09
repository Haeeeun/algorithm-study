import assert from 'assert';

/*
Given an array nums, write a function to move all 0's to the end of it 
while maintaining the relative order of the non-zero elements.

You must do this in-place without making a copy of the array.
Minimize the total number of operations.

Do not return anything, modify nums in-place instead.
*/
/*
    어떻게 하면 가장 적은 횟수로 옮길 수 있을까? 옮기는 횟수를 낮춰야 할 것 같다.

     z  n
    [0, 1, 0, 3, 12]

        z     n
    [1, 0, 0, 3, 12]
    
           z      n
    [1, 3, 0, 0, 12]

    [1, 3, 12, 0, 0]

    이 과정에서, n은 이제 0이므로, ++할 필요가 없다.
    z는 원래 Idx에서 n의 Idx와 교환해야 한다.
*/
const solution = (arr) => {
    let nextNum = 0;
    let nextZero = 0;
    let tmp;
    // O(N)
    while (nextZero < arr.length && nextNum < arr.length) {
        // O(N) 맞음. Quick Sort는 이 구문을 log N 번만 수행하니까 N log N 인것임.
        // nextNum은 최대 숫자 개수 n개 만큼 이동할 수 밖에 없지만,
        // in-place여서 어차피 앞에 0이 있으면 뒤의 숫자는 전부 이동해야 함.
        // nextZero는 거의 증가할 일이 없음.
        while (nextNum < arr.length && arr[nextNum] === 0) nextNum++;
        while (nextZero < arr.length && arr[nextZero] !== 0) nextZero++;

        if (nextNum >= arr.length || nextZero >= arr.length) break;

        if (nextNum > nextZero) {
            tmp = arr[nextZero];
            arr[nextZero] = arr[nextNum];
            arr[nextNum] = tmp;

            // 비효율은 여기서 발생하는 것 같음.
            // zero에서 num이 시작하다보니, 아주 느림.
        } else {
            nextNum++; // 다음 요소 찾기
        }
    }
    // 임시적으로 배열을 반환하자. arr 반환하면 되니까.
    return arr;
};

const tc = () => {
    assert.deepStrictEqual(solution([1, 0, 2, 3]), [1, 2, 3, 0]);
    assert.deepStrictEqual(solution([0, 1, 0, 3, 12]), [1, 3, 12, 0, 0]);
    /*
    [0] (1) 0 3 12
    1 [0] 0 (3) 12
    1 3 0 [0] (12)
    1 3 12 0 0
    */
};

export default tc;
