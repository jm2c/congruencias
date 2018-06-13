/**
 * Resuelve un sistema de multiples congruencias
 */
function sistemaCongruencias(ecs:EcuacionCongruencias[]):EcuacionCongruencias{
    if(ecs.length < 2) throw 'Debe haber al menos dos ecuaciones';
    let sol:EcuacionCongruencias = ecs[0];
    for(let i = 1; i < ecs.length; i++){
        sol = sistemaCongruencias2(sol, ecs[i]);
    }
    return sol;
}

/**
 * Resuelve un sistema de 2 congruencias
 * Recibe dos EcuacionCongruencia
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

