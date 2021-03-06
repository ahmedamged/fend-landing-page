/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

let navMenu = document.querySelector('#navbar__list');
let navBar = document.querySelector('.navbar__menu');
let pageSections = document.querySelectorAll('section');
let docFragment = document.createDocumentFragment();
let topBtn = document.querySelector('.top__btn');
let hamBtn = document.querySelector('.hamburger__btn');
let sectionHeadings = document.querySelectorAll('.landing__container h2');
let sectionContent = document.querySelectorAll('.section__content');
let arrowIcons = document.querySelectorAll('.arrow__icons');
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// Hide 'go to top' button when window has been scrolled to top

function checkTopBtnDispaly() {
  if(window.scrollY >= 0 && window.scrollY < 250){
    topBtn.style.visibility = 'hidden';
    topBtn.style.opacity = '0';
  } else {
    topBtn.style.visibility = 'visible';
    topBtn.style.opacity = '1';
  }
}

function collapseSections(index) {
  if(pageSections[index].style.height != '0px') {
      pageSections[index].style.height = '0px';
      pageSections[index].style.minHeight = '50vh';
      sectionContent[index].style.opacity = '0';
      arrowIcons[index].innerHTML = `<svg width="50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 48 48" style="margin-top: 40px;enable-background:new 0 0 48 48;" xml:space="preserve">
        <style type="text/css">
          .st0{fill:#FFFFFF;}
          .st1{fill:none;}
        </style>
        <path class="st0" d="M14.8,30.8l9.2-9.2l9.2,9.2L36,28L24,16L12,28L14.8,30.8z"/>
        <path class="st1" d="M0,0h48v48H0V0z"/>
      </svg>`;
  } else {
      pageSections[index].style.height = 'max-content';
      pageSections[index].style.minHeight = '80vh';
      sectionContent[index].style.opacity = '1';
      arrowIcons[index].innerHTML = `<svg width="50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="margin-top: 40px;enable-background:new 0 0 512 512;" xml:space="preserve" width="50">
        <style type="text/css">
          .st0{clip-path:url(#SVGID_2_);fill:#FFFFFF;}
        </style>
        <g>
          <defs>
            <rect id="SVGID_1_" width="512" height="512"></rect>
          </defs>
          <clipPath id="SVGID_2_">
            <use xlink:href="#SVGID_1_" style="overflow:visible;"></use>
          </clipPath>
          <polygon class="st0" points="158.2,175.1 256,273 353.8,175.1 384,205.3 256,333.3 128,205.3"></polygon>
        </g>
      </svg>`;
  }
}

/**
 * End Helper Functions
 * Begin with building the nav
 *
*/

// build the nav

for (let i = 0; i < pageSections.length; i++) {
  let navItem = document.createElement('li');
  let navLink = document.createElement('a');
  navLink.classList.add('menu__link');
  navLink.innerHTML = pageSections[i].getAttribute('data-nav');

  // Scroll to section on link click
  navLink.addEventListener('click', () => {
    for (let x = 0; x < pageSections.length; x++) {
      if(navLink.innerHTML === pageSections[x].getAttribute('data-nav')){
        pageSections.forEach( (section) => {
          section.classList.remove('your-active-class');
        });
        pageSections[x].scrollIntoView({behavior: 'smooth'});
        pageSections[x].classList.add('your-active-class');
      }
    }
  });
  // Append nav link to nav item
  navItem.appendChild(navLink);
  docFragment.appendChild(navItem);
}

// Append the fragement to nav menu
navMenu.appendChild(docFragment);

// Call checkTopBtnDispaly to hide 'go to top' button
checkTopBtnDispaly();

// Add class 'active' to section when near top of viewport

window.addEventListener('scroll', () => {
  checkTopBtnDispaly();
  let navLinks = document.querySelectorAll('.menu__link');
  pageSections.forEach( (section,i) => {
    let secHeight = section.offsetHeight - 150;
    let secNearTop = section.getBoundingClientRect().top;
    if(secNearTop > -150 && secNearTop < secHeight){
      for (let x = 0; x < pageSections.length; x++) {
        pageSections[x].classList.remove('your-active-class');
        navLinks[x].classList.remove('active__link');
      };
      section.classList.add('your-active-class');
      navLinks[i].classList.add('active__link');
    }
  });

  navBar.style.display = 'flex';
  // Hide navigation bar when the user is no longer scrolling

  // Clear timeout throughout the scroll
  this.clearTimeout( isScrolling );

  // Set a timeout to run after scrolling ends
  isScrolling = setTimeout(() => {
    navBar.style.display = 'none';
  }, 2000);

});

// Show nav menu when window is resized

window.addEventListener('resize', () => {
    if(window.innerWidth > 768 && navMenu.style.display === 'none'){
      navMenu.style.display = 'flex';
    } else if(window.innerWidth <= 768 && hamBtn.classList.contains('menu__closed')){
      navMenu.style.display = 'none';
    }
});

// Scroll to the top of the page

topBtn.addEventListener('click', () => {
  this.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});

// Open nav menu and close it with hamburger button

hamBtn.addEventListener('click', () => {
  if(hamBtn.classList.contains('menu__closed')){
    // Change hamburger button's icon
    hamBtn.innerHTML = `<svg width="50" height="60" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg>`;
    hamBtn.classList.add('menu__open');
    hamBtn.classList.remove('menu__closed');
    navMenu.style.display = 'flex';
  }
  else if (hamBtn.classList.contains('menu__open')){
    // Change hamburger button's icon
    hamBtn.innerHTML = `<svg width="50" height="60" enable-background="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M26,16c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C25.104,14,26,14.896,26,16z" id="XMLID_314_"/><path d="M26,8c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C25.104,6,26,6.896,26,8z" id="XMLID_315_"/><path d="M26,24c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C25.104,22,26,22.896,26,24z"></svg>`;
    hamBtn.classList.add('menu__closed');
    hamBtn.classList.remove('menu__open');
    navMenu.style.display = 'none';
  }
});

// Collapse sections

for (let i = 0; i < sectionHeadings.length; i++) {
  sectionHeadings[i].addEventListener('click', () => {
    collapseSections(i);
  });
  arrowIcons[i].addEventListener('click', () => {
    collapseSections(i);
  });
}
