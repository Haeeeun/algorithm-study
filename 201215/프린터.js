function solution(priorities, location) {
    let answer = 0;
    let waitItem = [];
    let printItem = [];
    const length = priorities.length;

    //waitItem 배열 생성
    priorities.forEach((element,index) => {
        waitItem.push({
            index: index,
            priority: element
        })
    });

    while(1){
        for(let i=1; i<waitItem.length; i++){
            if(waitItem[0].priority < waitItem[i].priority){
                const item = waitItem.shift();
                waitItem.push(item);
                break;
            }

            if(i == waitItem.length-1){
                printItem.push(waitItem.shift());

                if(waitItem.length === 1){
                    printItem.push(waitItem.shift());
                    break;
                }
            }
        }

        if(printItem.length == length){
            break;
        }
    }

    //인쇄를 요청한 문서가 몇 번째로 인쇄되는지 return
    printItem.forEach((element, index)=>{
        if(element.index === location){
            answer = index+1
        }
    })

    return answer;
}