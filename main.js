// const currentEvent = {
// 	"id": 13,
// 	"title": "Prototyping Days #1",
// 	"projectdeadline": null 
// }

var eventCatalogue = document.querySelector('#event-catalogue .card-body');

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

var projectData = getProjectData();
// setTimeout(function(){
// 	console.log(projectData,"projectData");
// },1000)



fetch('API/eventData.json')
.then(function(eventData) {
	return eventData.json();
})
.then(function(eventData) {
	// console.log(eventData);

	for(let i=0; i<eventData.length; i++){
		var event = `
		<div class="event-header mb-1" id="id${eventData[i].id}">
		<h6 class="card-header">${eventData[i].title}</h6>
			<div class="event-body"></div>
		</div>`;

		eventCatalogue.insertAdjacentHTML('beforeend',event);
		// console.log(i," eventID ",eventData[i].id);
		
		for(let j=0; j<projectData.length; j++){

			if(eventData[i].id === projectData[j]["event"]["id"]){
				// var project = `<li class="project">${projectData[j]['title']}</li>`;
				var project = createProjectModal(projectData[j]['id'], projectData[j]['title'], projectData[j]['short_description'], projectData[j]['description']);

				var eventBody = document.querySelector(` #id${eventData[i].id} .event-body`);
				eventBody.insertAdjacentHTML('beforeend',project);
	    		// console.log(j,projectData[i]["event"]["id"]);
			}	
		}
	}
});

 
// Modal
// Creating the moal behavior on Project list
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