let cancionActual = null;

let pestañaActual = "song";

export function setCancion(cancion){

    cancionActual = cancion;

}

export function getCancion(){

    return cancionActual;

}

export function setPestaña(pestaña){

    pestañaActual = pestaña;

}

export function getPestaña(){

    return pestañaActual;

}