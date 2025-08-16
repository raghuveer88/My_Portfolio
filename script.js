/*
 * Lightweight data binding to emulate AngularJS-like interpolation and repeats
 * This script defines a scope object and processes the DOM to replace
 * moustache expressions and repeat templates. It also handles a theme
 * toggle without relying on external libraries.
 */

// Define the data to render on the page
const scope = {
    person: {
        name: 'Raghuveer Draksharam',
        tagline: 'Software Engineer & AI/ML Enthusiast'
    },
    experiences: [
        {
            company: 'ADP, Inc.',
            role: 'Software Engineer',
            location: 'Hyderabad, India',
            period: 'Jul 2022 – Jul 2024',
            achievements: [
                'Designed and implemented a full‑stack application to streamline client onboarding with a dynamic, metadata‑driven UI.',
                'Developed RESTful APIs and integrated an Angular front‑end with Spring Boot backend and MySQL, reducing client onboarding time by 66%.',
                'Automated testing with Selenium and Java to reduce manual testing by 40% and improved CI/CD pipelines.'
            ],
            technologies: ['Angular', 'Spring Boot', 'MySQL', 'Selenium', 'Jenkins', 'Git']
        },
        {
            company: 'Clarivate',
            role: 'Machine Learning Intern',
            location: 'Noida, India',
            period: 'Jan 2022 – Jun 2022',
            achievements: [
                'Developed a machine learning pipeline to automate classification of over 500 patents with 94% accuracy.',
                'Fine‑tuned a BERT‑based model and optimised performance through hyperparameter tuning and cross‑validation.',
                'Reduced manual workload by 8 hours per week per employee by automating patent categorisation.'
            ],
            technologies: ['Python', 'PyTorch', 'Pandas', 'BERT', 'Machine Learning']
        }
    ],
    projects: [
        {
            name: 'Jokes Meet AI',
            date: '2025',
            description: 'Built a clustering and classification pipeline using Sentence‑BERT and HDBSCAN to analyse and categorise over one million jokes into distinct humour types. Leveraged UMAP for dimensionality reduction and fine‑tuned DistilBERT to achieve 83% accuracy.',
            technologies: ['Python', 'TensorFlow', 'Sentence‑BERT', 'HDBSCAN', 'UMAP'],
            award: 'Research Project',
            image: 'assets/project1.png'
        },
        {
            name: 'Student‑Faculty Discussion Forum & Availability Tracker',
            date: '2021',
            description: 'Developed a MERN stack app enabling students to track real‑time faculty availability and host collaborative discussions using WebSocket, reducing student wait times from hours to minutes.',
            technologies: ['React', 'Express', 'Node.js', 'MongoDB', 'WebSocket'],
            award: 'Campus Project',
            image: 'assets/project2.png'
        },
        {
            name: 'Rental Bike Tracking System',
            date: '2021',
            description: 'Created a mobile and web platform for bike rentals with location selection, fare estimation, secure payments and route optimisation. Integrated Google Maps API and built a secure virtual wallet for transactions.',
            technologies: ['React Native', 'Node.js', 'Express', 'MongoDB', 'Google Maps API'],
            award: 'Personal Project',
            image: 'assets/project3.png'
        }
    ],
    skills: [
        {
            category: 'Programming Languages',
            items: ['Python','Java','TypeScript','C','JavaScript','Go','MySQL']
        },
        {
            category: 'Libraries & Frameworks',
            items: ['NumPy','Pandas','Scikit‑Learn','PySpark','PyTorch','TensorFlow','Tailwind','React','Angular','Express','Node.js']
        },
        {
            category: 'Tools & Platforms',
            items: ['Git','Docker','Kubernetes','AWS','Linux','JIRA','PostgreSQL']
        },
        {
            category: 'Data & Analytics',
            items: ['NumPy','Pandas','Matplotlib','Seaborn','Scikit‑Learn','MongoDB','PostgreSQL']
        }
    ],
    achievements: [
        {
            title: 'Orion Space Hackathon 2025',
            result: '3rd Place',
            description: 'Awarded for the Light Pollution Explorer project showcasing real‑world data visualisation.',
            icon: 'fa-trophy'
        },
        {
            title: 'National Level U‑16 Cricket Player',
            result: 'Captain & Club Head',
            description: 'Represented Andhra Pradesh in national tournaments and led the university cricket team to a 75% win rate.',
            icon: 'fa-medal'
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Theme handling
    // Determine the initial theme based on existing data-theme attributes (default to dark).
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    function getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') ||
               document.body.getAttribute('data-theme') ||
               'dark';
    }
    let isDark = getCurrentTheme() === 'dark';
    function applyTheme() {
        const theme = isDark ? 'dark' : 'light';
        // Apply theme attribute to both <html> and <body> so CSS variables update correctly.
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        // Swap the icon based on the current theme.
        const darkIcon = themeIcon.getAttribute('data-dark-icon');
        const lightIcon = themeIcon.getAttribute('data-light-icon');
        themeIcon.className = 'fas ' + (isDark ? darkIcon : lightIcon);
    }
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isDark = !isDark;
            applyTheme();
        });
    }
    // Apply the initial theme on page load.
    applyTheme();

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });
    }

    // Build Experience section with coloured borders and slide-in animations
    const expContainer = document.getElementById('experience-timeline');
    if (expContainer) {
        const colourClasses = ['border-blue', 'border-green', 'border-purple', 'border-orange'];
        scope.experiences.forEach((exp, index) => {
            const colour = colourClasses[index % colourClasses.length];
            const item = document.createElement('div');
            // Apply base class, colour class and slide animation class
            item.className = 'experience-item ' + colour + ' slide-left';
            item.innerHTML =
                '<div class="timeline-dot"></div>' +
                '<div class="experience-card">' +
                    '<h3 class="experience-role">' + exp.role + '</h3>' +
                    '<span class="experience-company">' + exp.company + '</span>' +
                    '<span class="experience-period">' + exp.period + '</span>' +
                    '<p class="experience-location">' + exp.location + '</p>' +
                    '<ul>' + exp.achievements.map(a => '<li>' + a + '</li>').join('') + '</ul>' +
                    '<div class="tech-tags">' + exp.technologies.map(t => '<span class="tech-tag">' + t + '</span>').join('') + '</div>' +
                '</div>';
            expContainer.appendChild(item);
        });
    }

    // Build Projects section with images and award/date meta row
    const projContainer = document.getElementById('projects-grid');
    if (projContainer) {
        scope.projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            const awardSpan = project.award ? '<span class="project-award">' + project.award + '</span>' : '';
            // Construct meta row containing date and award
            const metaRow = '<div class="project-meta">' +
                '<span class="project-date">' + project.date + '</span>' +
                awardSpan +
            '</div>';
            card.innerHTML =
                '<img class="project-image" src="' + project.image + '" alt="' + project.name + ' image">' +
                '<div class="project-content">' +
                    metaRow +
                    '<h3>' + project.name + '</h3>' +
                    '<p>' + project.description + '</p>' +
                    '<div class="tech-tags">' + project.technologies.map(t => '<span class="tech-tag">' + t + '</span>').join('') + '</div>' +
                '</div>';
            projContainer.appendChild(card);
        });
    }

    // Build Skills section with colour-coded categories
    const skillsContainer = document.getElementById('skills-grid');
    if (skillsContainer) {
        const categoryClasses = ['cat-blue', 'cat-teal', 'cat-purple', 'cat-orange'];
        scope.skills.forEach((cat, index) => {
            const colour = categoryClasses[index % categoryClasses.length];
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category ' + colour;
            categoryDiv.innerHTML =
                '<h3>' + cat.category + '</h3>' +
                '<div class="skill-tags">' + cat.items.map(item => '<span class="skill-tag">' + item + '</span>').join('') + '</div>';
            skillsContainer.appendChild(categoryDiv);
        });
    }

    // Build Achievements section
    const achContainer = document.getElementById('achievements-grid');
    if (achContainer) {
        scope.achievements.forEach(a => {
            const card = document.createElement('div');
            card.className = 'achievement-card';
            card.innerHTML =
                '<div class="achievement-icon"><i class="fas ' + a.icon + '"></i></div>' +
                '<h3>' + a.title + '</h3>' +
                '<span class="achievement-result">' + a.result + '</span>' +
                '<p>' + a.description + '</p>';
            achContainer.appendChild(card);
        });
    }

    // Update footer with current year and name
    const footerText = document.getElementById('footer-text');
    if (footerText) {
        const year = new Date().getFullYear();
        footerText.innerHTML = `© ${year} ${scope.person.name}. All rights reserved.`;
    }

    // Slide-in animations for elements tagged with slide-left or slide-right
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                slideObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.slide-left, .slide-right').forEach(el => {
        slideObserver.observe(el);
    });

    // Navigation highlighting based on scroll position
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('section');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    link.classList.toggle('active-nav', href === '#' + id);
                });
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(section => navObserver.observe(section));

    // Animate sections on scroll using Intersection Observer
    const observerOptions = {
        threshold: 0.1
    };
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Stop observing once element is visible to avoid repeated triggers
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    // Observe all sections marked with the fade-in-section class
    document.querySelectorAll('.fade-in-section').forEach(section => {
        fadeObserver.observe(section);
    });
});

// Interpolation helpers removed since sections are built directly via JavaScript