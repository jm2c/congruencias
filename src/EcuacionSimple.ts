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