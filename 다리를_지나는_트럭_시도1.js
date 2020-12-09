import assert from 'assert';
/*
    문제 분류: 스택/큐
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: False
    문제 풀이 날짜: 2020-12-02 (수)

    실패 정확성 테스트 케이스: solution(2, 10, [7, 4, 5, 6]) === 8 가 구현되지 않았음.
*/
/*
    -- 문제 해석부터 잘못된 풀이 --

    1. 최초 접근:
        일단 지문은 대충 이해한 것 같음.
        어떻게 풀어야 할 지는 모르겠지만, 스택/큐라고 써 있는걸 보니 그렇게 풀기로 함.
        일단 Simulation으로 for 문으로 tick을 돌려서 if 문으로 넣고 빼고를 반복하자.
        이상 데이터에 대한 언급이 없는 것 같으니 예외처리는 하지 않는다.

    2. 최초 발상:
    그냥 순서대로 가면 최선이 아니다. 라는 생각으로 쭉 풀었음. (문제의 핵심을 제대로 틀려버림.)

    3. 알고리즘 결론 (많은 예제들을 손으로 계산해보며 결론 내림)):
        1. 내림차순으로 정렬한다
        2. 가장 큰 요소를 투입하고, 진행 한다.
        3. 한계_무게-현재_무게에 가장 가까운 요소를 찾고, 넣고 진행한다.
        4. 요소 중 시간이 다한 경우, 빼고, [3]을 수행한다.
        5. [4]의 결과가 빈 배열인 경우 현재의 시간을 출력한다.

    4. 코드 작성 시 주의한 조건
    (없음)

    5. 실패 이유
    - 정확성 테스트:
        정해진 순서로 가는 것인데, 가장 빠르게 건너는 순서대로 풀려고 했음.
        (결국 헤매다, 가장 빠르게 건너는 버전도 구현하지 못함.)
*/

// 삭제됨을 나타내는 상수
const REMOVED = Number.MAX_SAFE_INTEGER;

function solution(bridge_length, weight, truck_weights) {
    // 내림차순 정렬
    const weights = truck_weights.slice().sort((a, b) => b - a); // DESC

    const trucks_to_cross = truck_weights.length; // 지나야 하는 트럭의 총 개수
    const crossing_trucks = []; // 현재 지나고 있는 트럭
    const staged_ticks = []; // 각 트럭이 다리 위에서 소모한 시간 (tick) (시뮬레이션으로 1씩 증가)
    let crossed_trucks = 0; // 지나간 트럭 수
    let occupied = 0; // 다리에 가해진 무게 합
    let tick = 0; // 시뮬레이션용 '초' 를 나타내는 변수

    // 트럭이 모두 지나갈 때까지
    while (crossed_trucks < trucks_to_cross) {
        // 시뮬레이션용 '초'
        tick++;
        // 같은 한 '초'에서 빼기와 더하기가 같이 수행됨.
        // 트럭을 먼저 빼냄.
        // 왜 먼저 빼느냐? 중간 시점에선 동시에 나오고 들어가게 되기 때문 (예제의 tick=3 참고)
        if (tick - bridge_length === staged_ticks[0]) {
            // 각 트럭이 다리 위에서 소모한 시간을 제거함
            staged_ticks.shift();
            // 다리를 건넌 트럭의 무게만큼 허용 중량에 다시 더해줌
            occupied -= crossing_trucks.shift();
            // 지나간 트럭 개수++
            crossed_trucks++;
        }

        // 이후 트럭을 집어넣음.
        const available = weight - occupied;
        for (let i = 0; i < weights.length; i++) {
            // 다리의 남은 무게 중 들어갈 수 있는 큰 트럭을 찾는 과정
            if (weights[i] <= available) {
                // 가장 큰 트럭을 찾음 (toPut)
                const heaviest = weights[i];
                // 해당 트럭 제거
                weights[i] = REMOVED;

                // 지나는 트럭 배열에 넣음
                crossing_trucks.push(heaviest);
                // 트럭이 들어간 시간을 '들어간 시간 배열'에 넣음
                staged_ticks.push(tick);
                // 다리 중량에 트럭을 넣어줌
                occupied += heaviest;
                break;
            }
        }
    }
    return tick;
}

const tc = () => {
    assert.strictEqual(solution(2, 10, [7, 4, 5, 6]), 8);
    // 아래의 테스트 케이스는 더 느립니다. (구현이 잘못된 것 같음)
    assert.strictEqual(solution(100, 100, [10]), 101);
    assert.strictEqual(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]), 110);
};

export default tc;
