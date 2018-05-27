const formulario = document.getElementById('formulario');
const ecuaciones = document.getElementById('ecuaciones');

formulario.addEventListener('submit', e => {
    e.preventDefault();
});

const updateMath = function(){
    MathJax.Hub.PreProcess();
    MathJax.Hub.Reprocess();
};