import assert from 'assert';
/*
    문제 분류: 해시
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: True
    문제 풀이 날짜: 2020-12-11 (금)
*/
/*
    1. 최초 접근:
        해시라고 해서.. 해시값으로 최적해를 구하는건가? 했는데
        그냥 Map, Dictionary를 말하는거였다. 이걸 누가 해시라고 부르나?...???

    2. 최초 발상:
    각 의상 종류별로 개수를 세고, 개수를 곱하면 끝날까?
    => 안 입는 경우도 있다. 즉, +1 해주고 개수를 곱하고,
    => 아무것도 안 입는 case는 1번 뿐이므로 -1 해주면 될 듯.
    Object에 넣고 돌리고 나중에 OwnProperty로 하면 걸러지나?

    3. 코드 작성 시 주의한 조건
    스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다.
    같은 이름을 가진 의상은 존재하지 않습니다
    스파이는 하루에 최소 한 개의 의상은 입습니다.
*/
const solution = (clothes) => {
    // 의상의 중복이 없으므로, 의상의 이름은 신경 쓸 게 못 된다.
    const dict = clothes.reduce((acc, cur) => {
        acc[cur[1]] = acc[cur[1]] ? acc[cur[1]] + 1 : 1;
        return acc;
    }, {});
    return (
        Object.values(dict).reduce((acc, cnt) => {
            acc *= cnt + 1; // 옷을 안 입는 경우도 해서 +1 더해줌
            return acc;
        }, 1) - 1 // 옷을 아예 안 입는 경우는 없으므로, 1 빼줌
    ); // 옷을 하나라도 입어야 하므로, 옷 총 개수는 1 이상일 것.
};

const tc = () => {
    assert.strictEqual(
        solution([
            ['yellow_hat', 'headgear'],
            ['blue_sunglasses', 'eyewear'],
            ['green_turban', 'headgear'],
        ]),
        5
    );
    assert.strictEqual(
        solution([
            ['crow_mask', 'face'],
            ['blue_sunglasses', 'face'],
            ['smoky_makeup', 'face'],
        ]),
        3
    );
};

export default tc;
