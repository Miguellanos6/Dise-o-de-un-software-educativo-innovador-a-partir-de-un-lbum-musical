
import { reproducir } from "./player.js";
import { setCancion, getPestaña } from "./state.js";
import { abrirPDF } from "./pdfViewer.js";

let canciones = [];

// =====================================================
// ID DE LA CANCIÓN SELECCIONADA
// =====================================================

let cancionSeleccionadaId = null;


// =====================================================
// CARGAR BIBLIOTECA
// =====================================================

export async function cargarBiblioteca() {

    try {

        const respuesta =
            await fetch("data/songs.json");

        canciones =
            await respuesta.json();

        mostrarBiblioteca();

    }

    catch(error) {

        console.error(
            "Error cargando biblioteca:",
            error
        );

    }

}


// =====================================================
// OBTENER CANCIONES SEGÚN LA PESTAÑA
// =====================================================

function obtenerCancionesDePestana() {

    const pestaña =
        getPestaña();


    let resultado =
        canciones.filter(cancion => {

            switch(pestaña) {

                // -------------------------------------
                // SONG
                // -------------------------------------

                case "song":

                    return !!cancion.song;


                // -------------------------------------
                // VOICE
                // -------------------------------------

                case "voice":

                    return !!cancion.voice;


                // -------------------------------------
                // GUITAR
                // -------------------------------------

                case "guitar":

                    return !!cancion.guitar;


                // -------------------------------------
                // BASS
                // -------------------------------------

                case "bass":

                    return !!cancion.bass;


                // -------------------------------------
                // LYRICS
                // -------------------------------------

                case "lyrics":

                    if(Array.isArray(cancion.lyrics)) {

                        return (
                            cancion.lyrics.length > 0
                        );

                    }

                    return !!cancion.lyrics;


                // -------------------------------------
                // ARTWORK
                // -------------------------------------

                case "artwork":

                    return !!cancion.artwork;


                // -------------------------------------
                // MMD
                // SOLO CANCIÓN 1
                // -------------------------------------

                case "mmd":

                    return (
                        cancion.id === 1 &&
                        !!cancion.mmd
                    );


                default:

                    return false;

            }

        });


    // =================================================
    // ARTWORK
    // SOLO LAS 3 IMÁGENES
    // =================================================

    if(pestaña === "artwork") {

        resultado =
            resultado.slice(0, 3);

    }


    return resultado;

}


// =====================================================
// MOSTRAR BIBLIOTECA
// =====================================================

export function mostrarBiblioteca() {

    const lista =
        document.getElementById("songList");

    if(!lista) return;


    lista.innerHTML = "";


    const pestaña =
        getPestaña();


    const cancionesMostrar =
        obtenerCancionesDePestana();


    // =================================================
    // CREAR ELEMENTOS
    // =================================================

    cancionesMostrar.forEach(cancion => {

        const item =
            document.createElement("div");


        item.className =
            "song";


        item.dataset.id =
            cancion.id;


        // =================================================
        // CONSERVAR SELECCIÓN
        // =================================================

        if(
            Number(cancionSeleccionadaId) ===
            Number(cancion.id)
        ) {

            item.classList.add(
                "selected"
            );

        }


        // =================================================
        // ARTWORK
        // =================================================

        if(pestaña === "artwork") {

            item.innerHTML = `

                <div class="song-title">

                    ${cancion.title}

                </div>

                <div class="song-artist">

                    ${cancion.artist}

                </div>

            `;

        }


        // =================================================
        // LYRICS
        // =================================================

        else if(pestaña === "lyrics") {

            item.innerHTML = `

                <div class="song-title">

                    ${cancion.title}

                </div>

                <div class="song-artist">

                    ${cancion.artist}

                </div>

            `;

        }


        // =================================================
        // MMD
        // =================================================

        else if(pestaña === "mmd") {

            item.innerHTML = `

                <div class="song-title">

                    ${cancion.title}

                </div>

                <div class="song-artist">

                    ${cancion.artist}

                </div>

            `;

        }


        // =================================================
        // SONG / VOICE / GUITAR / BASS
        // =================================================

        else {

            item.innerHTML = `

                <div class="song-title">

                    ${cancion.title}

                </div>

                <div class="song-artist">

                    ${cancion.artist}

                </div>

                <div class="song-time">

                    ${cancion.duration || ""}

                </div>

            `;

        }


        // =================================================
        // CLICK EN CANCIÓN
        // =================================================

        item.addEventListener(
            "click",
            () => {

                seleccionarCancion(
                    cancion,
                    item
                );

            }
        );


        // =================================================
        // AGREGAR A LA LISTA
        // =================================================

        lista.appendChild(item);

    });

}


// =====================================================
// SELECCIONAR CANCIÓN
// =====================================================

function seleccionarCancion(
    cancion,
    item = null
) {

    const pestaña =
        getPestaña();


    // =================================================
    // GUARDAR ID
    // =================================================

    cancionSeleccionadaId =
        cancion.id;


    // =================================================
    // GUARDAR EN STATE
    // =================================================

    setCancion(cancion);


    // =================================================
    // SELECCIÓN VISUAL
    // =================================================

    document
        .querySelectorAll(".song")
        .forEach(song => {

            song.classList.remove(
                "selected"
            );

        });


    if(item) {

        item.classList.add(
            "selected"
        );

    }


    // =================================================
    // ACTUALIZAR INFORMACIÓN
    // =================================================

    const titulo =
        document.getElementById(
            "songTitle"
        );


    const artista =
        document.getElementById(
            "songArtist"
        );


    if(titulo) {

        titulo.textContent =
            cancion.title;

    }


    if(artista) {

        artista.textContent =
            "Artista: " +
            cancion.artist;

    }


    // =================================================
    // ELEMENTOS DEL VISOR
    // =================================================

    const video =
        document.getElementById(
            "mediaPlayer"
        );


    const pdf =
        document.getElementById(
            "pdfViewer"
        );


    const imagen =
        document.getElementById(
            "artworkViewer"
        );


    // =================================================
    // SONG
    // =================================================

    if(pestaña === "song") {

        mostrarVideo(
            video,
            pdf,
            imagen
        );


        if(cancion.song) {

            reproducir(
                "./media/songs/" +
                cancion.song
            );

        }

    }


    // =================================================
    // VOICE
    // =================================================

    else if(pestaña === "voice") {

        mostrarVideo(
            video,
            pdf,
            imagen
        );


        if(cancion.voice) {

            reproducir(
                "./media/voices/" +
                cancion.voice
            );

        }

    }


    // =================================================
    // GUITAR
    // =================================================

    else if(pestaña === "guitar") {

        mostrarVideo(
            video,
            pdf,
            imagen
        );


        if(cancion.guitar) {

            reproducir(
                "./media/guitar/" +
                cancion.guitar
            );

        }

    }


    // =================================================
    // BASS
    // =================================================

    else if(pestaña === "bass") {

        mostrarVideo(
            video,
            pdf,
            imagen
        );


        if(cancion.bass) {

            reproducir(
                "./media/bass/" +
                cancion.bass
            );

        }

    }


    // =================================================
    // LYRICS
    // =================================================

    else if(pestaña === "lyrics") {

        if(!cancion.lyrics) {

            return;

        }


        // -----------------------------------------
        // OCULTAR ARTWORK
        // -----------------------------------------

        if(imagen) {

            imagen.style.display =
                "none";

        }


        // -----------------------------------------
        // MOSTRAR PDF
        // -----------------------------------------

        if(pdf) {

            pdf.style.display =
                "block";

            pdf.style.zIndex =
                "20";

        }


        // -----------------------------------------
        // NO TOCAR VIDEO
        // -----------------------------------------
        //
        // El archivo que esté sonando
        // continúa reproduciéndose.
        //
        // -----------------------------------------


        if(
            Array.isArray(
                cancion.lyrics
            )
        ) {

            if(
                cancion.lyrics.length > 0
            ) {

                abrirPDF(
                    "./media/lyrics/" +
                    cancion.lyrics[0]
                );

            }

        }

        else {

            abrirPDF(
                "./media/lyrics/" +
                cancion.lyrics
            );

        }

    }


    // =================================================
    // ARTWORK
    // =================================================

    else if(pestaña === "artwork") {

        if(!cancion.artwork) {

            return;

        }


        // -----------------------------------------
        // OCULTAR PDF
        // -----------------------------------------

        if(pdf) {

            pdf.style.display =
                "none";

        }


        // -----------------------------------------
        // NO DETENER VIDEO
        // -----------------------------------------

        if(video) {

            video.style.zIndex =
                "1";

        }


        // -----------------------------------------
        // MOSTRAR IMAGEN
        // -----------------------------------------

        if(imagen) {

            let archivo =
                cancion.artwork;


            if(
                Array.isArray(
                    archivo
                )
            ) {

                archivo =
                    archivo[0];

            }


            imagen.src =
                encodeURI(
                    "./media/artwork/" +
                    archivo
                );


            imagen.style.display =
                "block";


            imagen.style.zIndex =
                "50";

        }

    }


    // =================================================
    // MMD
    // =================================================

    else if(pestaña === "mmd") {

        mostrarVideo(
            video,
            pdf,
            imagen
        );


        if(cancion.mmd) {

            reproducir(
                "./media/mmd/" +
                cancion.mmd
            );

        }

    }

}


// =====================================================
// MOSTRAR VIDEO
// =====================================================

function mostrarVideo(
    video,
    pdf,
    imagen
) {

    if(video) {

        video.style.display =
            "block";

        video.style.zIndex =
            "10";

    }


    if(pdf) {

        pdf.style.display =
            "none";

    }


    if(imagen) {

        imagen.style.display =
            "none";

    }

}


// =====================================================
// SIGUIENTE
// =====================================================

function siguiente() {

    const lista =
        obtenerCancionesDePestana();


    if(lista.length === 0) {

        return;

    }


    // ---------------------------------------------
    // BUSCAR POSICIÓN ACTUAL
    // ---------------------------------------------

    let indice =
        lista.findIndex(
            cancion =>
                Number(cancion.id) ===
                Number(cancionSeleccionadaId)
        );


    // ---------------------------------------------
    // SI NO HAY SELECCIÓN
    // IR AL PRIMERO
    // ---------------------------------------------

    if(indice === -1) {

        indice = 0;

    }

    else {

        indice++;

    }


    // ---------------------------------------------
    // NO PASAR DEL ÚLTIMO
    // ---------------------------------------------

    if(indice >= lista.length) {

        indice =
            lista.length - 1;

    }


    const siguienteCancion =
        lista[indice];


    // ---------------------------------------------
    // BUSCAR ELEMENTO VISUAL
    // ---------------------------------------------

    const item =
        document.querySelector(
            `.song[data-id="${siguienteCancion.id}"]`
        );


    seleccionarCancion(
        siguienteCancion,
        item
    );

}


// =====================================================
// ANTERIOR
// =====================================================

function anterior() {

    const lista =
        obtenerCancionesDePestana();


    if(lista.length === 0) {

        return;

    }


    // ---------------------------------------------
    // BUSCAR POSICIÓN ACTUAL
    // ---------------------------------------------

    let indice =
        lista.findIndex(
            cancion =>
                Number(cancion.id) ===
                Number(cancionSeleccionadaId)
        );


    // ---------------------------------------------
    // SI NO HAY SELECCIÓN
    // IR AL PRIMERO
    // ---------------------------------------------

    if(indice === -1) {

        indice = 0;

    }

    else {

        indice--;

    }


    // ---------------------------------------------
    // NO PASAR DEL PRIMERO
    // ---------------------------------------------

    if(indice < 0) {

        indice = 0;

    }


    const anteriorCancion =
        lista[indice];


    // ---------------------------------------------
    // BUSCAR ELEMENTO VISUAL
    // ---------------------------------------------

    const item =
        document.querySelector(
            `.song[data-id="${anteriorCancion.id}"]`
        );


    seleccionarCancion(
        anteriorCancion,
        item
    );

}


// =====================================================
// BOTÓN SIGUIENTE
// =====================================================

const nextBtn =
    document.getElementById(
        "nextBtn"
    );


if(nextBtn) {

    nextBtn.addEventListener(
        "click",
        siguiente
    );

}


// =====================================================
// BOTÓN ANTERIOR
// =====================================================

const previousBtn =
    document.getElementById(
        "previousBtn"
    );


if(previousBtn) {

    previousBtn.addEventListener(
        "click",
        anterior
    );

}