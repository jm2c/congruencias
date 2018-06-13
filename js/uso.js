// Inicializa las variables
const $a          = document.getElementById('a');
const $b          = document.getElementById('b');
const $m          = document.getElementById('m');
const $ecuaciones = document.getElementById('ecuaciones');
const $error      = document.getElementById('error');
const $formulario = document.getElementById('formulario');
const $resetBtn   = document.getElementById('resetBtn');
const $solucion   = document.getElementById('solucion');
const $solveBtn   = document.getElementById('solveBtn');
let ecuaciones = [];

// Agregar ecuación a la lista
$formulario.addEventListener('submit', evt => {
    evt.preventDefault();
    let a = parseInt($a.value) || 1;
    let b = parseInt($b.value);
    let m = parseInt($m.value);
    
    try{
        if(!esEntero(a) || !esEntero(b) || !esEntero(m))
            throw 'Datos inválidos';

        let nuevaEc = a == 1 ? new EcuacionSimple(b,m) : new EcuacionCongruencias(a,b,m);
        ecuaciones.push(nuevaEc);

        let $ecHtml = document.createElement("li");
        $ecHtml.innerHTML = nuevaEc.expresion();
        $ecuaciones.appendChild($ecHtml);
    }catch(e){
        console.error(e);
        $error.innerText = e;
    }
    
    clear();
});

// Resolver ecuación o sistema
$solveBtn.addEventListener('click', function() {
    const numEcs = ecuaciones.length;

    switch(numEcs){
        case 0:
            $error.innerText = "Agrega al menos una ecuación primero.";
            break;
        case 1:
            let ec = ecuaciones[0];
            if(ec.coeficiente == 1){
                $solucion.innerHTML = ec.solExpresion()
                                    + '<br/>'
                                    + 'Algunas soluciones son: '
                                    + '{' + ec.masSoluciones(5) + '}';
            }else{
                try{
                    const sols = ec.solve();
                    const numSols = sols.length;
                    $solucion.innerHTML = 'Tiene ' + numSols + ' soluciones incongruentes: '
                                        + '{' + sols + '}';
                }catch(e){
                    $error.innerText = e;
                }
            }
            break;
        default:
            try{
                var sol = sistemaCongruencias(ecuaciones);
                $solucion.innerHTML = sol.expresion()
                                    + '<br/>'
                                    + sol.solExpresion()
                                    + '<br/>'
                                    + 'Algunas soluciones son: '
                                    + '{' + sol.masSoluciones(5) + '}';
            }catch(e){
                $error.innerText = e;
            }
        }
        $solucion.classList.add('solucion');
});

// Limpiar todo
$resetBtn.addEventListener('click', function(){
    clear();
    ecuaciones = [];
    $ecuaciones.innerHTML = '';
});

function clear(){
    $formulario.reset();
    $solucion.innerHTML = '';
    $solucion.classList.remove('solucion');
    $error.innerHTML = '';
    $a.focus();}

// Acciones al cargar la página
window.onload = function(){
    $a.focus();
};