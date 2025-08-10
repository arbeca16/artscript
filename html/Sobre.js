satual = 1;
smax = 2;
stmp = 3000;

function troca(){
    document.getElementById('b1').style.visibility='hidden';
    document.getElementById('b2').style.visibility='hidden';

    document.getElementById('b'+satual).style.visibility='visible';
    satual=satual+1

    if (satual > smax){
        satual = 1;
    }
}

function slider (){
    
    document.getElementById('b1').style.visibility='visible';
    document.getElementById('b2').style.visibility='hidden';
    sliderTimer=setInterval(troca,stmp);
}