$( document ).ready(function() {

// Current Event Data from Api
const currentEvent = {
	"id": 13,
	"title": "Prototyping Days #1",
	"projectdeadline": null 
}

// Set current event title
document.querySelector('.jumbotron .current-event').innerHTML = `
	<h4>${currentEvent.title}
	<span class="badge badge-secondary">New</span></h4>`;

// Goto current Event in Event Catalogue
document.querySelector('.jumbotron .btn').setAttribute('href',`#id${currentEvent.id}`);

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

// sort by name
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
	// console.log(Data);
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
.then(function(eventData){

	// Sort by event ID
	document.querySelector('.dropdownEventCatalogue > .alphabatically').addEventListener('click', function(e){
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');

		eventCatalogue.innerHTML = "";
		sortAlphabetically(eventData, 'title');
		placeEvents(eventData);
	})

	// Sort by event ID
	document.querySelector('.dropdownEventCatalogue > .event-id').addEventListener('click', function(e){
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');

		eventCatalogue.innerHTML = "";
		sortNumerically(eventData, 'id');
		placeEvents(eventData);
	}) 
})
.then(function(){
	// Angle up and down on click
	$('#event-catalogue .card-header').on('click', function(e) {
		$(this).find('[class*="angle"]').toggleClass('fa-angle-left fa-angle-down')
	});

	// sort by deadline
	$('#event-catalogue .card-header').on('click', function(e) {
		$(this).find('[class*="angle"]').toggleClass('fa-angle-left fa-angle-down')
	});
});


// Modal behavior on Projects
function createProjectModal(id, title, shortDescription, description){
	var projectModal = `<button type="button" class="btn btn-primary ml-4 my-2 d-block text-truncate" data-toggle="modal" data-target="#projectid${id}">
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
	<button type="button" class="btn btn-primary">Save changes</button>
	</div>
	</div>
	</div>
	</div>`

	return projectModal;
}


function placeEvents(eventData){
	for(let i=0; i<eventData.length; i++){
		var event = `		
		<div class="card-header mb-1 d-flex" data-toggle="collapse" data-target="#id${eventData[i].id}">
		<h6>${eventData[i].title}</h6>
		<i class="fas fa-sort-alpha-down  ml-auto mr-2"></i>
		<p>Deadline</p>
		<i class="fas fa-angle-left"></i>
		</div>
		<div id="id${eventData[i].id}" class="event-body collapse"></div>
		`;

		eventCatalogue.insertAdjacentHTML('beforeend',event);
		
		for(let j=0; j<projectData.length; j++){

			if(eventData[i].id === projectData[j]["event"]["id"]){
				var project = createProjectModal(projectData[j]['id'], projectData[j]['title'], projectData[j]['short_description'], projectData[j]['description']);

				var eventBody = document.querySelector(`#id${eventData[i].id}`);
				eventBody.insertAdjacentHTML('beforeend',project);
			}	
		}
	}
}

});




