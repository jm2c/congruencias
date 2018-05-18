/**
 * Ecuación de congruencias completa
 * ax=b (mod n)
 */
class EcuacionCongruencias{
  constructor(a,b,n){
    let max = mcd(a,n);
    this.coeficiente = a;
    this.independiente = b;
    this.modulo = n;
    this.sols = [];

    this.recalc();
  }

  recalc(){
    let a = this.coeficiente;
    let b = this.independiente;
    let n = this.modulo;
    let max = mcd(a,n);

    this.sols = [];
    try{
      if( b % max != 0 ) throw "La ecuación no tiene solución";
      let t = inverso(a/max,n/max);
      for(let k = 0; k < max; k++){
        this.sols.push(
          ((b/max)*t + (n/max)*k)%n
        );
      }
      this.sols.sort((a,b) => {
        return a - b;
      });
    }catch(error){
      this.sols = [];
    }
  }

  setModudo(m){
    this.modulo = m;
    this.recalc();
  }
  get expresion(){
    let b = this.independiente;
    let n = this.modulo;
    let max = mcd(this.coeficiente, n);
    return "x=" + b/max + "t + " + n/max + "k";
  }
}

/**
 * Euación de congruencias simple
 * x=a (mod n)
 */
class EcuacionSimple extends EcuacionCongruencias{
  constructor(a, n){
    super(1,a,n);
  }
  get representante(){
    return this.sols[0];
  }
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

  