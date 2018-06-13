/**
 * Euación de congruencias simple
 * x=a (mod n)
 */
class EcuacionSimple extends EcuacionCongruencias{
    constructor(b:number, n:number){
        super(1,b,n);
    }

    representante():number{
        return super.solve()[0];
    }

    expresion(tex:boolean):string{
        const b:number = this.representante();
        const n:number = this.modulo;
        return tex ?
            "\\[x\\equiv " + b + "(mod\\ " + n + ")\\]" :
            "<i>x</i> &equiv; " + b + " (<i>mod</i> " + n + ")";
    }

    solExpresion(tex:boolean):string{
        const b:number = this.representante();
        const n:number = this.modulo;
        return tex ?
            "\\[x=" + b + "+" + n + "z\\]" :
            "<i>x</i> = " + b + " + " + n + "<i>z</i>";
    }

    masSoluciones(n:number):number[]{
        let mSols:number[] = [];
        let a:number = this.representante();
        let m:number = this.modulo;
        for(let i = 0; i < n; i++)
            mSols.push(a + m*i);
        return mSols;
    }

}