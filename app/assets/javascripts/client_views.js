$(document).on("ready", function(){

	$("#js-newproject").mouseover(function(){
		this.src="/assets/newproject_button_mouseover.png"
		}).mouseout(function(){
		this.src="/assets/newproject_button.png"
	});

	function getTypes(response){
		$.ajax({
			type: "GET",
			url: `http://localhost:3000/api/types`,
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
						class="js-required form-control" style="width:60%; font-family:'Caviar Dreams';"></select>`
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
				url: `http://localhost:3000/api/clients/${clientId}/projects`,
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

		var clientId = $("#projects-slider").data("client")
		
		$.ajax({
			type: "GET",
			url: `http://localhost:3000/api/clients/${clientId}/projects`,
			success: function(response){
				showProjects(response);
			},
			error: 
					function(error){
				console.log(error);
			}
		});

		document.getElementById('projects-slider').classList.toggle('closed');

	});	


	function showProjects(response){
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

	$(".clients-projects").on("click", ".js-one-project", function(){
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
		// console.log(response);
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
	}



	

});


