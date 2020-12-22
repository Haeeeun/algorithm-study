import assert from 'assert';
/*
    문제 분류: [?]
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: True
    문제 풀이 날짜: 2020-12-22 (화)
*/
/*
    1. 최초 접근:
        시뮬레이션으로 구현만 하면 될 것 같다.

    2. 최초 발상:
    - 이름을 제외하고 map에 넣는다.
    - object에 id를 key로 하고 value를 이름으로 넣고,
    - enter, change 시 split한 이름으로 덮어쓴 후,
    - {명령어, id} 배열을 출력하면서 닉네임을 object에서 가져온다.

    3. 코드 작성 시 주의한 조건
        닉네임을 변경하는 방법: 나간 후, 새로운 닉네임으로 다시 들어감 or 채팅방에서 닉네임을 변경
        닉네임을 변경할 때는 기존에 채팅방에 출력되어 있던 메시지의 닉네임도 전부 변경
        채팅방은 중복 닉네임을 허용
        최종적으로 방을 개설한 사람이 보게 되는 메시지를 문자열 배열 형태로 return
        모든 유저는 유저 아이디로 구분
        첫 단어는 Enter, Leave, Change 중 하나
        각 단어는 공백으로 구분되어 있으며, 알파벳 대문자, 소문자, 숫자로만 이루어져
        유저 아이디와 닉네임은 알파벳 대문자, 소문자를 구별
        채팅방에서 나간 유저가 닉네임을 변경하는 등 잘못 된 입력은 주어지지 않음

        Enter [유저 아이디] [닉네임]
        Leave [유저 아이디]
        Change [유저 아이디] [닉네임]
*/
const solution = (msgs) => {
    const users = {};

    return msgs
        .map((v) => v.split(' '))
        .map((v) => {
            // destructuring 안해서 새 배열을 반환하지 않아도 되도록 함.
            if (v[0] === 'Enter' || v[0] === 'Change') {
                users[v[1]] = v[2];
            }
            return v;
        })
        .reduce((acc, [op, id]) => {
            // change 시에는 채팅에 이력이 뜨지 않음.
            if (op === 'Change') return acc;
            if (op === 'Enter') acc.push(`${users[id]}님이 들어왔습니다.`);
            if (op === 'Leave') acc.push(`${users[id]}님이 나갔습니다.`);
            return acc;
        }, []);
};

const tc = () => {
    assert.deepStrictEqual(
        solution([
            'Enter uid1234 Muzi',
            'Enter uid4567 Prodo',
            'Leave uid1234',
            'Enter uid1234 Prodo',
            'Change uid4567 Ryan',
        ]),
        [
            'Prodo님이 들어왔습니다.',
            'Ryan님이 들어왔습니다.',
            'Prodo님이 나갔습니다.',
            'Prodo님이 들어왔습니다.',
        ]
    );
};

export default tc;
