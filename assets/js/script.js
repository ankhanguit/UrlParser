
/** INIT VIEW */
tinymce.init({
    selector: '#info_output_editor',
    height: 400
});

var configure = {
	  title : '.title_news_detail.mb10'
	, description : '.description'
	, body : '.content_detail.fck_detail.width_common.block_ads_connect'
};

/** LISTENER */
$( "#btn_start" ).click(function() {
	$( "#btn_start" ).button('loading');
	if($("#info_url").val() != '') {
		parse($("#info_url").val(), configure, function(data){
			showEditor(data);
			$('#info_output_dialog').modal('show');
			$("#btn_start" ).button('reset');
		}, function() {
			$("#btn_start" ).button('reset');
			alert("Can't get data from this url");
		});
	} else {
		$("#info_url").prop('required',true);
	}
});


/** FUNCTIONS */
function showEditor(data) {
	var outputHtml = "";
	outputHtml += "<h1>" + data.article_title + "</h1>";
	outputHtml += "<h2>" + data.article_desctiption + "</h2>";
	data.article_content.forEach(function(element){
		element.texts.forEach(function(text){
			outputHtml += "<p>" + text + "</p>" ;
		});

		outputHtml += "<img src=\"" + element.picture.src + "\"alt=\"" + element.picture.alt + "\"/>";
	});
	tinymce.get('info_output_editor').setContent(outputHtml);
}