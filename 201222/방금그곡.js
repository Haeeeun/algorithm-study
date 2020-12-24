function solution(m, musicinfos) {
    let answer = {
        name: `(None)`,
        time: 0
    }

    m = converse(m);

    musicinfos.forEach(element => {
        const music = element.split(',');
        const time = (music[1].slice(0,2)*60 + music[1].slice(3,5)*1)
            - (music[0].slice(0,2)*60 + music[0].slice(3,5)*1);
        const melody = converse(music[3]);
        let checkMelody = [];

        for(let i=0; i<time; i++){
            checkMelody.push(melody[i%melody.length]);
        }

        if(checkMelody.join('').indexOf(m) !== -1 && answer.time < time){
            answer = {
                name: music[2],
                time: time
            }
        }
    })

    return answer.name
}

function converse(s){
    const Map = {
        'C#' : 'c',
        'D#' : 'd',
        'F#' : 'f',
        'G#' : 'g',
        'A#' : 'a'
    }

    return s.split('').map((element,index) => {
        if(s[index+1] === '#'){
            return Map[element+'#']
        } else if(element === '#'){
            return ''
        } else{
            return element;
        }
    }).join('');
}

console.log(solution("ABCDEFG",["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"])) //HELLO