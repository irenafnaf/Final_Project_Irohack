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
			console.log(theClient.id)
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
		console.log(clientName)
		console.log(clientId)
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

		console.log(response);

		var $projectList = $(".clients-projects");
		// $projectList.empty();

		response.forEach(function(project){

			var html = ` <h4> ${clientName}'s Projects: </h4>						
						<li  class= "js-one-project">
							<p data-project-id=${project.id}
							data-project-name=${project.name}> 
							${project.name} </p>
						</li>
						`;

			$projectList.append(html);
		});


	}

	function projectsError(error){
		console.log("Error!");
		// console.log(error.responseText);
	}

});	
