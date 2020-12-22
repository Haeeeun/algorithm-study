import assert from 'assert';
/*
    문제 분류: [?]
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: True
    문제 풀이 날짜: 2020-12-18 (금)
*/
/*
    1. 최초 접근:
        오우 이 문제 뭐지?? 읽어도 모르겠다.

    2. 최초 발상:
    아무튼, 악보를 전체 시간에 대해 반복시켜 재현을 해야됨.
    그 후 반복악보 내에서 들었던 음 배열이 있는 경우 해당 곡이 맞음.
    일단 일치하는 음악을 배열로 저장하고, 거기서 우선순위를 가리자.

    3. 코드 작성 시 주의한 조건
    - 입력값: 음악 제목, 재생이 시작되고 끝난 시각, 악보
    - 음은 C, C#, D, D#, E, F, F#, G, G#, A, A#, B 12개이다.
    - 각 음은 1분에 1개씩 재생된다. 
    - 음악 길이 < 재생 시간 =====> 반복 재생
    - 음악 길이 > 재생 시간 =====> 재생 시간만큼만 재생
    - 음원을 찾은 경우: 
    - 총 재생 시간이 제일 긴 게 우선
    - 재생 시간이 같으면 먼저 입력된 것 우선
    - 음원을 못 찾은 경우: (None)

    4. 실패 이유
    - 정확성 테스트: #을 제거하지 않고 풀려니 어려운 것. 제거하려면 정규표현식을 쓰거나 더러운 코딩을 해야 될 것 같은데...
    무엇보다 좀 쉽게 될 줄 알았다 ㅎ;; 그냥 이렇게 오랜 시간을 들이는 것 자체가 삽질이다. 뭐 실력은 느는 것 같지만..
    무조건 이 방법으로 풀 수 있으니까 어떻게든 이렇게 풀겠다는 생각이 강했다. 오히려 이 생각보단,
    지금 정규표현식 방식으로 돌아가면 내가 포기하는거라고 생각하는 게 너무 컸다...

    5. 반성:
    [1] replace를 쉽게 하는 방법을 찾는 게 현명했다:
        (1). split 후 바로 join (너무 똑똑하다.)
            s.split('C#').join('H').split('D#').join('I').split('F#').join('J').split('G#').join('K').split('A#').join('L');
        
        (2). replaceAll 메소드
        function replacing(s){
            const org = ['C#', 'D#', 'F#', 'G#', 'A#'], dest = ['Z', 'W', 'X', 'Y', 'T'];
            org.forEach((t,i) =>{
                s = s.replaceAll(t, dest[i]);
            })
            return s;
        }
        
*/
const parse_time = (begin, end) => {
    const [hr, mm] = begin.split(':').map(Number); // Number 생성자
    const [hr2, mm2] = end.split(':').map(Number);

    // 넘어가는 날짜의 예외 처리 (문제 조건에 따라 필요 없을 것으로 보임)
    if (hr > 0 && hr2 === 0) return [hr * 60 + mm, 24 * 60 + mm2];

    return [hr * 60 + mm, hr2 * 60 + mm2];
};

function slice_auto_sharp(from, length, notes_str) {
    let sliced = '';
    while (length > from) {
        sliced += notes_str[from];
        if (notes_str[from + 1] === '#') {
            sliced += notes_str[++from];
            length++; // # 넣을 때마다 한계길이가 1씩 늘어나는 거나 마찬가지
        }
        from++;
    }
    return sliced;
}

const extend_notes_for_duration = (duration, notes_str) => {
    const sharp_cnt = [...notes_str].filter((c) => c === '#').length;
    const len_no_sharp = notes_str.length - sharp_cnt;

    // 크기를 넘어서는 횟수에 대해 복사 (작으면 실행 안 됨)
    // 문자열 반복 횟수를 재야 하므로, #을 빼서 노트 개수로만 승부봐야 함.
    // # 유무는 전체 복사는 아무 문제가 되지 않음.
    const multiplied = Array(Math.floor(duration / len_no_sharp))
        .fill(notes_str)
        .reduce((acc, cur) => acc + cur, '');

    // #을 제외한 개수로 길이를 늘려줘야 하기 때문에,
    // 어쩔 수 없이 while 문을 수동으로 작성해야 함.
    const sliced = slice_auto_sharp(0, duration % len_no_sharp, notes_str);

    return multiplied.concat(sliced);
};

const is_note_included = (part, full) => {
    let cur_slice;
    // 그냥 쭉 한바퀴를 도는 일이기 때문에...
    // part.length 미만의 문자열에 대해선 순회할 필요가 없음
    // 미만이므로 for가 <= 조건이 붙음: (ex) full.length === part.length 일 때 한 번은 순회해야 함.
    for (let i = 0; i <= full.length - part.length; i++) {
        // # 때문에 의미가 잘못된 배열도 비교하게 되지만 상관 없음.
        // 가장 좋은건 c, d, e 등으로 치환하는 것이겠지만.. 괜찮쓰
        cur_slice = full.slice(i, i + part.length);

        // ABC 를 찾는데, ABC# 인 경우 등을 방지
        // 참고: slice는 end의 idx는 포함하지 않는다.
        // '#'로 시작하는 등의 예외를 입력으로 주진 않았음! ( cur_slice[0] !== '#' && 로 확인해봄... )
        // i == LEN => 맨 끝인 경우 i+part.length 요소는 없음
        if (
            part === cur_slice &&
            (i == full.length - part.length || '#' !== full[i + part.length])
        ) {
            return true;
        }
    }
    return false;
};

const solution = (notes_original, music_info_list) => {
    const candidates = [];

    music_info_list.forEach((params, idx) => {
        let [begin, end, name, notes_heard] = params.split(',');
        [begin, end] = parse_time(begin, end);

        // notes_heard => 들은 음악인거죠 이걸 늘려야 하는 과정
        const full_notes = extend_notes_for_duration(end - begin, notes_heard);

        // 수동으로 includes 체크해야 할 듯..
        if (is_note_included(notes_original, full_notes))
            candidates.push({
                name,
                idx,
                len: end - begin,
            });
    });

    if (!candidates.length) {
        return '(None)';
    }

    // multi column sort
    candidates.sort((a, b) => {
        // -1 => a first
        // 1 => b first

        // 긴 length 순으로
        if (a.len > b.len) return -1;
        if (a.len < b.len) return 1;

        // len 동일 시 등장 순서 오름차순
        return a.idx - b.idx;
    });

    return candidates[0].name;
};

const tc = () => {
    // idk
    assert.strictEqual(solution('C#ABC', ['23:59,00:04,HI,C#ABC']), 'HI');

    // 출처: 프로그래머스 질문하기
    // #은 음정 개수로 안 쳐야 함.
    assert.strictEqual(solution('ABC', ['00:00,00:06,HI,ABC#ABC']), 'HI');

    assert.strictEqual(
        // ABC# 인데 ABC로 오인하게 만드는 case
        solution('ABC', ['12:00,12:14,HELLO,C#DEFGAB', '13:00,13:05,WORLD,ABCDEF']),
        'WORLD'
    );

    // 기본 case
    assert.strictEqual(
        solution('ABCDEFG', ['12:00,12:14,HELLO,CDEFGAB', '13:00,13:05,WORLD,ABCDEF']),
        'HELLO'
    );
    assert.strictEqual(
        solution('CC#BCC#BCC#BCC#B', ['03:00,03:30,FOO,CC#B', '04:00,04:08,BAR,CC#BCC#BCC#B']),
        'FOO'
    );

    // 내가 추가한 case
    // duration이 len보다 짧은 경우 (dur=3, len=7, heard=7)
    assert.strictEqual(solution('CFFFFFC', ['12:00,12:03,HELLO,FF']), '(None)');

    assert.strictEqual(solution('ABC', ['00:00,00:05,HI,ABC#ABC']), '(None)');

    // Next Day
    assert.strictEqual(solution('ABC', ['23:59,00:06,HI,ABC#ABC']), 'HI');
};

export default tc;
