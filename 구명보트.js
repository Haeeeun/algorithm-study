import assert from 'assert';

/*
    문제 분류: 그리디
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: True
    문제 풀이 날짜: 2020-12-08 (화)
*/
/*
    (최초 발상 등의 내용은 구명보트_시도1을 참고해주세요.)

    1. 효율성 문제 해결 방법:
    - 몸무게 배열을 구현하여, 50,000명의 무게를 n^2으로 순회하지 않고,
    50,000 * 240 으로 순회함 (=> k * O(n))

    2. 정확성 문제 해결 방법:
    - 2명이라는 인원 제한을 cnt 변수로 구현함

    3. TODO: 조건을 지켜서 간결하게 문제 풀이하기
*/
const solution = (people, weight_limit) => {
    // 숫자 세는 변수 초기화
    const total_people = people.length;
    let necessary_boats = 0;
    let people_escaped = 0;

    // 1. 몸무게 배열을 초기화함.
    // 몸무게 배열이란 해당 몸무게번째에 해당하는 값을 해당하는 사람들의 수로 저장함
    // 이 때, 보트에 태워 나가는 경우 사람수를 1씩 뺌
    // 2. 최소 몸무게를 구함. => 순회 시 최적화 용도(중요하지 않음.)
    const weight_list = Array(weight_limit + 1).fill(0);
    let min_weight = weight_limit;
    for (let i = 0; i < people.length; i++) {
        if (min_weight > people[i]) min_weight = people[i];
        weight_list[people[i]]++;
    }

    // 태울 수 있는 가장 무거운 무게를 반환함.
    // 태울 수 있는 사람이 없는 경우 -1
    // O(k) [ k <= 201 ]
    const find_max_under = (limit) => {
        let weight = limit;

        // limit->min까지 가면서 limit 이하의 최댓값 조사 [ O(k <= 201) ]
        for (; weight > min_weight && weight_list[weight] == 0; weight--);

        // 태울 수 있는 사람이 없는 경우의 예외처리 (이전에 탄 사람 혼자 보트를 타게 됨)
        if (weight_list[weight] == 0) return -1;

        return weight;
    };

    // O(n) [ n <= 50,000 ]
    let boat_capacity; // 보트에 태울 수 있는 남은 무게
    let man_weight; // 사람 무게
    let fail_weight; // 싣는 데 실패한 무게
    let cnt;
    while (people_escaped < total_people) {
        // 탄 사람수 = 0로 초기화
        // 보트의 무게를 주어진 값으로 초기화
        // 탑승에 실패한 사람의 무게를 -1로 초기화
        cnt = 0;
        boat_capacity = weight_limit;
        fail_weight = -1;

        // 아직 보트의 여력이 남아있고, 2명을 태우지 못한 경우 순회
        while (boat_capacity > 0 && cnt < 2) {
            // 남은 사람 중 가장 무거운 사람을 찾음
            man_weight = find_max_under(boat_capacity, fail_weight);

            // 태울 수 있는 사람이 없음. 새 보트를 구해야 함. 반복문을 탈출함.
            if (man_weight < 0) break;

            // 무게 초과로 인한 탑승 실패 시 다음으로 작은 값 찾으러감
            if (boat_capacity - man_weight < 0) {
                fail_weight = man_weight;
                continue;
            }
            // 보트에 사람을 태움.
            boat_capacity -= man_weight;
            weight_list[man_weight]--;
            people_escaped++;
            cnt++;
        }
        necessary_boats++;
    }
    console.log(necessary_boats);
    return necessary_boats;
};

const tc = () => {
    assert.strictEqual(solution([100, 110, 120, 130, 140, 150], 240), 4);
    assert.strictEqual(solution([10, 10, 10, 10, 10, 10], 60), 3);
    assert.strictEqual(solution([70, 50, 80, 50], 100), 3);
    assert.strictEqual(solution([70, 80, 50], 100), 3);
    assert.strictEqual(solution([10, 12, 13, 14, 15, 16, 17, 18, 19, 20], 50), 5);
};

export default tc;
