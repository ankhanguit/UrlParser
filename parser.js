function parse(url, configure, handleData, handleError) {
	httpGet(url, function(responseHtml){
		var response = $(responseHtml);
				
		var article_title;
		var article_desctiption;
		var article_content = [];

		// ================================================================================ //
		// ===================================== TITLE ==================================== //
		article_title = response.find(configure.title).text();
		
		// ================================================================================ //
		// ================================== DESCRIPTION ================================= //
		article_desctiption = response.find(configure.description).text();
		
		// ================================================================================ //
		//===================================== CONTENT =================================== //
		var body = response.find(configure.body).children();
		var obj = createObj();
		body.each(function(i, element){
			
			// =========== TEXT ============
			if ($(element).is("p")) {
				obj.texts.push($(element).text());
			}
			
			// =========== PICTURE ============
			var pic = $(element).find('img');
			if (pic.length >= 1) {
				obj.picture.src = pic.attr('src');
				obj.picture.alt = pic.attr('alt');

				article_content.push(obj);
				obj = createObj();
			}

			if (i == body.length - 1) {
				article_content.push(obj);
			}
		});

		handleData({article_title: article_title, article_desctiption: article_desctiption, article_content: article_content});

	}, function() {
		handleError();
	});	
}

function httpGet(theUrl, handleData, handleError)
{
	$.ajax({
		url: theUrl,
		type: 'GET',
		success: function(responseHtml){
			handleData(responseHtml);
		},
        error: function() {
            handleError();
        }
	});
}

function createObj () {
	var obj = {
		  "texts" : []
		, "picture" : {
				  src : ""
				, alt : ""
		}
	};
	
	return obj;
}