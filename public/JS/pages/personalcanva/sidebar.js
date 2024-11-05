const sidebar = document.querySelector('#sidebar');
const arrowIcon = document.querySelector('#open-close_sidebar');
let sidebarOpen = true;


arrowIcon.addEventListener('click', () => {
    sidebarOpen = !sidebarOpen;
    
    if (sidebarOpen) {
        sidebar.classList.add('w-[16%]');
        sidebar.classList.remove('w-[8%]');
        arrowIcon.classList.remove('rotate-180');

    } else {
        sidebar.classList.add('w-[8%]');
        sidebar.classList.remove('w-[16%]');
        arrowIcon.classList.add('rotate-180');
    }

});


