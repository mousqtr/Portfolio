var m_description_1 = document.getElementById("description-1")
var m_description_2 = document.getElementById("description-2")
var m_button2d = document.getElementById("button2D")
var m_button3d = document.getElementById("button3D")
var m_container = document.getElementById("container")

m_button2d.addEventListener("mouseover", button2dOver);
m_button3d.addEventListener("mouseover", button3dOver);
m_button2d.addEventListener("mouseout", button2Out);
m_button3d.addEventListener("mouseout", button3Out);

function button2dOver() {
    m_description_1.style.display = "block";
}

function button3dOver() {
    m_description_2.style.display = "block";
}

function button2Out() {
    m_description_1.style.display = "none";
}

function button3Out() {
    m_description_2.style.display = "none";
}