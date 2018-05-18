/**
 * Encuentra las soluciones de una ecuación
 * de congruencias completa
 * ax=b (mod n)
 */
function ecuacionCompleta(a,b,n){
  let max = mcd(a,n);
  if( b % max != 0 ) throw "La ecuación no tiene solución";
  congruencia = {
    expresion: "x=" + b/max + "t + " + n/max + "k",
    t: inverso(a/max,n/max),
    sols: []
  };
  for(let k = 0; k < max; k++){
    congruencia.sols.push(
      ((b/max)*congruencia.t + (n/max)*k)%n
    );
  }
  congruencia.sols.sort((a,b) => {
    if( a == b ) return 0;
    return a < b ? -1 : 1;
  });
  return congruencia;
}

/**
 * Encuentra las soluciones de una ecuación
 * de congruencias simple
 * x=a (mod n)
 */
function ecuacionSimple(a, n, m){
  m = m || 1;
  a = a < 0 ? (a%n+n) : a%n;
  congruencia = {
    expresion : "x=" + a + "+" + n + "k",
    representante: a,
    sols : [],
  };
  for(let i = 0; i < m ; i++){
    congruencia.sols.push(congruencia.representante + n*i);
  }
  return congruencia;
}

/**
 * Encuentra el inverso multiplicativo de un número
 */
function inverso(a, n){
  for(let i = 1; i <= n; i++){
    if((a*i) % n == 1) return i;
  }
  throw "No hay inverso";
}

/**
 * Calcula el MCD usando el algritmo de Euclides
 * @param int[] una lista de enteros
 * @return el MCD
 */
function mcd(){
  //Interrumpir el proceso si no se dan por lo menos dos números
  if(arguments.length < 2) throw 'Debes dar por lo menos dos números enteros positivos';
  
  //saca el mcd de dos números
  if(arguments.length == 2){
    a = validar( arguments[0] );
    b = validar( arguments[1] );
    while(a % b != 0){
      residuo = a % b;
      a = b;
      b = residuo;
    }
    return b;  
  }
  
  //si se pasan más de dos argumentos se saca el mcd de dos en dos
  else{
    var min = arguments[0];
    for(var i = 1; i < arguments.length; i++){
      min = mcd(min, arguments[i]);
    }
    return min;
  }
}

/**
 * Calcula el mcm utilizando el MCD
 */
function mcm(){
  m = arguments[0];
  for(i = 1; i < arguments.length; i++)
      m = (m*arguments[i])/mcd(m,arguments[i]);
  return m;
}

  /*-- FUNCIONES AUXILIARES --*/
  
  //Esta función determina si un número "n" es entero
  //Regresa true/false
  function esEntero(n){
    return Number(n) === n && n % 1 === 0;
  }
  
  //Esta función determina si un número cumple con las condiciones requeridas
  //si es así regresa el mismo número, si no, interrumpe el proceso
  function validar(n){
    if( !esEntero(n) || n < 1 ) throw 'Utiliza sólo números enteros positivos (mayores que cero)';
    return n;
  }

  