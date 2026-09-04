export function abrirPDF(ruta) {

    const video = document.getElementById("mediaPlayer");
    const pdf = document.getElementById("pdfViewer");
    const img = document.getElementById("artworkViewer");



    video.style.display = "none";
    img.style.display = "none";
    pdf.style.display = "block";

    // Mostrar la máscara
    document.getElementById("pdfMask").style.display = "block";

    pdf.src = encodeURI(ruta);
}