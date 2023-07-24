var current = null;
$(document).ready(function() {
	$(".tech").click(function(e){
		
		if (e.which != 1) return;
		if (current == this) return;
		
		current = this;
		e.stopPropagation();

		var id = $(this).attr("id");
		$(".tech").removeClass("selected selected2");
		$(this).addClass("selected");
		$(".tech").addClass("blurred");
		$(".path").removeClass("selected2").addClass("blurred2");
		unblurBack(id);
		unblurForward(id);		

	});
	$(document).click(function(e) {
		if (e.which != 1) return;
		
		current = null;
		$(".tech").removeClass("selected blurred");
		$(".path").removeClass("selected2 blurred2");
	});

});

function unblurBack(id) {
	var tech = $("#"+id);
	if (!tech.length) return;

	tech.addClass("selected2");
	if (tech.data("prereqs") == "") return;
	
	var prereqs = tech.data("prereqs").split(",");
	for (var i = 0; i < prereqs.length; i++) {
		unblurBack(prereqs[i]);
		$("#" + tech.attr('id') + "_" + prereqs[i]).addClass("selected2");
	}
}

function unblurForward(id) {
	$("#"+id).addClass("selected2");
	$(".path").each(function(){
		var pid = $(this).attr("id");
		if (pid.substring(pid.length - id.length - 1) == "_" + id) {
			$(this).addClass("selected2");
			unblurForward(pid.substring(0, pid.length - id.length - 1));
		}
	});
}

