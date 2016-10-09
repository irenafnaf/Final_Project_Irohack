$(document).on("ready", function(){

	$("#js-newproject").mouseover(function(){
		this.src="/assets/newproject_button_mouseover.png"
		}).mouseout(function(){
		this.src="/assets/newproject_button.png"
	});

	$(".project-whiteDiv").on("click", "#js-client-projects-close", function(){
		document.getElementById('client-projects-slider').classList.toggle('closed');
	});

	$("#js-newproject").mouseover(function(){
		document.getElementById('newproject-form').classList.toggle('closed');
	});


	function getTypes(response){
		$.ajax({
			type: "GET",
			url: `/api/types`,
			success: renderTypeNames,
			error: function (error) {
				console.log("Error!")
			}
		})


	}

	function renderTypeNames(response){
		var $dropDowns = $("#js-dropdowns");
		var dropdownValue = $("#js-one-dropdown").last().data("dropdown") + 1
		var selectHtml = `<select id="js-one-dropdown" data-dropdown="${dropdownValue}" 
						class="js-required form-control" style="width:60%;"></select>`
		$dropDowns.append(selectHtml);				

		response.forEach(function(type){
			var typeId = type.id
			var typeName = type.name
			
			var html = `<option id="js-type" value="${typeId}"> ${type.name} </option>`;
		
		$("#js-one-dropdown:last-child").append(html);
		
		});
	}

	$(".add-type").on("click", function(){
		getTypes();

	})	


	$("#js-newproject-form").on("submit", function(event){
		event.preventDefault();
		var typeIds = [];
		var clientId = $(this).data("client")
		$("#js-dropdowns select").each(function(element) {
			var selectedTypeIds = parseInt($(this).val())
			typeIds.push(selectedTypeIds);
		});

		var emptycounter = 0
		$(".js-required").each(function(index, ele){
			if ($(ele).val() === "") {
					emptycounter++
			};
		});
		if (emptycounter === 0){
			var newProject = { project: {
								client_id: clientId,
								name: $("#js-name").val(),
								type_ids: typeIds,
								description: $("#js-description").val(),
								due_date: $("#js-due_date").val()
								}
								
							 }
			console.log(newProject);
			$.ajax({
				type: "POST",
				url: `/api/clients/${clientId}/projects`,
				data: newProject,
				success: function(success){
				console.log("success!");
				},
				error: function(error){
				console.log(error);
				}
			});
		};
	
	});

	$("#js-client-projects-button").mouseover(function(){
		this.src="/assets/client_projects_button_mouseover.png"
		}).mouseout(function(){
		this.src="/assets/client_projects_button.png"
	});


	$("#js-client-projects-button").mouseover(function(){

		var clientId = $("#client-projects-slider").data("client")
		
		$.ajax({
			type: "GET",
			url: `/api/clients/${clientId}/projects`,
			success: function(response){
				showProjects(response);
			},
			error: 
					function(error){
				console.log(error);
			}
		});

		document.getElementById('client-projects-slider').classList.toggle('closed');

	});	


	function showProjects(response){
		// console.log(response);
		var $projectList = $(".clients-projects");
		$projectList.empty();

		var $projectWhiteDiv = $(".project-whiteDiv");
		var projectListCloseButton = `<img src="/assets/close_button.png" id="js-client-projects-close">`;

		response.forEach(function(project){

			var html = ` 						
						<li  class= "js-one-project" data-project-id=${project.id}
							data-project-name=${project.name}>
							<p> ${project.name} </p>
						</li>
						`;

			$projectList.append(html);
		});

		$projectWhiteDiv.append(projectListCloseButton);
	}

	function projectsError(error){
		console.log("Error!");
		// console.log(error.responseText);
	}

	$(".clients-projects").on("click", ".js-one-project", function(){
		document.getElementById('client-project-main-display-slider').classList.toggle('closed');
	});

	$(".client-project-main-display-slider").on("click", "#js-client-project-main-close", function(){
		document.getElementById('client-project-main-display-slider').classList.toggle('closed');
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

		var $clientProjectMainDisplay = $(".client-project-main-display-slider");
		var clientsProjectsCloseButton = `<img src="/assets/close_button.png" id="js-client-project-main-close">`;

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
							<select id="project-status-dropdown" class="form-control" style="width:60%;">
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
		$clientProjectMainDisplay.append(clientsProjectsCloseButton);
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
		var $titleDiv = $(".title-div");
		$titleDiv.empty();
		var headline = `
				<div class="client-infoTitle BoldText" style="font-size:20px;"> Images </div>`;
		$titleDiv.append(headline);
		
		var $thumbnailGallery = $(".thumbnailGalleryDiv");
		$thumbnailGallery.empty();

		var gallery = response.forEach(function(singleResponse){
						var url = singleResponse.image.url
						// console.log(url);
						var idForImg = singleResponse.name
						// console.log(idForImg)


						var html= `<img src="${url}" id="imageresource" class="project-thumbnail" data-thumnbnail-id="${idForImg}" 
									style="width:25%;"> `;
						$thumbnailGallery.append(html);		  
					});
		// console.log(response);
	}

	$(".thumbnailGalleryDiv").on("click", "[data-thumnbnail-id]", function(event){
		var data_id = $(event.currentTarget).attr('data-thumnbnail-id')
		console.log(data_id);
		
		var $imageModal = $(".modal-body")
		$imageModal.empty();
		
		var imageSource = $(event.currentTarget).attr('src')
		// console.log(imageSource);
		
		newImageTag = `<img src="${imageSource}" style="width: 100%;">`;
		
		$imageModal.append(newImageTag);
		$("#imagemodal").modal('show');
	});

	$(".clients-projects").on("click", ".js-one-project", function(event){
		var projectName = $(event.currentTarget).data("project-name");
		var projectId = $(event.currentTarget).data("project-id");
		var clientId = $("#projects-slider").data("client");
		console.log(projectName)
		console.log(projectId)

		$clientsComments = $(".clientsCommentsDiv");
		$clientsComments.empty();
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
		$clientsComments.append(comments_table);					


	});

	

	

});


