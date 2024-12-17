const sidebar = document.querySelector('#sidebar');
const arrowIcon = document.querySelector('#open-close_sidebar');
const iconsSidebar = document.querySelectorAll('[data-animation_sidebar]');
const textSidebar = document.querySelectorAll('[data-animation_hide]');

const userSidebarNameSpace = document.querySelector('#user_name');
const user = JSON.parse(sessionStorage.getItem('userInfo'));
const userName = user.userName;

userSidebarNameSpace.textContent = userName;

let sidebarOpen = localStorage.getItem('sidebarPreference') ? JSON.parse(localStorage.getItem('sidebarPreference')) : true;

const applySidebarStyle = () => {
    
    if (sidebarOpen) {
        sidebar.classList.add('w-[16%]');
        sidebar.classList.remove('w-[6%]');
        arrowIcon.classList.remove('rotate-180');

        iconsSidebar.forEach(icon => {
            icon.classList.remove('rotate-[360deg]');
        });

        textSidebar.forEach(text => {
            text.classList.remove('hidden');
        });

    } else {
        sidebar.classList.add('w-[6%]');
        sidebar.classList.remove('w-[16%]');
        arrowIcon.classList.add('rotate-180');

        iconsSidebar.forEach(icon => {
            icon.classList.add('rotate-[360deg]')
        });

        textSidebar.forEach(text => {
            text.classList.add('hidden');
        });
    }
};

applySidebarStyle();

arrowIcon.addEventListener('click', () => {
    sidebarOpen = !sidebarOpen;

    applySidebarStyle();
    localStorage.setItem('sidebarPreference', JSON.stringify(sidebarOpen));
});
