import assert from 'assert';

const ZERO = '0'.charCodeAt(0);
const NINE = '9'.charCodeAt(0);
const a = 'a'.charCodeAt(0);
const z = 'z'.charCodeAt(0);
const A = 'A'.charCodeAt(0);
const Z = 'Z'.charCodeAt(0);

const is_small_alpha_or_numeric = (c) => {
    const code = c.charCodeAt(0);
    return (code >= ZERO && code <= NINE) || (code >= a && code <= z);
};

const is_alpha = (c) => {
    const code = c.charCodeAt(0);
    return (code >= a && code <= z) || (code >= A && code <= Z);
};

const is_numeric = (c) => {
    const code = c.charCodeAt(0);
    return code >= ZERO && code <= NINE;
};

const is_special = (c) => {
    return ['!', '@', '#', '$'].includes(c);
};

const solution = (id, pw, pw_check) => {
    if (id.length < 3 || id.length > 20) return false;
    if (pw.length < 8 || pw.length > 20) return false;
    if (pw !== pw_check) return false; //js string compare

    // validate id
    if ([...id].filter(is_small_alpha_or_numeric).length !== id.length) return false;

    // validate pw
    const pwArr = [...pw];
    let cur;
    let alpha = 0;
    let number = 0;
    let special = 0;
    for (let i = 0; i < pw.length; i++) {
        cur = pwArr[i];
        if (is_alpha(cur)) {
            alpha++;
            continue;
        }
        if (is_numeric(cur)) {
            number++;
            continue;
        }
        if (is_special(cur)) {
            special++;
            continue;
        }
        break;
    }
    return Boolean(alpha && number && special);
};

const tc = () => {
    assert.strictEqual(solution('armygo', '1q2w3e4r!!', '1q2w3e4r!!'), true);
    assert.strictEqual(solution('qlqjs1234Babo', '1234', '1234'), false);
    assert.strictEqual(solution('armygo', '1q2w3e4r!!', '!q2w3e4r!1'), false);
    assert.strictEqual(solution('abc', 'Chocolate123!', 'Chocolatel23!'), false);
    assert.strictEqual(solution('mitsllllllll', '123456789!!w', '123456789!!w'), true);
};

/*
abc
Chocolate123!
Chocolatel23!

mitsllllllll
123456789!!w
123456789!!w
*/

export default tc;
