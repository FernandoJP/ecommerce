function toggleNav(){
    var navBar = document.querySelector('nav ul');
    var openMenuBtn = document.querySelector('.mobile-menu-btn i:nth-child(1)');
    var closeMenuBtn = document.querySelector('.mobile-menu-btn i:nth-child(2)');
    openMenuBtn.classList.toggle('hidden');
    closeMenuBtn.classList.toggle('hidden');
    navBar.classList.toggle("visible");
}