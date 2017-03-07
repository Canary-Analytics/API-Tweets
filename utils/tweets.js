exports.resultados = (busqueda) => {
    let originales = (busqueda.length - getRetweets(busqueda) - getRespuestas(busqueda));
    vector = [busqueda.length, getRespuestas(busqueda), getRetweets(busqueda), originales, getMedia(busqueda), impacto(busqueda), mediaFollowers(busqueda), getUsers(busqueda), alcance(busqueda), mediaTweets(busqueda), getDisp(busqueda), getRepeticiones(busqueda)];
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

function getUsers(busqueda) {
    let vector = [];
    for (let i = 0; i < busqueda.length; i++) {
        vector.push(busqueda[i].user.screen_name);
    }
    vector = duplicados(vector);
    return vector.length;
}

function impacto(busqueda) {
    let contador = 0;
    for (let i = 0; i < busqueda.length; i++) {
        contador += busqueda[i].user.followers_count;
    }
    return contador;
}

function alcance(busqueda) {
    let contador = 0;
    for (let i = 0; i < busqueda.length; i++) {
        contador += busqueda[i].retweet_count;
    }
    return contador;
}

function mediaFollowers(busqueda) {
    return (impacto(busqueda) / busqueda.length);
}

function mediaTweets(busqueda) {
    let vector = [];
    for (let i = 0; i < busqueda.length; i++) {
        vector.push(busqueda[i].user.statuses_count);
    }
    vector = duplicados(vector);

    let contador = 0;
    for (let i = 0; i < vector.length; i++) {
        contador = contador + vector[i];
    }
    return (contador / vector.length);
}

function getDisp(salida) {
    let devices = ["Cliente Web", "iOS", "Android", "Otros"];
    let cnt = [0, 0, 0, 0];

    for (let i = 0; i < salida.length; i++) {
        if (salida[i].source.includes("Windows") || salida[i].source.includes("Web Client")) {
            cnt[0]++;
        } else if (salida[i].source.includes("iPhone") || salida[i].source.includes("Mac") || salida[i].source.includes("iPad")) {
            cnt[1]++;
        } else if (salida[i].source.includes("Android")) {
            cnt[2]++;
        } else {
            cnt[3]++;
        }
    }

    let devicescounter = [devices, cnt];
    return devicescounter;
}

function getRepeticiones(busqueda) {
    let vector = [];
    for (let i = 0; i < busqueda.length; i++) {
        vector.push(busqueda[i].user.screen_name);
    }
    let count = {};
    vector.forEach((i) => {
        count[i] = (count[i] || 0) + 1;
    });
}

function duplicados(vector) {
    const SinDuplicados = vector.filter((elem, pos) => {
        return vector.indexOf(elem) == pos;
    });
    return SinDuplicados;
}
