"use strict"


window.onload = function () {
    const parallax = document.querySelector('.parallax');

    if (parallax) {
        const fon = document.querySelector('.images-parallax__fon');
        const two = document.querySelector('.images-parallax__two');
        const one = document.querySelector('.images-parallax__one');

        const forFon = 0;
        const forTwo = 60;
        const forOne = 10;

        const speed = 0.3;

        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            fon.style.cssText = `transform: translate(${positionX / forFon}%,${positionY / forFon}%);`;
            two.style.cssText = `transform: translate(${positionX / forTwo}%,${positionY / forTwo}%);`;
            one.style.cssText = `transform: translate(${positionX / forOne}%,${positionY / forOne}%);`;

            requestAnimationFrame(setMouseParallaxStyle);

        }
        setMouseParallaxStyle();

        parallax.addEventListener("mousemove", function (e) {
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        });


       let thresholdSets = [];
       for (let i = 0; i<= 1.0; i += 0.000005) {
           thresholdSets.push(i);
       }
       const callback = function (entries, observer) {
           const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
           setParallaxItemsStyle(scrollTopProcent);
       };
       const observer = new IntersectionObserver(callback, {
           threshold: thresholdSets
       });

       observer.observe(document.querySelector('#osnovnoe'));

       function setParallaxItemsStyle(scrollTopProcent) {
        fon.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 5}%);`;
           two.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 1.8}%);`;
           one.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 1.7}%);`;

       }
    }
}
