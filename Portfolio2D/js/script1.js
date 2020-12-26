
/* Make the menu out for mobile version */ 
var m_menu = document.getElementById("menu");
var m_up = document.getElementById("up-icon");
var m_down = document.getElementById("down-icon");
var m_contact = document.getElementById("contact-icon");
var widthOutput = document.querySelector('#width');
var mobileWidth = 1000;

var div_progress = document.getElementById("progress");
var div_games = document.getElementById("games");
var div_image = document.getElementById("image");
var div_transmission = document.getElementById("transmission");
var div_electronic = document.getElementById("electronic");
var div_internship = document.getElementById("internship");
var div_website = document.getElementById("website");
var div_others = document.getElementById("others");

var icon_open_progress = document.getElementById("open-icon-progress");
var icon_open_games = document.getElementById("open-icon-games");
var icon_open_image = document.getElementById("open-icon-image");
var icon_open_transmission = document.getElementById("open-icon-transmission");
var icon_open_electronic = document.getElementById("open-icon-electronic");
var icon_open_internship = document.getElementById("open-icon-internship");
var icon_open_website = document.getElementById("open-icon-website");
var icon_open_others = document.getElementById("open-icon-others");

var icon_close_progress = document.getElementById("close-icon-progress");
var icon_close_games = document.getElementById("close-icon-games");
var icon_close_image = document.getElementById("close-icon-image");
var icon_close_transmission = document.getElementById("close-icon-transmission");
var icon_close_electronic = document.getElementById("close-icon-electronic");
var icon_close_internship = document.getElementById("close-icon-internship");
var icon_close_website = document.getElementById("close-icon-website");
var icon_close_others = document.getElementById("close-icon-others");



var projects = [div_progress, div_games, div_image, div_transmission, div_electronic, div_internship, div_website, div_others];
var open_icons_project = [icon_open_progress, icon_open_games, icon_open_image, icon_open_transmission, icon_open_electronic, icon_open_internship, icon_open_website, icon_open_others]
var close_icons_project = [icon_close_progress, icon_close_games, icon_close_image, icon_close_transmission, icon_close_electronic, icon_close_internship, icon_close_website, icon_close_others]

function open_project(num_div){
  if (projects[num_div].style.display == "none"){
    projects[num_div].style.display = "block";
    open_icons_project[num_div].style.display = "none";
    close_icons_project[num_div].style.display = "block";
  } else {
    projects[num_div].style.display = "none";
    open_icons_project[num_div].style.display = "block";
    close_icons_project[num_div].style.display = "none";
  }
}

function myFunction() {
  if (m_menu.style.display === "block") {
    m_menu.style.display = "none";
    m_up.style.display = "none";
    m_down.style.display = "block";
    m_contact.style.display = "block";
  } else {
    m_menu.style.display = "block";
    m_up.style.display = "block";
    m_down.style.display = "none";
    m_contact.style.display = "none";
  }
}

function resize() { 
  if(window.innerWidth > mobileWidth) {
    m_menu.style.display = "block";

  }else{
    m_menu.style.display = "none";
  }
}

window.onresize = resize;


