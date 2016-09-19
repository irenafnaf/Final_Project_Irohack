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
						class="js-required" style="width:60%;">`
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
		$("js-required").each(function(index, ele){
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

	$("#js-projects-button").mouseover(function(){
		this.src="/assets/projects_button_mouseover.png"
		}).mouseout(function(){
		this.src="/assets/projects_button.png"
	});


	$("#js-projects-button").mouseover(function(){

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

		console.log(response);

		var $projectList = $(".clients-projects");
		// $projectList.empty();

		response.forEach(function(project){

			var html = ` 						
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


