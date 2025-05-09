document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href && href !== '#'){
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(33, 37, 41, 0.95)';
        } else {
            navbar.style.background = 'rgba(33, 37, 41, 0.8)';
        }
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Close mobile menu on link click
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function () {
            if (!this.classList.contains('dropdown-toggle') && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
});
function simulateMobileView(){
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=375');
    // console.log('eeeeee');
}
document.getElementById('loginForm').addEventListener('submit', async function (e){
    e.preventDefault();
    e.stopPropagation();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const response = await fetch('/Login', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username: username, password: password })
        }
    );

    const result = await response.json();

    if(result.success){
        window.location.href = '/';
    }
    else{
        const errorDiv = document.getElementById('loginError');
        errorDiv.textContent = result.message;
        errorDiv.classList.remove('d-none');
    }
});