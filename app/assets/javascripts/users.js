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
		document.getElementById('slider').classList.remove('closed');
	});

	$("#js-clients").on("click", ".js-one-client", function(){
		document.getElementById('projects-slider').classList.toggle('closed');
	});

	$("#js-projects-close").on("click", function(){
		document.getElementById('projects-slider').classList.toggle2('closed');
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
			url: `/api/clients/${clientId}/projects`,
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
		var $projectWhiteDiv = $(".project-whiteDiv");
		var closeButton = `<img src="/assets/close_button.png" id="js-projects-close">`;

		response.forEach(function(project){

			var html = ` 						
						<li  class= "js-one-project" data-project-id=${project.id}
							data-project-name=${project.name}>
							<p> ${project.name} </p>
						</li>
						`;

			$projectList.append(html);
		});
			
			$projectWhiteDiv.append(closeButton);
	}

	function projectsError(error){
		console.log("Error!");
		// console.log(error.responseText);
	}



	$(".clients-projects").on("click", ".js-one-project", function(){
		document.getElementById('project-main-display-slider').classList.toggle('closed');
	});

	$("#js-project-main-close").on("click", function(){
		document.getElementById('project-main-display-slider').classList.toggle('closed');
	});

	$(".clients-projects").on("click", ".js-one-project", function(event){
		var projectName = $(event.currentTarget).data("project-name");
		var projectId = $(event.currentTarget).data("project-id");
		var clientId = $("#projects-slider").data("client");
		// console.log(projectName)
		// console.log(projectId)
		$.ajax({
			type: "GET",
			url: `/api/clients/${clientId}/projects/${projectId}`,
			success: function(response){
				showProjectInfo(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});

	function showProjectInfo(response){
		// console.log(response);
		var $projectInfo = $(".project-info");
		$projectInfo.empty();

		var $projectMainDisplay = $("#project-main-display-slider");
		var projectsCloseButton = `<img src="/assets/close_button.png" id="js-project-main-close">`;

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
		var html = `<div class="container-space"></div>
						<div class="infoTitle BoldText" style="font-size:20px;"> Project Info </div>
					<div class="info-content">
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
							<select id="project-status-dropdown" class="form-control" style="width:60%; height:25px;">
								<option> In Design </option>
								<option> Pending Design Approval </option>
								<option> Return to Design </option>
								<option> Approved </option>
								<option> Cancel </option>
							<select> <p class="save-status"> Save</p>	
						 </div>  
					</div>					
					`;
		$projectInfo.append(html);
		$projectMainDisplay.append(projectsCloseButton);
	 }

	 $(".clients-projects").on("click", ".js-one-project", function(event){
		var projectName = $(event.currentTarget).data("project-name");
		var projectId = $(event.currentTarget).data("project-id");
		var clientId = $("#projects-slider").data("client");
		// console.log(projectName)
		// console.log(projectId)
		$.ajax({
			type: "GET",
			url: `/api/projects/${projectId}/thumbnails`,
			success: function(response){
				// console.log(projectId);
				showImageUploadForm(projectId);
				showThumbnailGallery(projectId, response);	
				// console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});

	function showThumbnailGallery(projectId, response){
		// console.log(response);

		var $thumbnailGallery = $(".thumbnailGalleryDiv");
		$thumbnailGallery.empty();

		var gallery = response.forEach(function(singleResponse){
						var url = singleResponse.image.url
						// console.log(url);
						var idForImg = singleResponse.name
						// console.log(idForImg)


						var html= `<img src="${url}" id="imageresource" class="project-thumbnail" data-thumnbnail-id="${idForImg}" 
									style="width:15%; height:10%"> `;
						$thumbnailGallery.append(html);		  
					});
		// console.log(response);
		

	}

	function showImageUploadForm(projectId, response){
		//console.log(projectId);
		// $projectImages.empty();
		$.ajax({
			type: "GET",
			url: `/api/projects/${projectId}/types`,
			success: projectTypeNames,
				// function (response){
				// console.log(response);
			
			error: function(error){
				console.log(error);
			}
		});
		
		function projectTypeNames(response, projectId){
			var typeOptions = ""
			
			response.forEach(function(type){
				var typeId = type.id
				var typeName = type.name
				var optionHtml = `<option id="project-type${typeId}" value="${type.id}">
									${typeName}
									</option>`;

			typeOptions += optionHtml.toString();

			});
		
			var $projectImages = $(".imagesDiv");

			var html = `
				<div class="container-space"></div>
				<div class="infoTitle BoldText" style="font-size:20px;"> Images </div>
				
				<form class="new_thumbnail" id="new_thumbnail" data-projectId="${projectId}" enctype="multipart/form-data" 
				action="/api/projects/1/thumbnails" data-remote="true" accept-charset="UTF-8" method="post">
				<input name="utf8" type="hidden" value="✓">
				<input type="hidden" name="authenticity_token" 
				value="nuLUFskWsE5VpxRsofr97K9dd3QfmU+bFhJfzbXsp9IsNKHOAibKT9IIBWiHPHryX0p8SUiZoPzOM2CHzv+84Q==">
  				<div class="info-content">
						<div class="infoFieldLabel BoldText"> Name: </div>
						<div class="infoThumbnail"> 
							<select name="thumbnail[name]" id="thumbnail_name" class="form-control js-required" style="width:85%; height:25px;">
				    			${typeOptions}
				    			</select>
						 </div>  
					</div>					
				
				<div class="info-content">
				  <div class="field btn btn-default btn-file"">
				    <input type="file" name="thumbnail[image]" id="thumbnail_image" class="js-required">
				  </div>
				</div>
				
				  <div class="actions">
				    <input type="submit" name="commit" value="Upload Proof" class="js-required upload-submit" data-disable-with="Upload Proof">
				  </div>
				</form>
				`;
				$projectImages.prepend(html);

		}
	
		$(".imagesDiv").on("submit", ".new_thumbnail", function(e){
		// alert("Submitted!")
		// e.preventDefault();
		// console.log("hello");
		// 			// $(document).trigger("ajax:success")
			setTimeout(function(){
				submitImageThumbnail(projectId)
			}, 1000)
		})
				
	} 

	
	function submitImageThumbnail(projectId){
		// $(document).on("ajax:success", function(){
		console.log(projectId);
	
				$.ajax({
				type: "GET",
				url: `/api/projects/${projectId}/thumbnails`,
				success: mostRecentThumbnail,
				
				error: function(error){
					console.log(error);
				}
			});
	
	}

	function mostRecentThumbnail(response){
		console.log(response)
		var $thumbnailGallery = $(".thumbnailGalleryDiv");
		$thumbnailGallery.empty();
		var gallery = response.forEach(function(singleResponse){
						
						var newUrl = singleResponse.image.url
						var idToAdd = singleResponse.name						


						var new_image= `<img src="${newUrl}" id="${idToAdd}" style="width:10%; height:10%"> `;
						$thumbnailGallery.append(new_image);		  
							
						});
					
					
	}




	// function recentThumbnailGallery(response) {
	// 	console.log(response);
	// }
// get request to get last thumbnail created thumbnail.last
// append thumbnail gallery to put las thumbnail created

//only most recent one with that name

});	
