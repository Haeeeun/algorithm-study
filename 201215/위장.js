function solution(clothes) {
    let answer = 1;

    let category = [];
    clothes.forEach(element => {
        category.push(element[1]);
    });

    let categoryCount = {};
    category.forEach(element => {
        if(categoryCount[element] === undefined){
            categoryCount[element] = 1;
        } else{
            categoryCount[element]++;
        }
    });

    for (let key in categoryCount) {
        answer = answer * (categoryCount[key] + 1);
    }

    return answer - 1;
}