/**
 * Euación de congruencias simple
 * x=a (mod n)
 */
class EcuacionSimple extends EcuacionCongruencias{
    constructor(a:number, n:number){
        super(1,a,n);
    }
    get representante():number{
        let r:number = this.sols[0];
        this.independiente = r < 0 ? this.modulo + r : r
        return this.independiente;
    }
    get expresion():string{
        let b:number = this.representante;
        let n:number = this.modulo;
        let max:number = mcd2(this.coeficiente, n);
        return "x = " + (b/max) % this.modulo + " + " + n/max + "k";
    }
    masSoluciones(n:number):number[]{
        let mSols:number[] = [];
        let a:number = this.representante;
        let m:number = this.modulo;
        for(let i = 0; i < n; i++)
            mSols.push(a + m*i);
        return mSols;
    }
}