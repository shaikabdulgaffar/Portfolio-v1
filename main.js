// Role typing animation - centered, with modern "slide & fade" animation

class RoleAnimator {
    constructor() {
        this.roles = [
            "I'm a Web Developer",
            "I'm a Python Developer",
            "I'm a Tech Enthusiast"
        ];
        this.currentIndex = 0;
        this.roleElement = document.getElementById('role');
        this.delayBetweenRoles = 1600;
        this.slideDuration = 480;
        this.init();
    }

    init() {
        this.showRole(this.roles[this.currentIndex]);
    }

    showRole(text) {
        // Set the text and apply slide-in
        this.roleElement.textContent = text;
        this.roleElement.classList.remove('slide-out');
        this.roleElement.classList.add('slide-in');
        this.roleElement.style.opacity = '1';
        this.roleElement.style.transform = 'translateY(0) scale(1.04)';

        setTimeout(() => {
            // Prepare for slide-out
            this.roleElement.classList.remove('slide-in');
            this.roleElement.classList.add('slide-out');
            this.roleElement.style.opacity = '0';
            this.roleElement.style.transform = 'translateY(30px) scale(0.96)';
            setTimeout(() => {
                // After slide-out, update role and slide-in again
                this.currentIndex = (this.currentIndex + 1) % this.roles.length;
                this.roleElement.classList.remove('slide-out');
                this.showRole(this.roles[this.currentIndex]);
            }, this.slideDuration);
        }, this.delayBetweenRoles);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Role typing
    new RoleAnimator();

    // Nav hamburger toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('open');
    });

    // Close nav on link click (mobile)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function () {
            if(window.innerWidth <= 768 && navMenu.classList.contains('open')){
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
            }
        });
    });

    // Close nav when clicking outside (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            navMenu.classList.contains('open') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('open');
            navToggle.classList.remove('open');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollY = window.scrollY;
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 90;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Also highlight on page load based on current hash
    window.addEventListener('load', function() {
        const hash = window.location.hash;
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (hash && link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
        if (!hash) {
            document.querySelector('.nav-menu a[href="#home"]').classList.add('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            navToggle.classList.remove('open');
        }
    });
});

// Splash screen fade out after 3 seconds
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var splash = document.getElementById('custom-splash');
        if(splash) {
            splash.style.animation = "fadeOut 1s forwards";
            setTimeout(function() {
                splash.style.display = "none";
            }, 1000);
        }
    }, 3000);
});
