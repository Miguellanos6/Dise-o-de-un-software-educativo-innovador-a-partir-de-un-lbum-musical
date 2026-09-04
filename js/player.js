// =====================================================
// PLAYER PRINCIPAL DE METROID
// =====================================================

const player = document.getElementById("mediaPlayer");

let reproduciendo = false;

// =====================================================
// BOTONES
// =====================================================

const playPauseBtn = document.getElementById("playPauseBtn");
const stopBtn = document.getElementById("stopBtn");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

// =====================================================
// DESACTIVAR CONTROLES NATIVOS DE CHROMIUM
// =====================================================

if (player) {
    player.controls = false;
}


// =====================================================
// REPRODUCIR
// =====================================================

export function reproducir(ruta) {

    const video = document.getElementById("mediaPlayer");
    const pdf = document.getElementById("pdfViewer");
    const img = document.getElementById("artworkViewer");
    const mask = document.getElementById("pdfMask");


    // -------------------------------------------------
    // Ocultar PDF
    // -------------------------------------------------

    if (pdf) {
        pdf.style.display = "none";
        pdf.src = "";
    }


    // -------------------------------------------------
    // Ocultar Artwork
    // -------------------------------------------------

    if (img) {
        img.style.display = "none";
    }


    // -------------------------------------------------
    // Ocultar máscara PDF
    // -------------------------------------------------

    if (mask) {
        mask.style.display = "none";
    }


    // -------------------------------------------------
    // Mostrar video
    // -------------------------------------------------

    if (video) {
        video.style.display = "block";

        // Importante:
        // Chromium NO mostrará sus controles.
        video.controls = false;
    }


    // -------------------------------------------------
    // Detener reproducción anterior
    // -------------------------------------------------

    player.pause();

    player.currentTime = 0;


    // -------------------------------------------------
    // Reiniciar barra
    // -------------------------------------------------

    if (progressBar) {
        progressBar.value = 0;
        progressBar.max = 100;
    }

    if (currentTime) {
        currentTime.textContent = "0:00";
    }

    if (totalTime) {
        totalTime.textContent = "0:00";
    }


    // -------------------------------------------------
    // Cargar nuevo archivo
    // -------------------------------------------------

    player.src = encodeURI(ruta);

    player.load();


    // -------------------------------------------------
    // Reproducir
    // -------------------------------------------------

    player.play()
        .then(() => {

            reproduciendo = true;

            actualizarBoton();

        })
        .catch(error => {

            console.warn(
                "No se pudo iniciar automáticamente:",
                error
            );

            reproduciendo = false;

            actualizarBoton();

        });

}


// =====================================================
// PLAY / PAUSE
// =====================================================

export function playPause() {

    if (!player.src) {
        return;
    }


    if (reproduciendo) {

        player.pause();

        reproduciendo = false;

    }

    else {

        player.play()
            .then(() => {

                reproduciendo = true;

                actualizarBoton();

            })
            .catch(error => {

                console.warn(
                    "No se pudo reproducir:",
                    error
                );

            });

        return;
    }


    actualizarBoton();

}


// =====================================================
// DETENER
// =====================================================

export function detener() {

    if (!player) {
        return;
    }


    player.pause();

    player.currentTime = 0;


    reproduciendo = false;


    // Reiniciar barra

    if (progressBar) {
        progressBar.value = 0;
    }

    if (currentTime) {
        currentTime.textContent = "0:00";
    }


    actualizarBoton();

}


// =====================================================
// ACTUALIZAR BOTÓN PLAY / PAUSE
// =====================================================

function actualizarBoton() {

    if (!playPauseBtn) {
        return;
    }


    playPauseBtn.textContent =
        reproduciendo ? "⏸" : "▶";

}


// =====================================================
// METADATA DEL VIDEO
// =====================================================

player.addEventListener("loadedmetadata", () => {

    if (!isFinite(player.duration)) {
        return;
    }


    // Duración real

    progressBar.max =
        Math.floor(player.duration);


    progressBar.value = 0;


    // Tiempo total

    totalTime.textContent =
        formato(player.duration);


    // Tiempo actual

    currentTime.textContent =
        "0:00";

});


// =====================================================
// ACTUALIZAR PROGRESO
// =====================================================

player.addEventListener("timeupdate", () => {

    if (!isFinite(player.duration)) {
        return;
    }


    // Actualizar barra

    progressBar.value =
        Math.floor(player.currentTime);


    // Actualizar tiempo

    currentTime.textContent =
        formato(player.currentTime);

});


// =====================================================
// CAMBIAR POSICIÓN CON LA BARRA
// =====================================================

progressBar.addEventListener("input", () => {

    if (!isFinite(player.duration)) {
        return;
    }


    player.currentTime =
        Number(progressBar.value);

});


// =====================================================
// CUANDO TERMINA LA CANCIÓN
// =====================================================

player.addEventListener("ended", () => {

    reproduciendo = false;

    actualizarBoton();

});


// =====================================================
// FORMATO DE TIEMPO
// =====================================================

function formato(segundos) {

    if (isNaN(segundos)) {
        return "0:00";
    }


    const m =
        Math.floor(segundos / 60);


    const s =
        Math.floor(segundos % 60);


    return `${m}:${s
        .toString()
        .padStart(2, "0")}`;

}


// =====================================================
// BOTÓN PLAY / PAUSE
// =====================================================

if (playPauseBtn) {

    playPauseBtn.addEventListener(
        "click",
        playPause
    );

}


// =====================================================
// BOTÓN STOP
// =====================================================

if (stopBtn) {

    stopBtn.addEventListener(
        "click",
        detener
    );

}


// =====================================================
// MOSTRAR PDF
// =====================================================

export function mostrarPDF(ruta) {

    const video =
        document.getElementById("mediaPlayer");

    const pdf =
        document.getElementById("pdfViewer");

    const img =
        document.getElementById("artworkViewer");

    const mask =
        document.getElementById("pdfMask");


    // -------------------------------------------------
    // Detener video
    // -------------------------------------------------

    video.pause();

    video.currentTime = 0;


    // -------------------------------------------------
    // Ocultar video
    // -------------------------------------------------

    video.style.display = "none";


    // -------------------------------------------------
    // Ocultar artwork
    // -------------------------------------------------

    img.style.display = "none";


    // -------------------------------------------------
    // Mostrar PDF
    // -------------------------------------------------

    pdf.style.display = "block";

    pdf.src = encodeURI(ruta);


    // -------------------------------------------------
    // Máscara superior del PDF
    // -------------------------------------------------

    if (mask) {

        mask.style.display = "block";

    }


    // -------------------------------------------------
    // Reiniciar estado
    // -------------------------------------------------

    reproduciendo = false;


    // -------------------------------------------------
    // Reiniciar barra
    // -------------------------------------------------

    if (progressBar) {

        progressBar.value = 0;
        progressBar.max = 100;

    }


    if (currentTime) {

        currentTime.textContent = "0:00";

    }


    if (totalTime) {

        totalTime.textContent = "0:00";

    }


    actualizarBoton();

}