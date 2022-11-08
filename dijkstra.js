const cols = 25;
const rows = 25;
let grid = new Array(rows);
let w, h;
let visited = [];
let lookingAt = [];
let start, end, current;

function setup(){
	createCanvas(1525, 844);
	w = width / cols;
  	h = height / rows;
  	frameRate(60);
  	background(0);

	for(let i = 0; i < rows; i++){
 		grid[i] = new Array(cols);
	}

	for(let i = 0; i < rows; i++){
		for(let j = 0; j < cols; j++ ){
 			grid[i][j] = new Cell(i, j);
 		}
	}

	start = grid[0][0];
	end = grid[cols - 1][rows - 1];
	start.dist = 0;
	start.prev = start;
	current = start;
	lookingAt.push(start);
	end.wall = start.wall = false;
}

function removeElement(arr, element){
	for(let i = 0; i < arr.length; i++){
		if(arr[i] == element){
 			arr.splice(i,1);
 		}
	}
}

function shortestPath(start, end){
	let current = end.prev;
	let path = [];
	while(current.prev != current){
		path.unshift(current);
 		current = current.prev;
	}
	for(let i = 0; i < path.length; i++){
		path[i].show(102, 210, 214);
	}
}

function draw(){
	for(let i = 0; i < rows; i++){
 		for(let j = 0; j < cols; j++ ){
 			if(grid[i][j].wall)
 	     		grid[i][j].show(70, 130, 123);
 			else
 			grid[i][j].show(251, 199, 64);
 		}
	}
	for(let i = 0; i < visited.length; i++){
 		visited[i].show(255, 255, 177);
	}
	for(let i = 0; i < lookingAt.length; i++){
 		lookingAt[i].show(229, 105, 151);
	}

	start.show(0, 255, 0);
	end.show(255, 0, 0);

	if(current == end){
 		shortestPath(start, end);
 		noLoop();
	}
	visited.push(current);
	removeElement(lookingAt, current);

	let neighbours = current.getNeighbours();
	for(let i = 0; i < neighbours.length; i++){
 		let neighbour = neighbours[i];

 		if(visited.includes(neighbour)){
 			continue;
 		}
 		if(!lookingAt.includes(neighbour) && !neighbour.wall){
 			neighbour.dist = current.dist + 1;
 			neighbour.prev = current;
 			lookingAt.push(neighbour);
 		}

 		let tentativeDist = current.dist + 1;

 		if(tentativeDist < neighbour.dist){
 			neighbour.dist = tentativeDist;
 			neighbour.prev = current;
 		}

	}

	let minNode = 0;
	let minDist = Infinity;
	if(lookingAt.length == 0){
 		noLoop();
 		return;
	}
	else{
 		for(let i = 0; i < lookingAt.length; i++){
 			if(lookingAt[i].dist < minDist){
 				minDist = lookingAt[i].dist;
 				minNode = lookingAt[i];
 			}
 		}
 		current = minNode;
	}

	if(minDist == Infinity){
 		noLoop();
	}
}
