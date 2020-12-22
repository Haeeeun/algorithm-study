import assert from 'assert';

// Number() :: char => num
const solution = (array) =>
    array
        .reduce((acc, cur) => acc.concat(cur.split(' ').map(Number)), [])
        .sort((a, b) => a - b) // 오름차순 정렬
        .reduce((acc, cur) => (acc += cur + ' '), '');

const tc = () => {
    // 뒤에 space가 있다는게 거의 안 보임;
    assert.strictEqual(solution(['2 3 6 7 8', '1 8 9 11']), '1 2 3 6 7 8 8 9 11 ');
    assert.strictEqual(solution(['1 2 3 4 5', '6 7 8 9']), '1 2 3 4 5 6 7 8 9 ');
};

export default tc;
