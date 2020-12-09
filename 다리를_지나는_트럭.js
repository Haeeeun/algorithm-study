import assert from 'assert';
/*
    문제 분류: 스택/큐
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: True
    문제 풀이 날짜: 2020-12-02 (수)
*/
/*
    1. 문제 해결 아이디어:
    - 그냥 순서대로 Q에서 빼서 집어넣고 대기하고 빼면 되는 구현문제
    - 시도1의 구현부는 재활용

    2. 정확성 문제 해결 방법:
    - '순서대로 지나는' 조건을 만족하면 됨.

    3. TODO: 더 깔끔하게 풀 수 있을까?
*/
function solution(bridge_length, weight_capacity, truck_weights) {
    // 상수 관련 설명은 시도1 참고
    const trucks_to_cross = truck_weights.length;
    const trucks_crossing = [];
    const staged_ticks = [];
    let trucks_crossed = 0;
    let weight_occupied = 0;
    let tick = 0;

    while (trucks_crossed < trucks_to_cross) {
        tick++; // tick=1에서 시작하도록 풀었음.

        // 트럭을 먼저 뺌. (먼저 빼는 이유는 시도 1 참고)
        // 현재 '초' - 다리 길이 === 들어간 '초' (즉, 다 건넜으면,)
        if (tick - bridge_length === staged_ticks[0]) {
            // 내용은 시도1 설명 참고
            staged_ticks.shift();
            weight_occupied -= trucks_crossing.shift();
            trucks_crossed++;
        }

        // 트럭을 넣을 차례
        const weight_available = weight_capacity - weight_occupied;
        // 다리에 허용된 중량에 다음 트럭이 탈 수 있는 경우 (못타면 그냥 다음 tick으로 넘어감)
        if (weight_available >= truck_weights[0]) {
            const truck_to_put = truck_weights.shift();
            trucks_crossing.push(truck_to_put);
            weight_occupied += truck_to_put;
            staged_ticks.push(tick);
        }
    }
    return tick;
}

const tc = () => {
    assert.strictEqual(solution(2, 10, [7, 4, 5, 6]), 8);
    assert.strictEqual(solution(100, 100, [10]), 101);
    assert.strictEqual(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]), 110);
};

export default tc;
