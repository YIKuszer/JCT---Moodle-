//======================================================
//	JCT - Moodle++ | Hide Courses
//------------------------------------------------------
//	Description:
//	-+ Allows user to chose which courses will show up in 
//	-+ his homepage. 
//	-+ (Something that cannot be done, in an official way)
//------------------------------------------------------
//	Author: Yossef Itzchak Kuszer
//	E-Mail: yossefkuszer@gmail.com
//	Date:   17/07/2016
//======================================================


//======================================================
// About:
// -+ the program add, two buttons the moodle page
// -+ when clicking in one of them, will open all the
// -+ courses that the user chose to let be showed
// -+ the other will open all the courses, with a button
// -+ with the option to hide/unhide the couse from the
// -+ homepage
// -+ All the user choices will be save in the localstorege
// -+ (Using the local storage API)
//======================================================

$(document).ready(function () {

	//set the courses menu on top
	setCoursesOnTop()

	
	addButtons();
	addHideUnhideButton();

	//check if open the page "current" or "all courses"
	// if the user does not have any course that he wants to hide,
	// the page, "all courses" will be open, else the page "current"

	//if there is no hide course, the page with the option to chose to hide/unhide will be open
	if(localStorage.length == 0)
		openAllCourses();
	else
		openMyCourses();

	//when the button is click , open the page "all courses"
	$("#show_all").click(function() {
		openAllCourses();
	});

	//when the button is click , open the page "current courses"
	$("#show_current").click(function() {
		openMyCourses();	
	});

	//when user click to hide a course, save the preference in the local storege, and change the button
	$(".hide_button").click(function() {
		
		//get the key is going to be set in the local storage
		var key = $(this).parents(".coursebox").attr("data-courseid");
		localStorage.setItem(key,key); //store key in local storege
		
		//change the button
		$(this).hide();
		$(this).siblings(".unhide_button").show();
	});

	//when user click to unhide a course, remove him in the local storege
	$(".unhide_button").click(function() {
		//get the key is going to be remove
		var key = $(this).parents(".coursebox").attr("data-courseid");
		localStorage.removeItem(key); //remove key from local storege

		//change the button
		$(this).hide();
		$(this).siblings(".hide_button").show();
	});

});


//add the two buttons in the page, that will let to transist between the page with all selected courses, and the page with the option to hide/unhide courses
function addButtons() {
	
	var buttons = '<div><button style="width:49%;height:50px" id="show_current" disabled><h5>הקורסים שלי</h5></button><button id="show_all" style="width:49%;height:50px" ><h5>כל הקורסים</h5></button></div>';

	//remove the title "My Courses" and add a custom one
	$("#frontpage-course-list").children("h2").hide(); 
	$("#frontpage-course-list").prepend(buttons);	
}

//add the button hide/unhide in all couses, when clicking the button, user will chose if he is going to hide/unhide the button
function addHideUnhideButton()
{
	//add hide/unhide button
	$("#frontpage-course-list").find(".moreinfo").append("<button class='hide_button'>הסתר</button>");
	$("#frontpage-course-list").find(".moreinfo").append("<button class='unhide_button'>הצג</button>");

	//by default hide all the hide/unhide buttons
	$("#frontpage-course-list").find(".unhide_button").hide();
	$("#frontpage-course-list").find(".hide_button").hide();

}


//open the page with all the couses, and show the hide/unhide button
function openAllCourses() {

	//block and unblock the button, so the only button the user can chose is the button to change the page
	$("#frontpage-course-list").find("#show_current").removeAttr("disabled");
	$("#frontpage-course-list").find("#show_all").attr("disabled",true);
	$(".coursebox").show(); //show all courses
	setHideUnhideButton();	//set the hide/unhide button
}

//open the page only with the courses the user chose to show
function openMyCourses() {

	//block and unblock the button, so the only button the user can chose is the button to change the page
	$("#frontpage-course-list").find("#show_all").removeAttr("disabled");
	$("#frontpage-course-list").find("#show_current").attr("disabled",true);
	
	unsetHideUnhideButton(); //remove the hide/unhide button from all buttons

	//remove all the courses the user chose (the options to be hide are save in the local storage)
	for (var i = 0; i < localStorage.length; i++) {
		$("[data-courseid="+localStorage.key(i)+"]").hide();
	}	
}

//For each course , set the hide/unhide button(acording with the saved preferences)
function setHideUnhideButton()
{
	// hide all ["unhide"] buttons 
	$("#frontpage-course-list").find(".hide_button").show();

	//for all course the user chose to hide, hide the ["hide"] button, and unhide the ["unhide button"]
	for (var i = 0; i < localStorage.length; i++) {
		$("[data-courseid="+localStorage.key(i)+"]").find(".hide_button").hide();
		$("[data-courseid="+localStorage.key(i)+"]").find(".unhide_button").show();
	}	
}

//hide the hide/unhide button in every course
function unsetHideUnhideButton()
{
	$("#frontpage-course-list").find(".unhide_button").hide();
	$("#frontpage-course-list").find(".hide_button").hide();	
}

//put the courses menu on top
function setCoursesOnTop()
{
	//get the course's menu, and set him on Top
	$("#frontpage-course-list").prependTo("div[role='main']");

}