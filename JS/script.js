const tasks = document.querySelector('#tasks');
const addButton = document.querySelector('#add-task-button');

const taskTitleInput = document.querySelector('#add-task__title');
const taskDescriptionInput = document.querySelector('#add-task__description');

const main = document.querySelector('#main');

let tasksCount = 0;

let taskCheckboxCount = 0;

//* Add task button
addButton.addEventListener('click', () => {
	document.querySelector('#add-task__form').classList.add('active');
	addButton.classList.add('active');
});

//* Cansel button
document.querySelector('#add-task__cansel-button').addEventListener('click', () => {
	document.querySelector('#add-task__form').classList.remove('active');
	addButton.classList.remove('active');
});

//* Add task finally

//Confirm button
document.querySelector('#add-task__add-button').addEventListener('click', () => {
	if(!taskTitleInput.value) return;
	init();
	addScroll();
});
// Control by keyboard
taskTitleInput.addEventListener('keydown', (e) => {

	if(e.code === 'Enter'){
		if(!taskTitleInput.value) return;
		init();
		addScroll();
	}
	
	if(e.key === 'Escape'){
		document.querySelector('#add-task__form').classList.remove('active');
		addButton.classList.remove('active');
	}
})

//* Add task
function createContent() {
	const task = `
	<div class="tasks__cell task">
		<div class="task__content">
			<input type="checkbox" class="task__checkbox" id="task-checkbox${taskCheckboxCount}">
			<label for="task-checkbox${taskCheckboxCount}" class="task__title" id="task-title">${taskTitleInput.value}</label>
			<div class="task__description"> <br> ${taskDescriptionInput.value}</div>
		</div>
		<div class="task__managment">
			<button class="task__delete-button" id="task__delete-button"><i class="fa-regular fa-trash-can"></i></button>
		</div>
	</div>`;
	taskCheckboxCount++;
	
	return createTemplate(task);
}
function createTemplate(str) {
	const template = document.createElement('template');

	template.innerHTML = str;

	return template.content;
}
function appendContent(content) {
	tasks.appendChild(content);
}
function init() {
	const fragment = document.createDocumentFragment();

	fragment.appendChild(createContent());
	appendContent(fragment);	
}

function addScroll(){
	if(tasksCount >= 6){
		main.classList.add('scroll');
	}
	tasksCount++;

	taskTitleInput.value = '';
	taskDescriptionInput.value = '';
}

//* Highlight done task
window.addEventListener('click', function(e){
	document.querySelectorAll('.task__checkbox').forEach(function(element){
		if(e.target == element){
			element.nextElementSibling.classList.toggle('done');
		}
	})
})

//* Delete task
window.addEventListener('click', function(e){
	document.querySelectorAll('.fa-regular').forEach(function(element){
		if(e.target == element){
			element.closest('div.task').remove();
		}
	})
})

document.querySelector('#clear-button').addEventListener('click', () => {
	document.querySelectorAll('.done').forEach(el => {
		el.closest('div.task').remove();
	})
})


