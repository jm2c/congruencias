/**
 * Ecuación de congruencias completa
 * ax=b (mod n)
 */
class EcuacionCongruencias{
    coeficiente:number;
    independiente:number;
    modulo:number;

    constructor(a:number, b:number, n:number){
        a = a || 1;
        if(!b || !n)
            throw 'Argumentos inválidos';
        if(!esEntero(a) || !esEntero(b) || !esEntero(n))
            throw 'Argumentos inválidos';

        this.coeficiente = a;
        this.independiente = b;
        this.modulo = n;
    }
  
    /**
     * Teorema 3.14
     */
    solve():number[]{
        let a:number = this.coeficiente;
        let b:number = this.independiente;
        let n:number = this.modulo;
        let max:number = mcd2(a,n);
        let sols:number[] = [];
        const numSols:number = max;

        // Primero verifica si la ecuación tiene solución
        if( b % max != 0 ) throw "La ecuación no tiene solución";

        // Se reduce la ecuación si es posible
        if(a % max == 0 && b % max == 0 && n % max == 0){
            a /= max;
            b /= max;
            n /= max;
            max = mcd2(a, n);
        }

        // Se agregan las soluciónes al arreglo
        let t:number = inverso(a/max, n/max);
        for(let k = 0; k < numSols; k++){
            sols.push(
                ((b/max)*t + (n/max)*k)%this.modulo
            );
        }

        // Se ordenan las soluciones
        sols.sort((a,b) => {return a - b;});

        return sols;
    }
  
    setCoeficiente(a:number):void{
        this.coeficiente = a;
    }

    setIndependiente(b:number):void{
        this.independiente = b;
    }

    setModulo(m:number):void{
        this.modulo = m;
    }

    expresion(tex:boolean):string{
        let a:number = this.coeficiente;
        let b:number = this.independiente;
        let m:number = this.modulo;
        return tex ?
            "\\[" + a + "x\\equiv " + b + "\\ (mod\\ " + m + ")\\]" :
            a + "<i>x<i> &equiv; " + b + " (<i>mod</i> " + m + ")";
    }

}