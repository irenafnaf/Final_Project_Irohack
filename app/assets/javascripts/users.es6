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
		document.getElementById('clients-text').classList.remove('closed');
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

	$(".project-whiteDiv").on("click", "#js-projects-close", function(){
		document.getElementById('projects-slider').classList.toggle('closed');
	});


	function getClients(){
		$.ajax({
			type: "GET",
			url: `/api/clients`,
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
		var $projectList = $(".user-clients-projects");
		$projectList.empty();
		var $projectWhiteDiv = $(".project-whiteDiv");
		var closeButton = `<img src="/assets/close_button.png" id="js-projects-close">`;

		response.forEach(function(project){

			var html = ` 						
						<li  class= "js-user-one-project" data-project-id=${project.id}
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



	$(".user-clients-projects").on("click", ".js-user-one-project", function(){
		document.getElementById('project-main-display-slider').classList.toggle('closed');
	});

	$(".project-main-display-slider").on("click", "#js-project-main-close", function(){
		document.getElementById('project-main-display-slider').classList.toggle('closed');
	});

	$(".user-clients-projects").on("click", ".js-user-one-project", function(event){
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

	 $(".user-clients-projects").on("click", ".js-user-one-project", function(event){
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
		
			var $projectImageUpload = $(".image-upload-form-div");
			 $projectImageUpload.empty();

			var html = `
				<div class="container-space"></div>
				<div class="infoTitle BoldText" style="font-size:20px; margin-top: 2%;"> Images </div>
				
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
				$projectImageUpload.prepend(html);

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


						var new_image= `<img src="${newUrl}" id="${idToAdd}" style="width:15%; height:10%">`;
						$thumbnailGallery.append(new_image);		  
							
						});
					
	}

	$(".thumbnailGalleryDiv").on("click", "[data-thumnbnail-id]", function(event){
		var data_id = $(event.currentTarget).attr('data-thumnbnail-id')
		// console.log(data_id);
		
		var $imageModal = $(".modal-body")
		$imageModal.empty();
		
		var imageSource = $(event.currentTarget).attr('src')
		// console.log(imageSource);
		
		newImageTag = `<img src="${imageSource}" style="width: 100%;">`;
		
		$imageModal.append(newImageTag);
		$("#imagemodal").modal('show');
	})

	$(".user-clients-projects").on("click", ".js-user-one-project", function(event){
		var projectName = $(event.currentTarget).data("project-name");
		var projectId = $(event.currentTarget).data("project-id");
		var clientId = $("#projects-slider").data("client");
		console.log(projectName)
		console.log(projectId)

		$comments = $(".commentsDiv");
		$comments.empty();
		var comments_table = ` <div class="container-space"></div>
							<div class="infoTitle BoldText" style="font-size:20px;"> Comments </div>

							<table class="comments-table">
								<tbody>
									<tr class="table-top-row">
										<td style="width: 12%;">&nbsp;Date</td>
										<td style="width: 16%;">&nbsp;By</td>
										<td style="width: 60%;">&nbsp;Comments</td>
										<td style="width: 10%;">&nbsp;</td>
									</tr>
									<tr class="next-row">
										<td style="width: 135px;">&nbsp;</td>
										<td style="width: 239px;">&nbsp;</td>
										<td style="width: 761px;">&nbsp;
											<textarea name="comment-body" id="comments-id" rows="2" cols="30">
											
											</textarea>
										</td>
										<td style="width: 203px;">&nbsp;<p class="insert-comment">Insert</p></td>
									</tr>
								</tbody>
							</table>`;
		$comments.append(comments_table);					


	});




});	
