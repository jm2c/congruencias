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
    get expresion():string{
        let b:number = this.independiente;
        let n:number = this.modulo;
        let max:number = mcd2(this.coeficiente, n);
        return "x = " + b/max + " + " + n/max + "k";
    }
}