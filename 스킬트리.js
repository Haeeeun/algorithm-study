import assert from 'assert';
/*
    문제 분류: Summer/Winter Coding 2018
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: True
    문제 풀이 날짜: 2020-12-08 (화)
*/
/*
    1. 최초 접근:
        (접근할 것도 없이 바로 발상으로 이어졌음.)

    2. 최초 발상:
    skill: C B D 는 순서대로 읽는다.
    skill_trees 는 문자열 배열이므로, 각 문자열을 순회하며 비교한다.    
    정리 => 테스트 대상을 읽으면서, 스킽르리를 큐에 넣고 앞 순서로 하나씩 꺼내면서 비교하면 되겠다.

    3. 코드 작성 시 주의한 조건
    - 없음

*/
const solution = (a, b) => {
    // 2 * O(n)
    // 일단 주어진 스킽 트리를 문자 단위로 배열로 저장
    const required_path = [...a]; // [ "C", "B", "D" ]
    // 테스트 대상 문자열 배열을 복사
    const test_path = [...b]; //

    // 큐를 구현하는 대신, 현재 스킬의 idx 변수를 선언함.
    // C->B->D 순으로 반환함. (step++를 통해)
    // step 변수는 test_path 검증 시마다 0으로 초기화돼서 시작.
    let step = 0;
    const getNextSkill = () => required_path[step++];

    // O(n)
    // 현재 문자의 스킬 트리 소속 여부 반환
    const isATreeSkill = (skill) => required_path.includes(skill); // C->B->D

    // 성공한 테스트 대상 개수
    let successful = 0;
    // O(n)
    // 테스트 대상 문자열 단위로 순회 (ex) test_path = "BACDE"
    test_path.forEach((p) => {
        step = 0;
        // "BACDE" -> [ 'B', 'A', 'C', 'D', 'E' ] 로 변환
        const path = [...p];
        let i; // path 용 idx 변수
        let skill; // 테스트 대상의 문자 (idx에 대응되는)
        for (i = 0; i < p.length; i++) {
            skill = path[i];
            // 스킬 트리 소속 스킬인데 지금 스킬이 나와야 할 순서에 맞지 않는 경우 => 정상 스킬 트리가 아님.
            if (isATreeSkill(skill) && getNextSkill() !== skill) {
                console.log();
                break;
            }
        }
        // skill을 전부 순회한 경우.
        // 중간에 break로 나온 경우 i가 p.length일 수 없음.
        if (i == p.length) successful++;
    });

    return successful;
};

const tc = () => {
    assert.strictEqual(solution('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA']), 2);
};

export default tc;
