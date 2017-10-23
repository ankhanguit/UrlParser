function parse(url, type) {
	$( "#btn_start" ).button('loading');
	httpGet(url, function(responseHtml){
		var response = $(responseHtml);
		var body = response.find('.the-article-body.cms-body').children();		
		var article_title;
		var article_subTitle;
		var article_content = [];

		// =========== TITLE ============
		response.find('.the-article-title.cms-title').each(function(i, element){
			article_title = $(element).text();
		});
		
		// =========== SUB TITLE ============
		response.find('.the-article-summary.cms-desc').each(function(i, element){
			article_subTitle = $(element).text();
		});		
		
		// =========== CONTENT ============
		var obj = createObj();
		body.each(function(i, element){
			
			// =========== TEXT ============
			if ($(element).prev().is("p")) {
				obj.texts.push($(element).text());
			}
			
			// =========== PICTURE ============
			var pic = $(element).find('td.pic img');
			if (pic.length >= 1) {
				var src = pic.attr('src');
				var alt = pic.attr('alt');
				
				obj.picture.push({
					  "src" : src
					, "alt" : alt
				});
				article_content.push(obj);
				obj = createObj();
			}
		});

		alert(article_title);
	}, function() {
		// ON ERROR
	});

	$("#btn_start" ).button('reset');
	$('#info_output_dialog').modal('show');
}

function httpGet(theUrl, handleData, handleError)
{
	$.ajax({
		url: theUrl,
		type: 'GET',
		dataType: "html",
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
		, "picture" : []
	};
	
	return obj;
}
