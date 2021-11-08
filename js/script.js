//DICHIARAZIONE VARIABILI
var checkClick = document.getElementsByClassName("check-box");
var outOldPoints = document.getElementById('old-point');
var outPoints = document.getElementById('points');
var outNumberMines = document.getElementById('mines');
var mines = [];
var numberMines;
var points = 0;
var oldPoints = 0;

//iNIZIO CON IL CONTROLLARE SE IL GIOCATORE HA FATTO UNA PARTITA IN QUESTA SESSIONE, SE "SI" CARICO IL VECCHIO PUNTEGGIO, IN CASO CONTRARIO STAMPO 0
if (isNaN(sessionStorage.getItem("oldPoints")) || sessionStorage.getItem("oldPoints") == null) {
    outOldPoints.innerHTML += oldPoints;
} else {
    oldPoints = sessionStorage.getItem("oldPoints");
    outOldPoints.innerHTML += oldPoints;
}
outPoints.innerHTML += points;

// CHIEDO ALL'UTTENTE CON QUALE DIFFICOLTA VUOLE GIOCARE, POI A SECONDA DELLA DIFFICOLTà LE MINE AUMENTERANNO.
while (difficulty !== "FACILE" && difficulty !== "MEDIA" && difficulty !== "DIFFICILE" && difficulty !== "") {
    var difficulty = prompt('Con quale difficoltà vuoi giocare:Facile,Media,Difficile?').toUpperCase();
}
switch (difficulty) {
    case "FACILE":
        numberMines = 16;
        break;
    case "MEDIA":
        numberMines = 32;
        break;
    case "DIFFICILE":
        numberMines = 64;
        break;
    default:
        numberMines = 16;
}
outNumberMines.innerHTML += numberMines;

//QUI SI GENERANO LE MINE, OVVERO DEI NUMERI CHE CORRISPONDERANNO ALLE COORDINATE DELLE MINE;
while (numberMines !== mines.length) {
    do {
        var mine = (Math.floor(Math.random() * 100) + 1);

    } while (mines.includes(mine))

    mines.push(mine);
}

//DO IL VALORE A TUTTI I BOX(IN QUESTO CASO A 1 A 100) COSì DA NON DOVERLI DARE IO SINGOLARMENTE A TUTTI GLI ELEMENTI NELL'HTML
for (var t = 0; t < checkClick.length; t++) {
    checkClick[t].value = t + 1;
}

//CREO UN CICLO COSì DA DARE LA FUNZIONE A TUTTI I BOX
for (var z = 0; z < checkClick.length; z++) {

    checkClick[z].onclick = function () {

        //QUI SCRIVO COSA VERRà ESEGUITO AL CLICK NEL BOX
        var valueBox = parseInt(this.value);
        var perimeterControl = [valueBox - 11, valueBox - 10, valueBox - 9, valueBox - 1, valueBox + 1, valueBox + 9, valueBox + 10, valueBox + 11];
        var allFirstBoxs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        var allLastBoxs = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];
        var distanceMines = 0;
        //CONTROLLO CHE IL VALORE DEL BOX APPENA CLICCATO NON SIA COMPRESO NELLE MINE
        if (mines.includes(valueBox)) {
            //NEL CASO VENGA PRESA UNA MINA TUTTI I RIQUADRI DIVENTANO "DISPLAY:NONE" E COMPAIONO TUTTE LE MINE
            for (var r = 0; r < checkClick.length; r++) {
                if (mines.includes(parseInt(checkClick[r].value))) {
                    checkClick[r].parentNode.classList.add("mine");
                }
                checkClick[r].style.display = "none";
            }
            alert('HAI PERSO!!!');
        }
        else {
            //SE NON è STATA PRESA UNA MINA, CONTROLLO SE ATTORNO AL MIO BOX CI SONO DELLE MINE
            this.style.display = "none";

            for (var p = 0; p < perimeterControl.length; p++) {
                if (mines.includes(perimeterControl[p])) {
                    if (!((allFirstBoxs.includes(perimeterControl[p]) && allLastBoxs.includes(valueBox)) || (allLastBoxs.includes(perimeterControl[p]) && allFirstBoxs.includes(valueBox)))) {
                        distanceMines = distanceMines + 1;
                    }
                }
            }
            //SE NON CI SONO MINE ATTORNO SI LIMITERà A STAMPARE UN FIORE ED AD AGGIUNGERE UN PUNTO
            if (distanceMines < 1) {
                this.parentNode.classList.add("flower");
                points = points + 1;
                console.log(distanceMines);
            }
            // SE CI DOVESSERO ESSERE DELLE MINE ATTORNO, STAMPERà IL NUMERO DI MINE VICINE ED AGGIUNGERà UN PUNTO
            else {
                this.parentNode.classList.add("radar");
                this.parentNode.innerHTML = distanceMines;
                points = points + 1;
            }
        }
        //STAMPA IL PUNTEGGIO
        outPoints.innerHTML = points;
        //SE VENGONO TROVATE TUTTE LE CASELLE SENZA MINE COMPARIRà LA SCRITTA DI VITTORIA.
        if (points === (100 - numberMines)) {
            alert('HAI VINTO!');
        }
        //VIENE SALVATO IL PUNTEGGIO COSI CHE AL REFRESH DELLA PAGINA SI POSSA VEDERE IL VECCHIO PUNTEGGIO.
        sessionStorage.setItem("oldPoints", points);

    };
}



