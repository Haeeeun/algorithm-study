import assert from 'assert';
/*
    문제 분류: DFS/BFS
    문제 레벨: 프로그래머스 3

    문제 풀이 여부: False. 답을 보고 맞췄다.
    출처: https://minnnne.tistory.com/87
    문제 풀이 날짜: 2021-01-12 (화)
*/
/*
    1. 최초 접근:
        그래프로 표현하기.
        BFS/DFS 활용하기.
        를 중점으로 생각했었다.
        String Diff를 계산해야 겠다고 생각했는데, 너무 어렵게 생각했었는데, char 1개 다른건 별로 어렵지 않은거였다. 
        너무 오래 걸리지 않을까 생각했는데, 블로그 참고 후 개념 이해는 꽤 쉽게 된 것 같고, 코드를 짜기 생각보다 오래 걸리지 않더라.

    3. 코드 작성 시 주의한 조건
    - begin에서 target으로 변환하는 가장 짧은 변환 과정을 찾으려고 합니다.
    - 한 번에 한 개의 알파벳만 바꿀 수 있습니다.
    - words에 있는 단어로만 변환할 수 있습니다.
*/
// findCloseWord :: (String, Array(String)) => Array(String)
const findCloseWord = (base, words) => {
    let cnt;
    let i;
    return words.reduce((res, next) => {
        cnt = 0;
        for (i = 0; i < next.length && cnt <= 1; i++) {
            if (base === next) break;
            if (next.charCodeAt(i) !== base.charCodeAt(i)) cnt++;
        }
        if (i === next.length && cnt <= 1) res.push(next);
        return res;
    }, []);
};

const solution = (begin, target, words) => {
    // 아예 없는 경우 예외 처리 - 이게 더 비쌀듯
    // 나중에.

    const visited = {};
    const q = []; // BFS
    let cur;
    let cnt;

    q.push([0, begin]);
    while (q.length > 0) {
        [cnt, cur] = q.shift();

        visited[cur] = true;

        // 최초 pop 시엔 0.
        if (cur === target) {
            return cnt;
        }
        cnt++;
        const r = findCloseWord(cur, words);
        r.forEach((c) => {
            // 재방문 해야 할 이유가 없고, BFS 에서 종료 조건으로 활용됨.
            if (!visited[c]) q.push([cnt, c]);
        });
    }
    // 못 찾은 경우.
    return 0;
};

const tc = () => {
    /* 
   
    한 번에 하나의 알파벳만 바꾼다: 두 단어 사이의 거리가 1이다?

    이게 왜 BFS 나 DFS 냐

    그래프로 표현하라는거지
    
    hit -> hot [i -> o]
    hot -> dot [h -> d]
    dot -> dog [t -> g]
    dog -> log [d -> l]
    log -> cog [l -> c]
    */
    assert.strictEqual(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']), 4);

    // target인 cog는 words 안에 없기 때문에 변환할 수 없다.
    assert.strictEqual(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']), 0);
};

export default tc;
