
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {  // Quando o usuário rolar mais de 50px
        navbar.classList.add('bg-white', 'bg-opacity-80', 'shadow-md');  // Fundo branco com opacidade
    } else {
        navbar.classList.remove('bg-white', 'bg-opacity-80', 'shadow-md');  // Remove fundo e sombra
    }
});
