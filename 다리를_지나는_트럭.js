import assert from 'assert';

// number, number, [number]
function solution(bridge_length, weight_capacity, truck_weights) {
    const trucks_to_cross = truck_weights.length;
    const trucks_crossing = [];
    const staged_ticks = [];
    let trucks_crossed = 0;
    let weight_occupied = 0;
    let tick = 0;
    while (trucks_crossed < trucks_to_cross) {
        tick++; // 1에서 시작

        // 뺄 시간
        // 7은 2가 끝나고 나온다. 즉, 3이 시작될 때이다.
        // tick=1에서 시작한다고 보면 됨.
        if (tick - bridge_length === staged_ticks[0]) {
            staged_ticks.shift();
            weight_occupied -= trucks_crossing.shift();
            trucks_crossed++;
        }

        // 넣을 시간.
        // 먼저 빼야 다음 순서로 crossed가 지정된다.
        const weight_available = weight_capacity - weight_occupied;
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
    assert.strictEqual(
        solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]),
        110
    );
};

export default tc;
