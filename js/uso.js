const $formulario = document.getElementById('formulario');
const $ecuaciones = document.getElementById('ecuaciones');
const $solveBtn = document.getElementById('solveBtn');
const $resetBtn = document.getElementById('resetBtn');
const $solucion = document.getElementById('solucion');
const $error = document.getElementById('error');
let ecuaciones = [];

$formulario.addEventListener('submit', evt => {
    evt.preventDefault();
    let a = document.getElementById('a').value || 1;
    let b = document.getElementById('b').value;
    let m = document.getElementById('m').value;
    
    try{
        if(!esEntero(a) || !esEntero(b) || !esEntero(m))
            throw 'Datos inválidos';

        let nuevaEc = a == 1 ? new EcuacionSimple(b,m) : new EcuacionCongruencias(a,b,m);
        console.log(nuevaEc);
        ecuaciones.push(nuevaEc);
        let $ecHtml = document.createElement("li");
        $ecHtml.innerHTML = nuevaEc.expresion();
        $ecuaciones.appendChild($ecHtml);
        // updateMath();
    }catch(e){
        console.error(e);
        $error.innerText = e;
    }
    
    $formulario.reset();
    document.getElementById('a').focus();
});

$solveBtn.addEventListener('click', function() {
    if(ecuaciones.length == 0) return false;
    if(ecuaciones.length == 1){
        $solucion.innerHTML = ecuaciones[0].expresion();
    }else{
        var sol = sistemaCongruencias(ecuaciones);
        $solucion.innerHTML = sol.expresion();
    }
    $solucion.classList.add('solucion');
    // updateMath();
});

$resetBtn.addEventListener('click', function(){
    $formulario.reset();
    ecuaciones = [];
    $ecuaciones.innerHTML = '';
    $solucion.innerHTML = '';
    $solucion.classList.remove('solucion');
    $error.innerHTML = '';
});

// const updateMath = function(){
//     MathJax.Hub.PreProcess();
//     MathJax.Hub.Reprocess();
// };

window.onload = function(){
    document.getElementById('a').value = 15;
    document.getElementById('b').value = 9;
    document.getElementById('m').value = 18;
}

var ecs = [
    new EcuacionSimple(1,2),
    new EcuacionSimple(2,3),
    new EcuacionSimple(3,4),
    new EcuacionSimple(4,5)
];