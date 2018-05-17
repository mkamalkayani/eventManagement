// const currentEvent = {
// 	"id": 13,
// 	"title": "Prototyping Days #1",
// 	"projectdeadline": null 
// }

var eventCatalogue = document.querySelector('#event-catalogue');

fetch('API/eventData.json')
  .then(function(eventData) {
    return eventData.json();
  })
  .then(function(eventData) {
    console.log(eventData);
    
    for(let i=0;i<eventData.length; i++){
	    var event = 
	          `<div class="accordion" id="eventCatalogue">
	          <div class="card">
	            <div class="" id="headingOne">
	              <h5 class="mb-0">
	                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
	                  ${eventData[i].title}
	                </button>
	              </h5>
	            </div>

	            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#eventCatalogue">
	              <div class="card-body">
	                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, repellendus!
	              </div>
	            </div>
	          </div>
	        </div>`;

	    //console.log(event);
	    eventCatalogue.insertAdjacentHTML('beforeend',event);
	}

  });


fetch('API/projectData.json')
  .then(function(projectData) {  	
    return projectData.json();
  })
  .then(function(projectData) {
    console.log(projectData);
    
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

  });