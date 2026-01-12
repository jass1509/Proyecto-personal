
  function toggleMenu(){
    document.getElementById('sideMenu').classList.toggle('open');
  }
  const links = document.querySelectorAll("nav a");
  const actual = location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === actual) {
      link.classList.add("active");
    }
  });

  // Contador de visitas
  let visitas = localStorage.getItem("visitas") || 0;
visitas++;
localStorage.setItem("visitas", visitas);
document.getElementById("contador").textContent = visitas;

// Cambiar tema
function cambiarTema(){
  document.body.classList.toggle("dark");
  localStorage.setItem("tema",
    document.body.classList.contains("dark") ? "dark" : "light");
}

if(localStorage.getItem("tema") === "dark"){
  document.body.classList.add("dark");
}


// para el funcionamiento de los comentarios y la base de datos
const commentForm = document.getElementById('commentForm');

commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
        nombre: document.getElementById('nombreInput').value,
        mensaje: document.getElementById('mensajeInput').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/comentarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            alert("¡Comentario guardado en la base de datos!");
            commentForm.reset();
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
    }
});