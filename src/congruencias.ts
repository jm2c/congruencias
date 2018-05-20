/**
 * Ecuación de congruencias completa
 * ax=b (mod n)
 */
class EcuacionCongruencias{
    coeficiente:number;
    independiente:number;
    modulo:number;
    sols:number[];

    constructor(a:number, b:number, n:number){
        let max:number = mcd2(a,n);
        this.coeficiente = a;
        this.independiente = b;
        this.modulo = n;
        this.sols = [];

        this.recalc();
    }
  
    recalc():void{
        let a:number = this.coeficiente;
        let b:number = this.independiente;
        let n:number = this.modulo;
        let max:number = mcd2(a,n);
  
        this.sols = [];
        try{
            if( b % max != 0 ) throw "La ecuación no tiene solución";
            let t:number = inverso(a/max,n/max);
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
  
    setModulo(m:number):void{
        this.modulo = m;
        this.recalc();
    }
    get expresion():string{
        let b:number = this.independiente;
        let n:number = this.modulo;
        let max:number = mcd2(this.coeficiente, n);
        return "x=" + b/max + "t + " + n/max + "k";
    }
}

/**
 * Euación de congruencias simple
 * x=a (mod n)
 */
class EcuacionSimple extends EcuacionCongruencias{
    constructor(a:number, n:number){
        super(1,a,n);
    }
    get representante():number{
        return this.sols[0];
    }
}

/**
 * Resuelve un sistema de congruencias
 * Recibe dos EcuacionSimple
 */
function sistemaCongruencias2(ec1:EcuacionCongruencias, ec2:EcuacionCongruencias):number[]{
    let a:number = ec1.coeficiente;
    let b:number = ec1.independiente;
    let m:number = ec1.modulo;
    let c:number = ec2.coeficiente;
    let d:number = ec2.independiente;
    let n:number = ec2.modulo;
}

/**
 * Encuentra el inverso multiplicativo de un número
 */
function inverso(a:number, n:number):number{
    if( mcd2(a,n) != 1 ) throw "No tiene inverso";
    let inv:number = 0;
    for(let i = 1; i <= n; i++){
        if((a*i) % n == 1){
            inv = i;
            break;
        }
    }
    return inv;
}

/**
 * Calcula el MCD usando el algritmo de Euclides
 * @param int[] una lista de enteros
 * @return el MCD
 */
function mcd():number{
    //Interrumpir el proceso si no se dan por lo menos dos números
    if(arguments.length < 2) throw 'Debes dar por lo menos dos números enteros positivos';
    let max:number = arguments[0];
    for(let i:number = 0; i < arguments.length; i++){
        max = mcd2(max, arguments[i]);
    }
    return max;
}

function mcd2(a:number, b:number):number{
    return b == 0 ? a : mcd2(b, a % b);
}

/**
 * Calcula el mcm utilizando el MCD
 */
function mcm():number{
    let m:number = arguments[0];
    for(let i = 1; i < arguments.length; i++)
        m = mcm2(m, arguments[i]);
    return m;
}
function mcm2(a:number, b:number):number{
    return (a*b)/mcd2(a,b);
}

  