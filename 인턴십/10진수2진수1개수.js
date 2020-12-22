import assert from 'assert';

const solution = (line) => {
    let cnt = 0;
    let num = Number.parseInt(line, 10);
    console.log(num);
    while (num > 0) {
        // 2로 나눠서 하는거 맞지? yes
        //1234%2=0
        //617%2=1
        //308&2=0
        //154%2=0
        //77%2=1
        //38%2=0
        //19%2=1
        //9%2=1
        //4%2=0
        //2%2=0
        //1%2=1
        if (num % 2 != 0) cnt++;
        num = Math.floor(num / 2);
    }
    console.log(cnt);
    return cnt;
};

const tc = () => {
    assert.strictEqual(solution('1234'), 5);
};

export default tc;
