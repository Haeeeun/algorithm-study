import assert from 'assert';
/*
    문제 분류: [?]
    문제 레벨: 프로그래머스 2

    문제 풀이 여부: False
    문제 풀이 날짜: 2020-12-28 (월)

    실패 정확성 테스트 케이스: 
    실패 효율성 테스트 케이스: 
*/
/*
    1. 최초 접근:
        +

    2. 최초 발상:
    +

    3. 코드 작성 시 주의한 조건
    +

    4. 실패 이유
    - 효율성 테스트:
        +

    - 정확성 테스트:
        +
*/
/*
100 글자 이내
대소문자, 숫자, 공백, 마침표, 빼기 부호만
영문자로 시작
숫자를 하나 이상 포함

파일명은 크게 HEAD, NUMBER, TAIL의 세 부분으로 구성된다.

HEAD는 문자, >= 1글자.
NUMBER는 1~5 글자, 연속된 숫자, 앞쪽에 0 가능. (00000이나 0101 등도 가능)
TAIL은 그 나머지 부분으로, 규칙 없음 (any)

파일명	            HEAD	        NUMBER	        TAIL
foo9.txt	        foo	            9	            .txt
foo010bar020.zip	foo	            010	            bar020.zip
F-15	            F-	            15	            (빈 문자열)

파일명을 세 부분으로 나눈 후 정렬

HEAD 부분을 기준으로 사전 순으로 정렬 

문자열 비교 시 대소문자 구분을 하지 않는다

HEAD 부분이 대소문자 차이 외에는 같을 경우, NUMBER의 숫자 순으로 정렬
(9 < 10 < 0011 < 012 < 13 < 014 순)

숫자 앞의 0은 무시 
(012와 12는 정렬 시에 같은 같은 값으로 처리)

두 파일의 HEAD 부분과, NUMBER의 숫자도 같을 경우, 원래 입력에 주어진 순서를 유지 
MUZI01.zip과 muzi1.png가 입력으로 들어오면, 정렬 후에도 입력 시 주어진 두 파일의 순서가 바뀌어서는 안 된다.

중복된 파일명은 없으나, 대소문자나 숫자 앞부분의 0 차이가 있는 경우는 함께 주어질 수 있음
(muzi1.txt, MUZI1.txt, muzi001.txt, muzi1.TXT는 함께 입력으로 주어질 수 있다.)

입력: [img12.png, img10.png, img02.png, img1.png, IMG01.GIF, img2.JPG]
출력: [img1.png, IMG01.GIF, img02.png, img2.JPG, img10.png, img12.png]

입력: [F-5 Freedom Fighter, B-50 Superfortress, A-10 Thunderbolt II, F-14 Tomcat]
출력: [A-10 Thunderbolt II, B-50 Superfortress, F-5 Freedom Fighter, F-14 Tomcat]
*/

const splitIntoParts = (name) => {
    let numberIdx = 0;
    let tailIdx = 0;
    for (let i = 0; i < name.length; i++) {
        if (!numberIdx && name[i] >= '0' && name[i] <= '9') numberIdx = i;
        // number는 연속된 숫자이므로, number 이후 숫자가 아닌 무언가가 나와야 함.
        if (numberIdx && !tailIdx && (name[i] < '0' || name[i] > '9')) tailIdx = i;
    }
    if (!tailIdx) tailIdx = name.length;
    return [
        name.slice(0, numberIdx),
        name.slice(numberIdx, tailIdx),
        name.slice(tailIdx, name.length),
    ];
};

const solution = (files) => {
    let aHead, bHead, aNum, bNum;

    return (
        files
            .map(splitIntoParts)
            // .map((a) => {
            //     console.log(a[0], a[1]);
            //     return a;
            // })
            .sort((a, b) => {
                aHead = a[0].toLowerCase();
                bHead = b[0].toLowerCase();
                if (aHead === bHead) {
                    aNum = Number(a[1]);
                    bNum = Number(b[1]);

                    return aNum - bNum; // 숫자는 오름차순
                }
                return aHead > bHead ? 1 : -1; // 알파벳 오름차순 (JS는 'a' < 'b' 이므로, 큰 놈이 뒤로가면 됨)
            })
            .map(([head, number, tail]) => head + number + tail)
    );
};

const tc = () => {
    assert.deepStrictEqual(
        solution(['img12.png', 'img10.png', 'img02.png', 'img1.png', 'IMG01.GIF', 'img2.JPG']),
        ['img1.png', 'IMG01.GIF', 'img02.png', 'img2.JPG', 'img10.png', 'img12.png']
    );
};

export default tc;
