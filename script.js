const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");

let sistemaActivo = false;
let files = JSON.parse(localStorage.getItem("misArchivos")) || [];

// ACTIVAR SISTEMA
function sorpresa(){
    if(!sistemaActivo){
        sistemaActivo = true;
        alert("🔥 Sistema Activado Correctamente 🔥");
    } else {
        alert("✅ El sistema ya está activo");
    }
}

// Cargar archivos guardados al iniciar
window.onload = () => {
    renderFiles();
};

// Cuando seleccionas archivos
fileInput.addEventListener("change", (event) => {

    if(!sistemaActivo){
        alert("⚠️ Primero debes activar el sistema");
        return;
    }

    const selectedFiles = Array.from(event.target.files);

    selectedFiles.forEach(file => {

        // Verificar si ya existe
        if(files.includes(file.name)){
            alert("❌ El archivo '" + file.name + "' ya está subido");
        } else {
            files.push(file.name);
        }

    });

    localStorage.setItem("misArchivos", JSON.stringify(files));
    renderFiles();
});

// Mostrar archivos
function renderFiles(){
    fileList.innerHTML = "";

    files.forEach((file, index) => {

        const div = document.createElement("div");
        div.classList.add("file-item");

        div.innerHTML = `
            <span>📁 ${file}</span>
            <button class="delete-btn" onclick="deleteFile(${index})">
                Eliminar
            </button>
        `;

        fileList.appendChild(div);
    });
}

// Eliminar archivo
function deleteFile(index){
    files.splice(index, 1);
    localStorage.setItem("misArchivos", JSON.stringify(files));
    renderFiles();
}
// Detectar sección activa
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if(pageYOffset >= sectionTop - 200){
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.style.color = "white";
        if(link.getAttribute("href") === "#" + current){
            link.style.color = "#00f7ff";
        }
    });
    
    if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado"));
}
});