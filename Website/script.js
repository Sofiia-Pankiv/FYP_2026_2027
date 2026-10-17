
const hero = document.getElementById("hero");
const gradientBg = document.getElementById("gradientBg");
const blobs = document.querySelectorAll(".gradient-blob");

const button = document.getElementById("startButton");
const message = document.getElementById("message");

let mouseX = -10000;
let mouseY = -10000;
let isHovering = false;

const colours = [];

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

//gradient
blobs.forEach(function(blob) {
    const colour = {
        element: blob,

        x: randomBetween(0, gradientBg.clientWidth),
        y: randomBetween(0, gradientBg.clientHeight),

        targetX: 0,
        targetY: 0,

        speed: randomBetween(0.001, 0.004),

        pushX: 0,
        pushY: 0
    };

    colour.targetX = randomBetween(
        -100,
        gradientBg.clientWidth + 100
    );

    colour.targetY = randomBetween(
        -100,
        gradientBg.clientHeight + 100
    );

    colours.push(colour);
});

hero.addEventListener("pointermove", function(event) {
    const rect = gradientBg.getBoundingClientRect();

    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    isHovering = true;
});

hero.addEventListener("pointerleave", function() {
    isHovering = false;
});

function chooseNewDestination(colour) {
    colour.targetX = randomBetween(
        -100,
        gradientBg.clientWidth + 100
    );

    colour.targetY = randomBetween(
        -100,
        gradientBg.clientHeight + 100
    );

    colour.speed = randomBetween(0.002, 0.006);
}

function animateGradient() {
    const width = gradientBg.clientWidth;
    const height = gradientBg.clientHeight;

    colours.forEach(function(colour) {
      
        const dx = colour.targetX - colour.x;
        const dy = colour.targetY - colour.y;

        colour.x += dx * colour.speed;
        colour.y += dy * colour.speed;

        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
            chooseNewDestination(colour);
        }

        let x = colour.x;
        let y = colour.y;

        if (isHovering) {
            const mouseDX = x - mouseX;
            const mouseDY = y - mouseY;

            const distance = Math.sqrt(
                mouseDX * mouseDX + mouseDY * mouseDY
            );

            const radius = 350;

            if (distance < radius && distance > 0) {
                const force = Math.pow(
                    1 - distance / radius, 2
                ) * 220;

                colour.pushX +=
                    (mouseDX / distance) * force * 0.08;

                colour.pushY +=
                    (mouseDY / distance) * force * 0.08;
            }
        }

        colour.pushX *= 0.94;
        colour.pushY *= 0.94;

        x += colour.pushX;
        y += colour.pushY;

        colour.element.style.left = x + "px";
        colour.element.style.top = y + "px";
    });

    requestAnimationFrame(animateGradient);
}

requestAnimationFrame(animateGradient);

button.addEventListener("click", function() {
    message.textContent =
        "No Figma Link Connected to Download";
});
