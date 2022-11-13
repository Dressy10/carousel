const track = document.querySelector('.carousel_track')
const slides = Array.from(track.children)
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const nav = document.querySelector('.carousel_nav');
const dots = Array.from(nav.children)

// setting the size
// const slideSize = slides[0].getBoundingClientRect();
// // setting the width

// const slideWidth = slideSize.width;
// console.log(slideWidth);

// to make the above a little bit more simpler
const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);

// arrange the slides beside each other
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left; + ')'; // the dot before the current style below was removed because we are accessing a class list.
    currentSlide.classList.remove('current-slide');  // when you are using a class list, do not make use of a dot, but do when making use of a query selector.
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowButtons = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden')
        nextButton.classList.remove('is-hidden')
    }
}

// when i click to the left, move to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = nav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide)

    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, prevDot);
    hideShowButtons(slides, prevButton, nextButton, prevIndex)

});

// when i click on the right, move to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = nav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide)

        moveToSlide(track, currentSlide, nextSlide)
        updateDots(currentDot, nextDot);
        hideShowButtons(slides, prevButton, nextButton, nextIndex)
    // the below is being done later on at the top to avoid rewriting the whole code for the previous slide. so we make it into a function.
    
    // const amountToMove = nextSlide.style.left;
    // // move to the next slide
    // track.style.transform = 'translateX(-' + amountToMove + ')'; // the dot before the current style below was removed because we are accessing a class list.
    // currentSlide.classList.remove('current-slide');  // when you are using a class list, do not make use of a dot, but do when making use of a query selector.
    // nextSlide.classList.add('current-slide');
});

// when i click on the indicator, navigate to that slide.
nav.addEventListener('click', e => {
    // what indicator i clicked on (added target to make sure the nav body does not click along with the button)
    const targetDot = e.target.closest('button');

    // console.log(targetDot); wnat to indicate them one after the other
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = nav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowButtons(slides, prevButton, nextButton, targetIndex)
    // currentDot.classList.remove('current-slide');
    // targetDot.classList.add('current-slide');
});
