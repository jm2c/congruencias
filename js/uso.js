const $formulario = document.getElementById('formulario');
const $ecuaciones = document.getElementById('ecuaciones');
const $solveBtn = document.getElementById('solveBtn');
const $solucion = document.getElementById('solucion');
let ecuaciones = [];

$formulario.addEventListener('submit', evt => {
    evt.preventDefault();
    let a = document.getElementById('a').value;
    let b = document.getElementById('b').value;
    let m = document.getElementById('m').value;
    try{
        let nuevaEc = new EcuacionCongruencias(a,b,m);
        ecuaciones.push(nuevaEc);
        let $ecHtml = document.createElement("li");
        $ecHtml.innerHTML = nuevaEc.latexExp;
        $ecuaciones.appendChild($ecHtml);
        updateMath();
    }catch(e){
        console.error(e);
    }
    
    $formulario.reset();
    document.getElementById('a').focus();
});

$solveBtn.addEventListener('click', () => {
    if(ecuaciones.length == 0) return false;
    if(ecuaciones.length == 1){
        $solucion.innerHTML = "\\[" + ecuaciones[0].expresion + "\\]";
        updateMath();
    }else{
        var sol = sistemaCongruencias(ecuaciones);
        $solucion.innerHTML = "\\[" + sol.expresion + "\\]";
        updateMath();
    }
});

const updateMath = function(){
    MathJax.Hub.PreProcess();
    MathJax.Hub.Reprocess();
};

