import assert from 'assert';

/*
Given an array nums, write a function to move all 0's to the end of it 
while maintaining the relative order of the non-zero elements.

You must do this in-place without making a copy of the array.
Minimize the total number of operations.

Do not return anything, modify nums in-place instead.
*/
// 76ms!
const solution = (arr) => {
    let numIdx = 1; // 어차피 numIdx=0이면 1로 이동함.
    let zeroIdx = 0;
    // 계속 0만 남는 경우 해제하는 과정 추가
    // zeroIdx 만 체크해도 될 것으로 보임
    while (numIdx >= zeroIdx && zeroIdx < arr.length && numIdx < arr.length) {
        while (zeroIdx < arr.length && arr[zeroIdx] !== 0) zeroIdx++;
        while (numIdx < arr.length && (zeroIdx >= numIdx || arr[numIdx] === 0)) numIdx++;

        // while 문을 조건이 안 맞아 탈출한 경우, 종료
        if (numIdx === arr.length || zeroIdx === arr.length) break;

        // 가끔식 있는데 Edge Case: [1, 0] 으로 시작하는 등.
        // 그리고 0만 남았을 때도 zeroIdx가 올라갈 것임.
        if (numIdx < zeroIdx) break;

        // 교환할 시점.
        // 어차피 한 쪽은 0이므로, tmp가 필요 없음
        arr[zeroIdx] = arr[numIdx];
        arr[numIdx] = 0;

        // Index 변수도 교환할 수 있으면 좋겠다.
        // 교환하면 안 되고, numIdx는 앞으로 가는게 맞으며,
        // zeroIdx는 그자리에서 다음 0을 찾는게 맞음
        // 다만, zeroIdx를 좀 더 최적화 하면 좋을듯. 속도가 느림.
        numIdx = zeroIdx;

        // numIdx++: 다음 숫자로 가야 하므로 필수적
        // zeroIdx++: 어차피 한 번은 무조건 증가하는것 최적화
        numIdx++;
    }
    // 임시적으로 배열을 반환 for test cases
    return arr;
};

const tc = () => {
    // BIG HINT for the LOGIC
    assert.deepStrictEqual(solution([4, 2, 4, 0, 0, 3, 0, 5, 1, 0]), [
        4,
        2,
        4,
        3,
        5,
        1,
        0,
        0,
        0,
        0,
    ]);
};

export default tc;
