exports.resultados = (busqueda) => {
    vector = [busqueda.length, getRespuestas(busqueda), getRetweets(busqueda), (busqueda.length - getRetweets(busqueda) - getRespuestas(busqueda)), getMedia(busqueda)];
    return vector
}

function getRespuestas(busqueda) {
    let contador = 0;
    for (let i = 0; i < busqueda.length; i++) {
        if (busqueda[i].in_reply_to_status_id != null) {
            contador = contador + 1
        }
    }
    return contador;
}

function getRetweets(busqueda) {
    let contador = 0;
    for (let i = 0; i < busqueda.length; i++) {

        if (busqueda[i].retweeted_status) {
            contador = contador + 1
        }
    }
    return contador;
}

function getMedia(busqueda) {
    let contador = 0;
    for (let i = 0; i < busqueda.length; i++) {
        if (busqueda[i].entities.urls[0]) {
            contador = contador + 1
        }
        if (busqueda[i].entities.media) {
            contador = contador + 1
        }
    }
    return contador;
}

exports.followers = (busqueda) => {
    let contador = 0;
    for (let i = 0; i < busqueda.length; i++) {
        contador += busqueda[i].Followers;
    }
    return contador;
}
