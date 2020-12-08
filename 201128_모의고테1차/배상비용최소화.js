const solution = (n, works) => {
    let max = works.sort((a,b) => b-a)[0];

    while(n>0){
        for(let i=0; i<works.length; i++){
            if(n <=0) break;
            if(max === works[i]){
                works[i] -= works[i]>0 ? 1 : 0;
                n--;
            }
        }
        max--;
        if(max === 0) break;
    }

    return works.reduce((result, el) => result + el*el,0);
}