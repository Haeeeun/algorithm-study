function solution(n, computers) {
    let answer = 0;
    let networks = [];

    for(let i=0; i<n; i++){
        let temp  = [];
        for(let j=0; j<computers.length; j++){
            if(computers[i][j] === 1 && i !== j)
                temp.push(j);
        }

        networks.push(temp);
        temp = [];
    }

    let queue = [];
    let visited = [];
    for(let i=0; i<n; i++){
        visited[i] = 0;
    }

    for(let i=0; i<networks.length; i++){
        if(visited[i] === 1) continue;
        answer++;
        visited[i] = 1;
        networks[i].forEach(element => {
            queue.push(element);
        })

        while(queue.length !== 0){
            const node = queue.shift();
            if(visited[node] === 1){
                continue;
            }

            visited[node] = 1;

            networks[node].forEach(element => {
                queue.push(element)
            })
        }
    }

    return answer;
}

console.log(solution(5, [[1, 1, 0, 0, 0], [1, 1, 1, 0, 0], [0, 1, 1, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1]])) //2