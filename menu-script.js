document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Get height of the sticky nav to offset the scroll properly
                const navHeight = document.getElementById('category-nav').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight - 20, // 20px extra padding
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add a very subtle slide-in hover effect to the menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
            item.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
});