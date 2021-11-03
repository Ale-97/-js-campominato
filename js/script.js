var checkClick = document.getElementsByClassName("check-box");
var mine =[];
var t ;
for(var x = 1;x <= 16;x++){
    var mina = (Math.floor(Math.random() * 100) + 1);
    for(var y = 0; y <= mine.length; y++){
        if(mina === mine[y]){ 
            mina = (Math.floor(Math.random() * 100) + 1);
            y = 0;
        }
    } 
    mine.push(mina);
}
for(t = 0;t < checkClick.length; t++){
    var h = t + 1;
    checkClick[t].value = h;
}
console.log(mine);


for(var z = 0;z <= checkClick.length; z++){

    checkClick[z].addEventListener('click', 
    function(){
            if(mine.includes(parseInt(this.value))){
                this.className = this.classList + " color-red";
                alert('HAI PERSO!')
            }else{
                this.className = this.classList + " color";
            }       
    })
}



