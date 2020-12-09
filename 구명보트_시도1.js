import assert from 'assert';

/*
    문제 분류: 그리디
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: False
    문제 풀이 날짜: 2020-12-08 (화)

    실패 정확성 테스트 케이스: 1, 4, 5
    실패 효율성 테스트 케이스: 전부
*/
/*
    1. 최초 접근:
        그리디로 분류되어 있으므로, 전체 문제를 '작은 단계'의 반복으로 풀 수 있을까를 고민함

    2. 최초 발상:
    수강신청 문제처럼 그냥 "담을 수 있는" 최댓값부터 계속 담으면 될 것 같다.
    => 한 번 담고 난 후 "담을 수 있는"을 갱신하면 됨.

    3. 코드 작성 시 주의한 조건
    항상 보트는 적어도 1명을 태움을 가정함.

    4. 실패 이유
    - 효율성 테스트:
        순회 횟수가 너무 많았음. (50,000 x 50,000)

    - 정확성 테스트:
        최대 2명까지만 태울 수 있다는 조건을 활용하지 않음.
*/

// 태웠음을 나타내는 상수
const SAFE = 9999999;

const solution = (people, weight_limit) => {
    // 무게를 내림차순 정렬하여 무거운 순으로 쉽게 접근하도록 함.
    const people_waiting = people.sort((a, b) => b - a);

    // 숫자 세기 변수, 상수
    const total_people = people.length;
    let necessary_boats = 0;
    let people_escaped = 0;

    let weight_aboard; // 현재 보트의 남은 무게
    let cur_person_weight; // 선택된 무게. 보트에 태울 수 있는지 비교하는 용도
    // 태운 사람수가 전체 사람 수가 될 때까지 반복
    while (people_escaped < total_people) {
        // 보트의 남은 무게를 주어진 보트 무게로 초기화
        weight_aboard = weight_limit;
        // 못 나간 사람은 전부 순회합니다.

        // for 조건문 해설:
        // weight_aboard > 0        => 불필요한 체크 방지
        // let i = necessaryboats   => 최댓값을 한 명은 태우므로 태울 수 있는 사람은 적어도 이 값보다 큰 idx에 있음.
        for (let i = necessary_boats; i < total_people && weight_aboard > 0; i++) {
            // 탈 사람의 무게를 가져옴
            cur_person_weight = people_waiting[i];
            // 이미 탄 사람은 지나감
            if (cur_person_weight == SAFE) continue;
            // 일단 탑승시켜봄.
            weight_aboard -= cur_person_weight;
            // 무게 초과로 인한 탑승 실패 시 무게를 원상복구하고 다음 사람을 확인함
            if (weight_aboard < 0) {
                weight_aboard += cur_person_weight; // 복구
                continue;
            }
            // 사람이 탄 경우, SAFE로 플래그를 세우고 탈출한 사람 숫자를 증가시킴
            people_waiting[i] = SAFE;
            people_escaped++;
        }
        // 위 반복문은 보트 하나 단위로 계산하므로, 보트수를 증가시킴
        necessary_boats++;
    }
    return necessary_boats;
};

const tc = () => {
    assert.strictEqual(solution([70, 50, 80, 50], 100), 3);
    assert.strictEqual(solution([70, 80, 50], 100), 3);
    assert.strictEqual(solution([10, 12, 13, 14, 15, 16, 17, 18, 19, 20], 50), 4);
};

export default tc;
