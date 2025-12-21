
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
