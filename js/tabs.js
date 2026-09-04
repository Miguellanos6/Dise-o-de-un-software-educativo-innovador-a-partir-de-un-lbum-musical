import { getCancion, setPestaña } from "./state.js";
import { reproducir } from "./player.js";
import { abrirPDF } from "./pdfViewer.js";
import { mostrarBiblioteca } from "./library.js";


// =====================================================
// ACTIVAR BOTÓN
// =====================================================

function activarBoton(id) {

    document
        .querySelectorAll(".tabs button")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    const boton =
        document.getElementById(id);


    if(boton) {

        boton.classList.add("active");

    }

}


// =====================================================
// SONG
// =====================================================

const songBtn =
    document.getElementById("songBtn");


if(songBtn) {

    songBtn.addEventListener("click", () => {

        const c =
            getCancion();


        // ---------------------------------------------
        // CAMBIAR PESTAÑA SIEMPRE
        // ---------------------------------------------

        setPestaña("song");

        activarBoton("songBtn");

        mostrarBiblioteca();


        // ---------------------------------------------
        // REPRODUCIR SOLO SI EXISTE
        // ---------------------------------------------

        if(c && c.song) {

            reproducir(
                "./media/songs/" +
                c.song
            );

        }

    });

}


// =====================================================
// VOICE
// =====================================================

const voiceBtn =
    document.getElementById("voiceBtn");


if(voiceBtn) {

    voiceBtn.addEventListener("click", () => {

        const c =
            getCancion();


        // ---------------------------------------------
        // CAMBIAR PESTAÑA SIEMPRE
        // ---------------------------------------------

        setPestaña("voice");

        activarBoton("voiceBtn");

        mostrarBiblioteca();


        // ---------------------------------------------
        // REPRODUCIR SOLO SI EXISTE
        // ---------------------------------------------

        if(c && c.voice) {

            reproducir(
                "./media/voices/" +
                c.voice
            );

        }

    });

}


// =====================================================
// GUITAR
// =====================================================

const guitarBtn =
    document.getElementById("guitarBtn");


if(guitarBtn) {

    guitarBtn.addEventListener("click", () => {

        const c =
            getCancion();


        // ---------------------------------------------
        // CAMBIAR PESTAÑA SIEMPRE
        // ---------------------------------------------

        setPestaña("guitar");

        activarBoton("guitarBtn");

        mostrarBiblioteca();


        // ---------------------------------------------
        // REPRODUCIR SOLO SI EXISTE
        // ---------------------------------------------

        if(c && c.guitar) {

            reproducir(
                "./media/guitar/" +
                c.guitar
            );

        }

    });

}


// =====================================================
// BASS
// =====================================================

const bassBtn =
    document.getElementById("bassBtn");


if(bassBtn) {

    bassBtn.addEventListener("click", () => {

        const c =
            getCancion();


        // ---------------------------------------------
        // CAMBIAR PESTAÑA SIEMPRE
        // ---------------------------------------------

        setPestaña("bass");

        activarBoton("bassBtn");

        mostrarBiblioteca();


        // ---------------------------------------------
        // REPRODUCIR SOLO SI EXISTE
        // ---------------------------------------------

        if(c && c.bass) {

            reproducir(
                "./media/bass/" +
                c.bass
            );

        }

    });

}


// =====================================================
// LYRICS
// =====================================================

const lyricsBtn =
    document.getElementById("lyricsBtn");


if(lyricsBtn) {

    lyricsBtn.addEventListener("click", () => {

        const c =
            getCancion();


        // ---------------------------------------------
        // CAMBIAR PESTAÑA SIEMPRE
        // ---------------------------------------------

        setPestaña("lyrics");

        activarBoton("lyricsBtn");

        mostrarBiblioteca();


        // ---------------------------------------------
        // SI NO HAY LETRA, NO ABRIR PDF
        // PERO LA PESTAÑA SÍ CAMBIA
        // ---------------------------------------------

        if(!c || !c.lyrics) {

            return;

        }


        // ---------------------------------------------
        // LYRICS COMO ARRAY
        // ---------------------------------------------

        if(Array.isArray(c.lyrics)) {

            if(c.lyrics.length > 0) {

                abrirPDF(
                    "./media/lyrics/" +
                    c.lyrics[0]
                );

            }

        }


        // ---------------------------------------------
        // LYRICS COMO ARCHIVO ÚNICO
        // ---------------------------------------------

        else {

            abrirPDF(
                "./media/lyrics/" +
                c.lyrics
            );

        }

    });

}


// =====================================================
// ARTWORK
// =====================================================

const artworkBtn =
    document.getElementById("artworkBtn");


if(artworkBtn) {

    artworkBtn.addEventListener("click", () => {

        const c =
            getCancion();


        // ---------------------------------------------
        // CAMBIAR PESTAÑA SIEMPRE
        // ---------------------------------------------

        setPestaña("artwork");

        activarBoton("artworkBtn");

        mostrarBiblioteca();


        // ---------------------------------------------
        // SI NO HAY ARTWORK
        // LA PESTAÑA SIGUE FUNCIONANDO
        // ---------------------------------------------

        if(!c || !c.artwork) {

            return;

        }


        // ---------------------------------------------
        // ELEMENTOS
        // ---------------------------------------------

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


        // ---------------------------------------------
        // OCULTAR VIDEO VISUALMENTE
        //
        // IMPORTANTE:
        // NO HACER video.pause()
        // NO CAMBIAR currentTime
        //
        // Así el audio/video continúa.
        // ---------------------------------------------

        if(video) {

            video.style.display =
                "none";

        }


        // ---------------------------------------------
        // OCULTAR PDF
        // ---------------------------------------------

        if(pdf) {

            pdf.style.display =
                "none";

        }


        // ---------------------------------------------
        // MOSTRAR ARTWORK
        // ---------------------------------------------

        if(imagen) {

            let archivo =
                c.artwork;


            // Si artwork fuera un array
            if(Array.isArray(archivo)) {

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


            imagen.style.objectFit =
                "contain";


            imagen.style.opacity =
                "1";


            imagen.style.filter =
                "none";


            imagen.style.mixBlendMode =
                "normal";

        }

    });

}


// =====================================================
// MMD
// SOLO CANCIÓN 1
// =====================================================

const mmdBtn =
    document.getElementById("mmdBtn");


if(mmdBtn) {

    mmdBtn.addEventListener("click", () => {

        const c =
            getCancion();


        // ---------------------------------------------
        // CAMBIAR A MMD SIEMPRE
        // ---------------------------------------------

        setPestaña("mmd");

        activarBoton("mmdBtn");

        mostrarBiblioteca();


        // ---------------------------------------------
        // REPRODUCIR SOLO SI EXISTE
        // ---------------------------------------------

        if(c && c.mmd) {

            reproducir(
                "./media/mmd/" +
                c.mmd
            );

        }

    });

}