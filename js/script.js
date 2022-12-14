$(function(){
 $("#navbarToggle").blur(function(event){
  var screenwidth=window.innerWidth;
  if(screenwidth<992){
	// $("#collapsable-nav")(
	 $('.collapse:visible').hide().addClass('collapsed');
  }
 });
/* $(function(){
	$("#navbarToggle").click(function (event) {
	var screenwidth=window.innerWidth;
	if(screenwidth<992){
    $(event.target).focus();
	}
  });  */
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
}); 
/* $(function(){
	$("#navbarToggle").click(function (event) {
	var screenwidth=window.innerWidth;
	if(screenwidth<992){
    $(event.target).focus();
	}
  }); */
   
// $(function(){
 // $("#navbarToggle").blur(function(event){
  // var screenwidth=window.innerWidth;
  // if(screenwidth<992){
	// $("#collapsable-nav")(
	 // $('.collapse:visible').hide().addClass('collapsed');
  // }
 // });
 // $("#navbarToggle").focus(function(event){
  // var screenwidth=window.innerWidth;
  // if(screenwidth<992){
	// $("#collapsable-nav")(
	 // $('.collapse:visible').show() .addClass('collapsed');
  // });
 // }});
 // $("#navbarToggle").click(function (event) {
    // $(event.target).focus();
  // });
// });
/* $(function(){
	$("#navbarToggle").blur(function(event){
		var screenWidth = window.innerWidth;
		if(screenWidth<992){
			$(#collapsable-nav".collapse('hide');
		}
	});
}); */
(function (global) {

var dc = {};
//<script src="snippets/homesnippet.html" crossorigin="anonymous"></script>
var homeHtml = "snippets/homesnippet.html";  homeHtml.crossorigin="anonymous";
var allCategoriesUrl =
  "https://davids-restaurant.herokuapp.com/categories.json";
var categoriesTitleHtml = "snippets/categories-title-snippets.html";
var categoryHtml = "snippets/category-snippet.html";

//var homeHtml = "https://drive.google.com/file/d/1f_-PRCiBiEd0k_Ao9a1qLwejjWZMUeVr/view?usp=sharing";
// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}
// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);
});
// Load the menu categories view
dc.loadMenuCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);
};


// Builds HTML for the categories page based on the data
// from the server
function buildAndShowCategoriesHTML (categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          var categoriesViewHtml =
            buildCategoriesViewHtml(categories,
                                    categoriesTitleHtml,
                                    categoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}


// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
                                 categoriesTitleHtml,
                                 categoryHtml) {

  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}



global.$dc = dc;

})(window);