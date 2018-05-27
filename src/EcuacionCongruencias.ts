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
        this.coeficiente /= max;
        this.independiente /= max;
        this.modulo /= max;
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
        return "x = " + b/max + "t + " + n/max + "k";
    }
}