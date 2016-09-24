$(document).on("ready", function(){
	
	$("#js-getclients").mouseover(function(){
		this.src="/assets/clients_button_mouseover.png"
		}).mouseout(function(){
		this.src="/assets/clients_button.png"
		});


	// $("#welcome").animate({
	// 							opacity: 0});
	// });

	$("#js-getclients").mouseover(function(){
		$(".clients-text").css("visibility", "visible");
	});

	$("#js-getclients").mouseover(function(){

		getClients();
	}); 

	$("#js-clients").on("click", ".js-one-client", function(){
		document.getElementById('slider').classList.toggle('closed');
	});

	$("#js-clients").on("click", ".js-one-client", function(){
		document.getElementById('projects-slider').classList.toggle('closed');
	});





	function getClients(){
		$.ajax({
			type: "GET",
			url: `http://localhost:3000/api/clients`,
			success: function(response){
				showClients(response);

			},
			error: handleError
		});


	}

	function handleError(error){
		console.log("Error!");
		// console.log(error.responseText);
	}

	function showClients(response) {
		var $clientList = $('#js-clients');
		$clientList.empty();

		response.forEach(function(theClient){
			// console.log(theClient.id)
			var html = `
						
							<li  class= "js-one-client" data-client-name=${theClient.name} data-client-id=${theClient.id}>
								<p> ${theClient.name} </p>
							</li>
							
						
						`;

			$clientList.append(html);
		});


	};


	$("#js-clients").on("click", ".js-one-client", function(event){

		// console.log(event.currentTarget)
		var clientId = $(event.currentTarget).data("client-id");
		var clientName = $(event.currentTarget).data("client-name");
		// console.log(clientName)
		// console.log(clientId)
		$.ajax({
			type: "get",
			url: `http://localhost:3000/api/clients/${clientId}/projects`,
			success: function(response){
				showProjects(response, clientName);
			},
			error: projectsError,
		});



	});


	function showProjects(response, clientName){

		// console.log(response);

		var $projectList = $(".clients-projects");
		$projectList.empty();

		response.forEach(function(project){

			var html = ` 						
						<li  class= "js-one-project" data-project-id=${project.id}
							data-project-name=${project.name}>
							<p> ${project.name} </p>
						</li>
						`;

			$projectList.append(html);
		});


	}

	function projectsError(error){
		console.log("Error!");
		// console.log(error.responseText);
	}

	$(".clients-projects").on("click", ".js-one-project", function(event){
		var projectName = $(event.currentTarget).data("project-name");
		var projectId = $(event.currentTarget).data("project-id");
		var clientId = $("#projects-slider").data("client");
		console.log(projectName)
		console.log(projectId)
		$.ajax({
			type: "GET",
			url: `http://localhost:3000/api/clients/${clientId}/projects/${projectId}`,
			success: function(response){
				showProjectInfo(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});

	function showProjectInfo(response){
		console.log(response);
		var $projectInfo = $(".project-info");
		$projectInfo.empty();
		var types = response.types
		// console.log(types)
		var all_types = "";
		
			types.forEach(function(type, idx, array){
				// if type.last without comma else
				if (idx === array.length - 1) {
					all_types += (type.name)
				} else {
					all_types += (type.name + ", ")
				}
			});
		var html = `<div class="info-content">
						<div class="infoFieldLabel BoldText"> Project Name: </div>
						<div class="infoResponse"> ${response.project.name} </div>  
					</div>	
					<div class="info-content">
						<div class="infoFieldLabel BoldText"> Project Types: </div>
						<div class="infoResponse"> ${all_types} </div>  
					</div>	
					<div class="info-content">
						<div class="infoFieldLabel BoldText"> Due Date: </div>
						<div class="infoResponse"> ${response.project.due_date} </div>  
					</div>
					<div class="info-content">
						<div class="infoFieldLabel BoldText"> Description: </div>
						<div class="infoResponse"> ${response.project.description} </div>  
					</div>
					<div class="info-content">
						<div class="infoFieldLabel BoldText"> Project Status: </div>
						<div class="infoResponse"> 
							<select id="project-status-dropdown" class="form-control" style="width:60%;">
								<option> In Design </option>
								<option> Pending Design Approval </option>
								<option> Return to Design </option>
								<option> Approved </option>
								<option> Cancel </option>
							<select> Save	
						 </div>  
					</div>
					`;
		$projectInfo.append(html);
	 }

});	
