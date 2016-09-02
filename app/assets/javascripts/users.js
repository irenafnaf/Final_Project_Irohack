$(document).on("ready", function(){
	$("#js-getclients").on("click", function(){
		getClients();
	});

	function getClients(){
		$.ajax({
			type: "GET",
			url: "/api/clients",
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
			var html = `<li>
							<p> ${theClient.name} </p>
						</li>
						`;

			$clientList.append(html);
		});
	};
	
});