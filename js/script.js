//DICHIARAZIONE VARIABILI
var checkClick = document.getElementsByClassName("check-box");
var outOldPoints =document.getElementById('old-point');
var outPoints = document.getElementById('points');
var outNumberMine = document.getElementById('mine');
var mine =[];
var difficulty=prompt('Con quale difficoltà vuoi giocare:Facile,Media,Difficile?')
var numberMine;
var points=0;
var oldPoints=0;
//INIZIO
if (isNaN(sessionStorage.getItem("oldPoints")) || sessionStorage.getItem("oldPoints") == null){
    outOldPoints.innerHTML += oldPoints;
}else{   
    oldPoints = sessionStorage.getItem("oldPoints");
    outOldPoints.innerHTML += oldPoints;
}

outPoints.innerHTML += points;

// CREO LE MINE IN BASE ALLA DIFFICOLTA SCELTA DALL'UTTENTE.
switch(difficulty){
    case "Facile" :
        numberMine=16;
        break;
    case "Media" :
        numberMine=32;
        break;
    case "Difficile" :
        numberMine=64;
        break;
    default :  
        numberMine=16;  
}
outNumberMine.innerHTML += numberMine;
//CREO LE MINE E CONTROLLO CHE NON SE NE CREINO DOPPIONI;
for(var x = 1;x <= numberMine;x++){
    var mina = (Math.floor(Math.random() * 100) + 1);
    for(var y = 0; y <= mine.length; y++){
        if(mina === mine[y]){ 
            mina = (Math.floor(Math.random() * 100) + 1);
            y = 0;
        }
    } 
    mine.push(mina);
}
//DO IL VALORE A TUTTI I BOX(IN QUESTO CASO A 1 A 100)COSI DA NON DOVERLI DARE IO SINGOLARMENTE
for(var t = 0;t < checkClick.length; t++){
    var h = t + 1;
    checkClick[t].value = h;
}
//CREO UN CICLO COSì DA PRENDERE IN CONSIDERAZIONE TUTTI I BOX
for(var z = 0;z < checkClick.length; z++){

    checkClick[z].onclick = function(){

        //QUI SCRIVO COSA VERRà ESEGUITO AL CLICK
        var w = parseInt(this.value);
        var area = [w-11,w-10,w-9,w-1,w+1,w+9,w+10,w+11];
        var areaLeft=[10,20,30,40,50,60,70,80,90,100];
        var areaRight=[1,11,21,31,41,51,61,71,81,91];


        var distance = 0;
    
        if(mine.includes(w)){
            this.parentNode.classList.add("color-red");

            // for(var r = 0;r < checkClick.length; r++){
            //     checkClick[r].style.display = "none";
            // }
            // alert('HAI PERSO!!!');
        }
        else{
            for(var p = 0; p < area.length;p++){
                if( mine.includes(area[p])){
                    if((areaLeft.includes(area[p]) && areaRight.includes(w)) || (areaRight.includes(area[p]) && areaLeft.includes(w))){}else{
                        distance = distance + 1; 
                    }
                }
            }
            
            if(distance<1){
                this.parentNode.classList.add("color");
                this.style.display = "none";
                points = points + 1;
               
    
            }else if(distance > 0 && distance < 8) {
                this.parentNode.classList.add("color");
                this.parentNode.innerHTML = distance;
                points = points + 1;
            }
        } 

        outPoints.innerHTML =  points;
        if(points === (100-numberMine)){
            alert('HAI VINTO!');
        }
        sessionStorage.setItem("oldPoints", points);
    
    };
}



