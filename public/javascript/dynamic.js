	window.onload = function () {
		var h = document.querySelectorAll(".heart");
		h.forEach(function(heart){
			heart.addEventListener('click', function(){
				this.classList.toggle("fa-heart-o");
				this.classList.toggle("fa-heart");
				this.classList.toggle("liked");

			});
		});
	}
