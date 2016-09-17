$(document).on("ready", function(){

	$("#js-getclients").mouseover(function(){
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
		
		$("#js-dropdowns select").each(function(element) {
			var selectedTypeIds = $(this).val()
		selectedTypeIds.push(typeIds);
		});
		 console.log(typeIds);
		
	});

})