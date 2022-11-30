const tasks = document.querySelector('#tasks');
const addButton = document.querySelector('#add-task-button');

const taskTitleInput = document.querySelector('#add-task__title');
const taskDescriptionInput = document.querySelector('#add-task__description');

const main = document.querySelector('#main');

let tasksCount;
localStorage.getItem('tasksleft') ? tasksCount  = localStorage.getItem('tasksleft') : tasksCount = 0;

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
	addScrollbar();
});
// Control by keyboard
taskTitleInput.addEventListener('keydown', (e) => {

	if(e.code === 'Enter'){
		if(!taskTitleInput.value) return;
		init();
		addScrollbar();
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
			<div class="task__header">
				<input type="checkbox" class="task__checkbox" id="task-checkbox${taskCheckboxCount}">
				<label for="task-checkbox${taskCheckboxCount}" class="task__title" id="task-title">${taskTitleInput.value}</label>
			</div>
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

	tasksCount++;
	tasksLeft();
	saveToLS();
}

//* Scrollbar
function addScrollbar(){
	if(tasks.clientHeight >= 500){
		main.classList.add('scroll');	
	}
	else{
		main.classList.remove('scroll');
	}

	taskTitleInput.value = '';
	taskDescriptionInput.value = '';
}

//* Highlight done task
window.addEventListener('click', function(e){
	document.querySelectorAll('.task__checkbox').forEach((element) => {
		if(e.target == element){
			element.checked ? element.nextElementSibling.classList.add('done') : element.nextElementSibling.classList.remove('done');
			

			let allTasks = document.querySelectorAll('.task');
			let doneTasks = document.querySelectorAll('.done');

			let activeTasksLeft = allTasks.length - doneTasks.length;
			tasksCount = activeTasksLeft;
			tasksLeft();
			saveToLS();
		}
	})
})

//* Delete task
window.addEventListener('click', function(e){
	document.querySelectorAll('.fa-regular').forEach(function(element){
		if(e.target == element){
			element.closest('div.task').remove();

			if(element.parentElement.parentElement.previousElementSibling.firstElementChild.
				lastElementChild.classList.contains('done')){
					tasksLeft()
					saveToLS();
			}
			else{
				tasksCount--;
				tasksLeft()
				saveToLS();
			}
		}
	})
})
document.querySelector('#clear-button').addEventListener('click', () => {
	document.querySelectorAll('.done').forEach(el => {
		el.closest('div.task').remove();

		addScrollbar();

		tasksLeft();
		saveToLS();
	})
})

//* Tasks left
let footerTasksLeft = document.querySelector('#tasks-left');
function tasksLeft(){
	localStorage.setItem('tasksleft', tasksCount);
	let tasksLeftLS = localStorage.getItem('tasksleft');
	if(tasksCount == 1){
		footerTasksLeft.innerHTML = `${tasksLeftLS} item left`;
	}
	else{
		footerTasksLeft.innerHTML = `${tasksLeftLS} items left`;
	}
}
tasksLeft();


//* Sort category
// Visual part
const sortCategories = document.querySelectorAll('#sort-categoty');
sortCategories[0].classList.add('active');
document.querySelector('#sort-list').addEventListener('click', (e) => {
	sortCategories.forEach(category => {
		if(category.classList.contains('active')){
			category.classList.remove('active');
		}
		if(e.target == category){
			category.classList.add('active');
		}
	})
})

// Actually sorting
window.addEventListener('click', (e) => {

	const headerTitle = document.querySelector('#header-title');
	let tasks = document.querySelectorAll('.task');

	if(e.target == sortCategories[0]){

		headerTitle.innerHTML = 'Tasks';

		addButton.style.display = 'block';

		tasks.forEach(task => {
			task.closest('div.task').style.display = 'flex';
		})
		
	}

	else if(e.target == sortCategories[1]){

		headerTitle.innerHTML = 'Active tasks';

		addButton.style.display = 'none';

		tasks.forEach(task => {
			if(task.firstElementChild.firstElementChild.lastElementChild.classList.contains('done')){
				task.closest('div.task').style.display = 'none';
			}
			if(!task.firstElementChild.firstElementChild.lastElementChild.classList.contains('done')){
				task.closest('div.task').style.display = 'flex';
			}			
		})
	}

	else if(e.target == sortCategories[2]){

		headerTitle.innerHTML = 'Done tasks';

		addButton.style.display = 'none';

		tasks.forEach(task => {
			if(!task.firstElementChild.firstElementChild.lastElementChild.classList.contains('done')){
				task.closest('div.task').style.display = 'none';
			}
			if(task.firstElementChild.firstElementChild.lastElementChild.classList.contains('done')){
				task.closest('div.task').style.display = 'flex';
			}
		})
	}

	if(sortCategories[1].classList.contains('active')){
		tasks.forEach(task => {
			if(e.target == task.firstElementChild.firstElementChild.lastElementChild){
				task.style.display = 'none';
			}
		})
	}

	if(sortCategories[2].classList.contains('active')){
		tasks.forEach(task => {
			if(e.target == task.firstElementChild.firstElementChild.lastElementChild){
				task.style.display = 'none';
			}
		})
	}
})

function saveToLS(){
	localStorage.setItem('tasks', tasks.innerHTML);
}
if(localStorage.getItem('tasks')) tasks.innerHTML = localStorage.getItem('tasks');
document.querySelectorAll('.task__checkbox').forEach((element) => {
	if(element.nextElementSibling.classList.contains('done')){
		element.checked = true;
	}
});
addScrollbar();