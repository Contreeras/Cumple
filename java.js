document.addEventListener("DOMContentLoaded", () => {
    const storyText = document.getElementById("story-text");
    const optionsContainer = document.getElementById("options");
    const feedback = document.getElementById("feedback");
    const levelInfo = document.getElementById("level-info");
    const character = document.getElementById("character");
    const backgroundMusic = document.getElementById("background-music");

    const correctSound = document.getElementById("correct-sound");
    const wrongSound = document.getElementById("wrong-sound");
    const winSound = document.getElementById("win-sound");

    let currentStep = 0;

    const gameSteps = [
        {
            text: "¡Hola! Soy un mensaje misterioso. ¿Cuál es mi color favorito?",
            options: ["Rojo", "Azul", "Verde", "Negro"],
            correct: "Negro"
        },
        {
            text: "¡Bien! Ahora dime, ¿cómo se llama mi último apellido?",
            options: ["Rivas", "Flores", "Rosales", "Contreras"],
            correct: "Rosales"
        },
        {
            text: "¿Hace cuánto nos conocimos?",
            options: ["Ayer", "7 años", "3 años", "6 años"],
            correct: "6 años"
        },
        {
            text: "¿Cuánto te quiero?",
            options: ["Nada, te odio", "Inefable", "Mucho", "Poco"],
            correct: "Inefable"
        },
        {
            text: "Ey! ¿Cómo me gusta que me llamen?",
            options: ["Enano", "Chepe", "Armando", "Contetas"],
            correct: "Armando"
        },
        {
            text: "¿La estás pasando bien?",
            options: ["Obvio, deja de pendejo", "No, me quiero ir"],
            correct: "Obvio, deja de pendejo"
        },
        {
            text: "¿Soy más de perros o gatos?",
            options: ["Gatooos", "Perros"],
            correct: "Perros"
        },
        {
            text: "¿Cuándo cumplo años?",
            options: ["13/10", "11/10", "9/09", "13/11"],
            correct: "13/10"
        },
        {
            text: "¿Qué es lo que me gusta de vos?",
            options: ["Todas las anteriores", "Forma de ser", "Cara", "La voz"],
            correct: "Todas las anteriores"
        },
        {
            text: "Última pregunta: ¿Qué me hace más feliz?",
            options: ["Comida", "Amigos", "Dormir", "Todas las anteriores"],
            correct: "Todas las anteriores"
        },
        {
            text: "🎉 ¡Felicidades! Has completado el Escape Room. 🎁 Elige tu premio:",
            options: ["Un abrazo", "Chocolates"],
            correct: null // Última parte del juego, solo se elige el premio
        }
    ];

    // Inicia música de fondo
    backgroundMusic.play();

    function showStep() {
        let step = gameSteps[currentStep];
        storyText.innerText = step.text;
        levelInfo.innerText = `Nivel ${currentStep + 1}`;
        
        if (currentStep < gameSteps.length - 1) {
            optionsContainer.innerHTML = step.options
                .map(opt => `<button class="option-btn" onclick="selectOption('${opt}')">${opt}</button>`)
                .join(" ");
        } else {
            // Última etapa: elegir el premio
            optionsContainer.innerHTML = `
                <button class="option-btn" onclick="choosePrize('abrazo')">Un abrazo</button>
                <button class="option-btn" onclick="choosePrize('chocolates')">Chocolates</button>
            `;
        }
    }

    window.selectOption = function (choice) {
        let step = gameSteps[currentStep];
        
        // Si la respuesta es correcta
        if (step.correct && choice.toLowerCase() === step.correct.toLowerCase()) {
            feedback.innerText = "✅ ¡Correcto!";
            feedback.style.color = "black";
            correctSound.play();

            document.body.style.background = "linear-gradient(45deg, #00ff00, #ffcc00)";
            character.style.animation = "bounce 0.5s";

            setTimeout(() => {
                document.body.style.background = "";
                currentStep++;
                if (currentStep < gameSteps.length) {
                    showStep();
                } else {
                    winSound.play();
                    storyText.innerText = "🎉 ¡Ganaste! Felicitaciones 🎁";
                    // No se llama a showStep() aquí
                    optionsContainer.innerHTML = `
                        <button class="option-btn" onclick="choosePrize('abrazo')">Un abrazo</button>
                        <button class="option-btn" onclick="choosePrize('chocolates')">Chocolates</button>
                    `;
                }
            }, 1000);
        } else {
            feedback.innerText = "❌ Respuesta incorrecta, intenta de nuevo.";
            feedback.style.color = "red";
            document.body.classList.add("shake");
            wrongSound.play();

            setTimeout(() => {
                document.body.classList.remove("shake");
            }, 500);
        }
    };

    window.choosePrize = function (prize) {
        let prizeMessage = "";

        if (prize === "Un abrazo") {
            prizeMessage = "🤗 A ver, ponete de pie";
        } else if (prize === "Chocolates") {
            prizeMessage = "🍫 ¡Disfruta de tus chocolates! Son dulces, pero no más que vos.";
        }

        // Asegurarse de que el feedback se muestre correctamente
        feedback.style.display = "block";
        feedback.style.color = "black";
        feedback.style.fontSize = "20px"; // Asegurar que se vea grande y claro
        feedback.style.textAlign = "center"; // Centrar el mensaje

        // Mostrar el mensaje final
        feedback.innerHTML = `${prizeMessage}<br><br>🎉 ¡Gracias por jugar! Espero que te haya gustado esta aventura. 🏆✨`;

        // Ocultar los botones después de elegir el premio
        optionsContainer.innerHTML = "";
        storyText.innerText = ""; // Borrar texto anterior
    };

    showStep();
});
