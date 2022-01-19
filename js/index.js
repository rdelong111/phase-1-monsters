document.addEventListener('DOMContentLoaded', () => {
	// create search boxes
	createsearchboxes('name');
	createsearchboxes('age');
	createsearchboxes('description');

	// add button for search boxes
	const createbtn = document.createElement('button');
	createbtn.textContent = 'Create';
	document.getElementById('create-monster').appendChild(createbtn);

	// display the first 50 monsters
	let currentpage = 1;
	getMonsters(currentpage);

	// when the page buttons are pushed
	const moncontainer = document.getElementById('monster-container');
	const backbtn = document.getElementById('back');
	const forwardbtn = document.getElementById('forward');

	fetch('http://localhost:3000/monsters')
	.then((r) => r.json())
	.then((object) => {
		backbtn.addEventListener('click', () => {
			if (currentpage > 1) {
				currentpage--;
				getMonsters(currentpage);
			}
		});
		forwardbtn.addEventListener('click', () => {
			if (currentpage < Math.ceil(object.length / 50)) {
				currentpage++;
				getMonsters(currentpage);
			}
		});
	});

	// when the create button is pushed
	createbtn.addEventListener('click', () => {
		postMonster();
		getMonsters(currentpage);
	});
});

function createsearchboxes(x) {
	const createmon = document.getElementById('create-monster');

	const box = document.createElement('input');
	box.setAttribute('id', `${x}`);
	box.setAttribute('type', 'text');
	box.setAttribute('placeholder', `${x}...`);

	createmon.appendChild(box);
}

function postMonster() {
	const Mname = document.getElementById('name');
	const Mage = document.getElementById('age');
	const Mbio = document.getElementById('description');
	const monsterOb = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			name: Mname.value,
			age: parseFloat(Mage.value),
			description: Mbio.value
		})
	}

	fetch('http://localhost:3000/monsters', monsterOb);

	Mname.value = '';
	Mage.value = '';
	Mbio.value = '';
}

function getMonsters(page){
	fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
	.then((r) => r.json())
	.then((object) => {
		document.getElementById('monster-container').innerHTML = '';
		for (monster of object) {
			addMonster(monster);
		}
	});
}

function addMonster(x) {
	const moncontainer = document.getElementById('monster-container');
	const name = document.createElement('h2');
	const age = document.createElement('b');
	const bio = document.createElement('p');

	name.textContent = x.name;
	age.textContent = `Age: ${x.age}`;
	bio.textContent = `Bio: ${x.description}`;

	moncontainer.appendChild(name);
	moncontainer.appendChild(age);
	moncontainer.appendChild(bio);
}