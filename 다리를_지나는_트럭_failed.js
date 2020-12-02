import assert from 'assert';

/*

경과 시간	다리를 지난 트럭	다리를 건너는 트럭	대기 트럭
0	[]	[]	[7,4,5,6]
1~2	[]	[7]	[4,5,6]
3	[7]	[4]	[5,6]
4	[7]	[4,5]	[6]
5	[7,4]	[5]	[6]
6~7	[7,4,5]	[6]	[]
8	[7,4,5,6]	[]	[]
=> 1에서 첫 입력이 생김
=> 7에서 마지막 출력이 생김
    idx=8일 때 while loop에 들어가지 않는다. 
    즉 idx=7에서 while에서 ++ 후 종료


따라서, 모든 트럭이 다리를 지나려면 최소 8초가 걸립니다.

solution 함수의 매개변수로 다리 길이 bridge_length, 
다리가 견딜 수 있는 무게 weight, 트럭별 무게 truck_weights가 주어집니다. 
이때 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return 하도록 
solution 함수를 완성하세요.

[4m] 일단 지문은 대충 이해한 것 같음.
어떻게 풀어야 할 지는 모르겠지만, 스택/큐라고 써 있는걸 보니 그렇게 풀기로 함.

일단 Simulation으로 for 문으로 tick을 돌려서 if 문으로 넣고 빼고를 반복하자.

이상 데이터에 대한 언급이 없는 것 같으니 예외처리는 하지 않는다.

*/

/*
    규칙
    1. 제한 무게가 있음. - 한꺼번에 들어가 있는 제한 (큐에 들어가면 될 듯)
    2. 길이도 있음.     - 스택에 들어가서 기다리는 시간이 필요

    입력 순서 
    [1] 오름차순으로 정렬 - 작은 애들부터 넣는다.
    [2] 넣을 수 있을 때 까지 계속 넣는다.
    => 이게 BEST 일까? 잘 모르겠다. => 그럼 틀렸을 것임

    => 각 테스트 케이스가 더 필요하다.

    <List of TC>
    l|w|trucks|answer

    10 30 [ 9, 9, 9, 8, 7, 7, 6, 6, 5, 4, 4, 3, 2, 1, 1 ]
    => 정렬된 상태에서 시작
    => 9[1] (1)
    => 9[1] (2)
    => 9[1] (10)
    => 9[2] (11)
    => 9[2] (20)
    => 9[3] (30)
    => 8 (31)
    => 8, 2 (32) // 이건 어떻게 하지?
        10-8에 가장 가까운 애들부터 집어 넣는 것이 합리적이다.
        그래야 7, 6, 5 등을 할 때 1, 2, 3이 아니라 4와 같이
        잠재적으로 혼자 건너야 될 확률이 높은 애를 제거할 수 있기 때문
        => 이게 정말 최선인가?
            8 1 1 은? 이건 최선아닌가? 작은 수를 앞에 파이프라인에 넣어야
            뒤엣것도 빨리 시작할 수 있지 않을까? [32m]
            => 8 1 1 이나 8 2 이나 차이가 없거나 8 2 가 더 빠르다고 증명할 수 있는가?
                1 1 이나 2나 상관이 없는게, 치환이 된다.
                무슨 말이냐면, 

                1 1 2 는 어느 순서로 넣는다 하더라도 대기하지 않는다는 가정 하에
                (8 초과의 수가 없기 때문에 1 1 2 는 어느 순서로 넣어도 막힘이 없다.)
                어차피 같은 시간이 걸린다.

                어차피 같은 시간이 걸리기 때문에 1보다 2를 소거하는게 가장 빠른 일일 것이다.
            
                알고리즘 결론 (35m):
                1. 내림차순으로 정렬한다
                2. 가장 큰 요소를 투입하고, 진행 한다.
                3. 한계무게-현재무게에 가장 가까운 요소를 찾고, 넣고 진행한다.
                4. 요소 중 시간이 다한 경우, 빼고, 3을 수행한다.
                5. 4의 결과가 빈 배열인 경우 현재의 시간을 출력한다.

    주의 사항
    [1] 1초부터 시작한다. (0초에는 아무도 없음)
    [2] 트럭이 내린 순간의 초에 바로 탈 수는 없는 것 같다.

*/

/*
tick	come	go	[ 7 6 5 4 ]
0	-	-
1	7	-
2	-	-
3	6	7 // go 할 때 come도 해야 성립됨 - go가 먼저임
4	4	-
5	5	6 // 이 지점이 바로 내가 더 빠르게 풀었다는 증명이다.. 
// 6이 나가고 바로 5가 들어올 수 있다.
6	5	4
7	-	5 // 시간=8에서 시간=7로 최적화 함.
*/
// weight는 1~10,000 이므로, removed flag로 사용한다.
const REMOVED = Number.MAX_SAFE_INTEGER;

// number, number, [number]
function solution(bridge_length, weight, truck_weights) {
    const trucks_to_cross = truck_weights.length;
    const weights_desc = truck_weights.slice().sort((a, b) => b - a); // DESC
    const crossing_trucks = [];
    const staged_ticks = [];
    let crossed_trucks = 0;
    let occupied = 0;
    let tick = 0;
    while (crossed_trucks < trucks_to_cross) {
        tick++;
        // 뺄 시간
        if (tick - bridge_length === staged_ticks[0]) {
            staged_ticks.shift();
            occupied -= crossing_trucks.shift();
            crossed_trucks++;
        }

        // 넣을 시간
        const input_max = weight - occupied;
        for (let i = 0; i < weights_desc.length; i++) {
            // 넣을 수 있는 가장 큰 트럭을 찾은 case
            if (weights_desc[i] <= input_max) {
                const toPut = weights_desc[i];
                weights_desc[i] = REMOVED;

                crossing_trucks.push(toPut);
                staged_ticks.push(tick);
                occupied += toPut;
                break;
            }
        }
    }
    return tick;
}

const tc = () => {
    assert.strictEqual(solution(2, 10, [7, 4, 5, 6]), 8);
    // fastest 인데 102가 나오는건 이해하기 힘들다.
    assert.strictEqual(solution(100, 100, [10]), 101);
    assert.strictEqual(
        solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]),
        110
    );
};

export default tc;
