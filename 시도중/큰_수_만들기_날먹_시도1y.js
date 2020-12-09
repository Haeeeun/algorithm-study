import assert from 'assert';

// 숫자가 문자열로 주어짐 (자리수가 100만)
// 1924에서 1, 2를 빼면 94가 남음 (가장 작은 순으로 계속 뺀 것임)
// 자릿수별로 숫자를 센다. 그리고 전체를 빼도 숫자가 남는 경우 걔를 다 뺀다.
// 어느 순간 숫자를 다 빼면 안 되는 경우,
// [1] 다 빼도 되는 경우 그 숫자 이하이면 Mark
// [2] 걸치는 숫자이면 개수를 세면서(k - d0 - d1 - d2 - ...) 앞에서 부터 제거한다. (작은 수는 앞에 있으면 손해)
// [3] 전부 제거를 하게 됐을 때 루프를 종료한다
const solution = (number, k) => {
    const length = number.length;
    const numOfDigits = Array(10).fill(0);
    const ZERO = '0'.charCodeAt(0);
    const NUM = (i) => number.charCodeAt(i) - ZERO;
    for (let i = 0; i < length; i++) {
        numOfDigits[NUM(i)]++;
    }
    console.log(numOfDigits);

    let sum = k,
        reaminder = 0;
    let deadline = 0;
    for (let i = 0; i < 10; i++) {
        sum -= numOfDigits[i];
        if (sum == 0) {
            deadline = i + 1;
            break;
        }
        if (sum < 0) {
            reaminder = sum += numOfDigits[i];
            deadline = i;
            break;
        }
    }
    console.log('remainder:', reaminder);
    // 여기서 배출된 i는 튕긴 것
    // (ex) k=7, i=0 => sum -= 2 => sum = 5
    // k=7, i=1, sum=5 => sum -= 4 => 1
    // k=7, i=2, sum=1 => sum -= 6 => -5 (이 때 터짐)
    // i=2부터는 count해가면서 해야됨

    // 문자열 치환이 없다..
    // 그냥 쌔로 써버리는 수 밖에 없음.
    let buffer = '';
    let cur;
    // let bufferLen = 0;
    for (let i = 0; i < length; i++) {
        cur = NUM(i);
        if (cur < deadline) continue;
        if (cur == deadline && reaminder > 0) {
            reaminder--;
            continue;
        }
        // if (cur != 0 && bufferLen == 0) {
        buffer += number[i];
        //     bufferLen++;
        // }
    }
    return buffer;
};

const tc = () => {
    // 아래의 이상한 edge 케이스는 k에 따라 혼동되므로 없을 거라고 예상
    // assert.strictEqual(solution('00001', 4), '1');
    // assert.strictEqual(solution('10000', 2), '100');
    // assert.strictEqual(solution('00000100', 2), '100');
    // assert.strictEqual(solution('00000010', 2), '10');

    // 처음 생각한 방식대로 풀면 풀리는 레벨 (작은것부터 앞에서부터 빼면 됨.)
    assert.strictEqual(solution('1924', 2), '94');
    assert.strictEqual(solution('1231234', 3), '3234');

    // 1을 다 죽이는 게 아니라 앞의 4를 죽이는게 이득이라고 판단해야 함.. 뭐지?
    /*
        2는 다 빼버리면서, 1은 앞에거만 뺐고, 그 다음 순번인 4를 앞에서 뺐다.

        => 매번 비교하는 무식한 방식으로 풀어야 하나?

        1을 빼는 경우: 앞의 1의 가치와 뒤의 1의 가치

        2를 빼는 경우: 앞의 2의 가치와 뒤의 2의 가치
    */
    assert.strictEqual(solution('4177252841', 4), '775841');
};

export default tc;
