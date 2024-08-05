document.addEventListener("DOMContentLoaded", () => {
    const numDrops = 100;
    const container = document.querySelector('.container');
    const lightning = document.getElementById('lightning');

    function createDrop() {
        const drop = document.createElement("div");
        drop.className = "drop";
        container.appendChild(drop);

        drop.style.left = `${Math.random() * container.offsetWidth}px`;
        // Posición vertical inicial fuera del borde superior
        drop.style.top = `${-10}px`;

        const duration = Math.random() * 2 + 1; // Entre 1 y 3 segundos
        drop.style.animationDuration = `${duration}s`;

        // Reposicionar el elemento después de que complete la animación
        drop.addEventListener('animationiteration', () => {
            drop.style.left = `${Math.random() * container.offsetWidth}px`;
            drop.style.top = `${-10}px`;
            drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
        });
    }

    // Crear gotas de lluvia
    for (let i = 0; i < numDrops; i++) {
        createDrop();
    }

    function createLightning() {
        lightning.style.opacity = 1;
        setTimeout(() => {
            lightning.style.opacity = 0;
        }, 200); // Duración del rayo

        // Reposicionar el rayo aleatoriamente en el contenedor
        lightning.style.left = `${Math.random() * container.offsetWidth}px`;
    }

    // Mostrar un rayo cada 5 a 10 segundos
    setInterval(() => {
        createLightning();
    }, Math.random() * 5000 + 5000); // Entre 5 y 10 segundos
});
