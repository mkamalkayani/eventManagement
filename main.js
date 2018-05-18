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
		<div class="event-header" id="id${eventData[i].id}">
		<h6 class="card-header">${eventData[i].title}</h6>
			<div class="event-body"></div>
		</div>`;

		eventCatalogue.insertAdjacentHTML('beforeend',event);
		// console.log(i," eventID ",eventData[i].id);
		
		for(let j=0; j<projectData.length; j++){

			if(eventData[i].id === projectData[j]["event"]["id"]){
				var project = `<li class="project">${projectData[j]['title']}</li>`;
				var eventBody = document.querySelector(` #id${eventData[i].id} .event-body`);
				eventBody.insertAdjacentHTML('beforeend',project);
	    		// console.log(j,projectData[i]["event"]["id"]);
			}	
		}
	}
});

 //    for(let i=0;i<projectData.length; i++){
	//     var event = 
	//           `<div class="accordion" id="eventCatalogue">
	//           <div class="card">
	//             <div class="" id="headingOne">
	//               <h5 class="mb-0">
	//                 <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
	//                   ${eventData[i].title}
	//                 </button>
	//               </h5>
	//             </div>

	//             <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#eventCatalogue">
	//               <div class="card-body">
	//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, repellendus!
	//               </div>
	//             </div>
	//           </div>
	//         </div>`;

	//     //console.log(event);
	//     eventCatalogue.insertAdjacentHTML('beforeend',event);
	// }

	// `<div class="accordion" id="eventCatalogue">
	//           <div class="card">
	//             <div class="" id="headingOne">
	//               <h5 class="mb-0">
	//                 <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
	//                   ${eventData[i].title}
	//                 </button>
	//               </h5>
	//             </div>

	//             <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#eventCatalogue">
	//               <div class="card-body">
	//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, repellendus!
	//               </div>
	//             </div>
	//           </div>
	//         </div>`