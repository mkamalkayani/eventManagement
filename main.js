$( document ).ready(function() {

// Current Event Data from Api
const currentEvent = {
	"id": 13,
	"title": "Prototyping Days #1",
	"projectdeadline": null 
}

// Set current event title
document.querySelector('.jumbotron .current-event').innerHTML = `
<span class="badge badge-secondary">Current Event</span>
<h4>${currentEvent.title}</h4>`;

// Goto current Event in Event Catalogue
document.querySelector('.jumbotron .btn').addEventListener('click', function(){
	// Goto current Event in Event Catalogue
	$(`#id${currentEvent.id}`).collapse('toggle');
	$(`#id${currentEvent.id}`).parent().find(`[data-target="#id${currentEvent.id}"]`).find('i').toggleClass('fa-angle-left fa-angle-down');
})

// Fetch Project Data from Api
function getProjectData(){
	fetch('API/projectData.json')
	.then(function(response) {  	
		return response.json();
	})
	.then(function(response) {
		// console.log(response);
		projectData = response;
	})
}

// parameter is the object property to sort
function sortAlphabetically(Data, parameter){
	Data.sort(function(a, b) {
		  var nameA = a[parameter].toUpperCase(); // ignore upper and lowercase
		  var nameB = b[parameter].toUpperCase(); // ignore upper and lowercase
		  if (nameA < nameB) {
		  	return -1;
		  }
		  if (nameA > nameB) {
		  	return 1;
		  }

		  // names must be equal
		  return 0;
		});
}

// Sort Numerically
function sortNumerically(Data, parameter){
	Data.sort(function(a, b) {
		if (a[parameter] < b[parameter]) {
			return -1;
		}
		if (a[parameter] > b[parameter]) {
			return 1;
		}

	  // names must be equal
	  return 0;
	});
}

var projectData = getProjectData();
var eventCatalogue = document.querySelector('#event-catalogue .card-body');

fetch('API/eventData.json')
.then(function(eventData) {
	return eventData.json();
})
.then(function(eventData) {
	placeEvents(eventData);	
	return eventData;
})
.then(function(){

	// Sort Events by event title
	document.querySelector('.dropdownEventCatalogue > .alphabatically').addEventListener('click', function(e){
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');
		var events = document.querySelectorAll('.event-box');
		var eventCatalogueBody = document.querySelector('#events');
		sortAlpha(events,eventCatalogueBody);
	})

	// Sort Projects by project title
	document.querySelectorAll('#sort-project .alphabatically').forEach(function(obj){
		obj.addEventListener('click', function(e){
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
			var currentEventBox = e.path[4];
			projects = currentEventBox.querySelectorAll('.project-box');

			sortAlpha(projects, currentEventBox);
		})
	})
})
.then()

// Modal behavior on Projects
function createProjectModal(id, title, shortDescription, description){
	var projectModal = `
	<div class="project-box">
	<button type="button" class="btn btn-primary ml-4 my-2 d-block text-truncate" data-toggle="modal" data-target="#projectid${id}">
	${title}
	</button>

	<div class="modal fade" id="projectid${id}" tabindex="-1" role="dialog" aria-labelledby="projectModalLongTitle" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document">
	<div class="modal-content">
	<div class="modal-header">
	<h5 class="modal-title" id="projectModalLongTitle">Project Title: ${title}</h5>
	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
	<span aria-hidden="true">&times;</span>
	</button>
	</div>
	<div class="modal-body text-justify">
	<p><strong>Short Description: </strong>${shortDescription}</p>
	<p><strong>Description: </strong>${description}</p>
	</div>
	<div class="modal-footer">
	<button type="button" class="btn btn-primary">Like</button>
	<button type="button" class="btn btn-primary">Comment</button>
	<button type="button" class="btn btn-primary mr-auto">Join</button>
	<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
	</div>
	</div>
	</div>
	</div>
	</div>`

	return projectModal;
}

function placeEvents(eventData){
	for(let i=0; i<eventData.length; i++){
		var event = `
		<div class="event-box">		
		<div class="card-header mb-1" data-toggle="collapse" data-target="#id${eventData[i].id}">
		<div class="d-flex align-items-center">
		<h6>${eventData[i].title}</h6>
		<i class="fas fa-angle-left ml-auto"></i>
		</div>
		</div>
		<div id="id${eventData[i].id}" class="event-body collapse">
		</div>
		</div>
		`;
		eventCatalogue.insertAdjacentHTML('beforeend',event);

		var eventBody = document.querySelector(`#id${eventData[i].id}`);
		var sortEvent = `
		<div id="sort-project" class="dropdown ml-4">
		<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-id${eventData[i].id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		Sort Projects
		</button>
		<div class="dropdown-menu">
		<a class="dropdown-item alphabatically" href="#">Alphabatically</a>
		<a class="dropdown-item" href="#">By Deadline</a>
		</div>
		</div>`;

		eventBody.insertAdjacentHTML('beforeend',sortEvent);		
		for(let j=0; j<projectData.length; j++){

			if(eventData[i].id === projectData[j]["event"]["id"]){
				var project = createProjectModal(projectData[j]['id'], projectData[j]['title'], projectData[j]['short_description'], projectData[j]['description']);
				eventBody.insertAdjacentHTML('beforeend',project);
			}	
		}
	}
	angleUpDown();
}

function angleUpDown(){
	// Angle UpDown Event
	document.querySelectorAll('#event-catalogue #events .card-header').forEach(function(event){
		event.addEventListener('click', function(e) {
			$(e.target).parent().find('[class*="angle"]').toggleClass('fa-angle-down fa-angle-left');
		});
	})
}

function sortAlpha(nodeList,appendTo){
	nodeArr = Array.from(nodeList);
	nodeArr.sort(function (a, b) {
		return a.textContent > b.textContent ? 1 : -1;
	});

	nodeArr.forEach(function (p) {
		appendTo.appendChild(p);
	});
}


// 
});




