/**
 * Resuelve un sistema de congruencias
 * Recibe dos EcuacionSimple
 */
function sistemaCongruencias2(ec1:EcuacionCongruencias, ec2:EcuacionCongruencias):EcuacionSimple{
    let a:number = ec1.coeficiente;
    let b:number = ec1.independiente;
    let m:number = ec1.modulo;
    let c:number = ec2.coeficiente;
    let d:number = ec2.independiente;
    let n:number = ec2.modulo;
    
    let max1:number = mcd2(a,m);
    let max2:number = mcd2(c,n);
    if(b % max1 != 0 || d % max2 != 0)
        throw 'El sistema no tiene solución';
    let t:number = inverso(a/max1, m/max1);
    let u:number = inverso(c/max2, n/max2);
    let ecSol1:EcuacionSimple = new EcuacionSimple(t*(b/max1),m/max1);
    let ecSol2:EcuacionSimple = new EcuacionSimple(u*(d/max2),n/max2);
    return sistemaSimple(ecSol1, ecSol2);
}

/**
 * Resuleve un sistema de congruencias simples
 */
function sistemaSimple(ec1:EcuacionSimple, ec2:EcuacionSimple):EcuacionSimple{
        let a:number = ec1.independiente;
        let m:number = ec1.modulo;
        let b:number = ec2.independiente;
        let n:number = ec2.modulo;
        let max:number = mcd2(m,n);
        if((b-a) % max != 0)
            throw 'El sistema no tiene solución';
        let t:number = inverso(m/max, n/max);
        let coeficiente:number = a + m*t*(b-a)/max;
        let modulo:number = mcm2(m,n);
        return new EcuacionSimple(coeficiente, modulo);
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

  