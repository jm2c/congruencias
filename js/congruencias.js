"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EcuacionCongruencias = (function () {
    function EcuacionCongruencias(a, b, n) {
        a = a || 1;
        if (!b || !n)
            throw 'Argumentos inválidos';
        if (!esEntero(a) || !esEntero(b) || !esEntero(n))
            throw 'Argumentos inválidos';
        this.coeficiente = a;
        this.independiente = b;
        this.modulo = n;
    }
    EcuacionCongruencias.prototype.solve = function () {
        var a = this.coeficiente;
        var b = this.independiente;
        var n = this.modulo;
        var max = mcd2(a, n);
        var sols = [];
        var numSols = max;
        if (b % max != 0)
            throw "La ecuación no tiene solución";
        if (a % max == 0 && b % max == 0 && n % max == 0) {
            a /= max;
            b /= max;
            n /= max;
            max = mcd2(a, n);
        }
        var t = inverso(a / max, n / max);
        for (var k = 0; k < numSols; k++) {
            sols.push(((b / max) * t + (n / max) * k) % this.modulo);
        }
        sols.sort(function (a, b) { return a - b; });
        return sols;
    };
    EcuacionCongruencias.prototype.setCoeficiente = function (a) {
        this.coeficiente = a;
    };
    EcuacionCongruencias.prototype.setIndependiente = function (b) {
        this.independiente = b;
    };
    EcuacionCongruencias.prototype.setModulo = function (m) {
        this.modulo = m;
    };
    EcuacionCongruencias.prototype.expresion = function (tex) {
        var a = this.coeficiente;
        var b = this.independiente;
        var m = this.modulo;
        return tex ?
            "\\[" + a + "x\\equiv " + b + "\\ (mod\\ " + m + ")\\]" :
            a + "<i>x</i> &equiv; " + b + " (<i>mod</i> " + m + ")";
    };
    return EcuacionCongruencias;
}());
var EcuacionSimple = (function (_super) {
    __extends(EcuacionSimple, _super);
    function EcuacionSimple(b, n) {
        return _super.call(this, 1, b, n) || this;
    }
    EcuacionSimple.prototype.representante = function () {
        var r = _super.prototype.solve.call(this)[0];
        return r >= 0 ? r : r + this.modulo;
    };
    EcuacionSimple.prototype.expresion = function (tex) {
        var b = this.representante();
        var n = this.modulo;
        return tex ?
            "\\[x\\equiv " + b + "(mod\\ " + n + ")\\]" :
            "<i>x</i> &equiv; " + b + " (<i>mod</i> " + n + ")";
    };
    EcuacionSimple.prototype.solExpresion = function (tex) {
        var b = this.representante();
        var n = this.modulo;
        return tex ?
            "\\[x=" + b + "+" + n + "z\\]" :
            "<i>x</i> = " + b + " + " + n + "<i>z</i>";
    };
    EcuacionSimple.prototype.masSoluciones = function (n) {
        var mSols = [];
        var a = this.representante();
        var m = this.modulo;
        for (var i = 0; i < n; i++)
            mSols.push(a + m * i);
        return mSols;
    };
    return EcuacionSimple;
}(EcuacionCongruencias));
function sistemaCongruencias(ecs) {
    if (ecs.length < 2)
        throw 'Debe haber al menos dos ecuaciones';
    var sol = ecs[0];
    for (var i = 1; i < ecs.length; i++) {
        sol = sistemaCongruencias2(sol, ecs[i]);
    }
    return sol;
}
function sistemaCongruencias2(ec1, ec2) {
    var a = ec1.coeficiente;
    var b = ec1.independiente;
    var m = ec1.modulo;
    var c = ec2.coeficiente;
    var d = ec2.independiente;
    var n = ec2.modulo;
    var max1 = mcd2(a, m);
    var max2 = mcd2(c, n);
    if (b % max1 != 0 || d % max2 != 0)
        throw 'El sistema no tiene solución';
    var t = inverso(a / max1, m / max1);
    var u = inverso(c / max2, n / max2);
    var ecSol1 = new EcuacionSimple(t * (b / max1), m / max1);
    var ecSol2 = new EcuacionSimple(u * (d / max2), n / max2);
    return sistemaSimple(ecSol1, ecSol2);
}
function sistemaSimple(ec1, ec2) {
    var a = ec1.independiente;
    var m = ec1.modulo;
    var b = ec2.independiente;
    var n = ec2.modulo;
    var max = mcd2(m, n);
    if ((b - a) % max != 0)
        throw 'El sistema no tiene solución';
    var t = inverso(m / max, n / max);
    var coeficiente = a + m * t * (b - a) / max;
    var modulo = mcm2(m, n);
    return new EcuacionSimple(coeficiente, modulo);
}
function mcd() {
    if (arguments.length < 2)
        throw 'Debes dar por lo menos dos números enteros positivos';
    var max = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        max = mcd2(max, arguments[i]);
    }
    return max;
}
function mcd2(a, b) {
    return b == 0 ? a : mcd2(b, a % b);
}
function mcm() {
    if (arguments.length < 2)
        throw 'Debes dar por lo menos dos números enteros positivos';
    var m = arguments[0];
    for (var i = 1; i < arguments.length; i++)
        m = mcm2(m, arguments[i]);
    return m;
}
function mcm2(a, b) {
    return (a * b) / mcd2(a, b);
}
function inverso(a, n) {
    if (mcd2(a, n) != 1)
        throw "No tiene inverso";
    var inv = 0;
    for (var i = 1; i <= n; i++) {
        if ((a * i) % n == 1) {
            inv = i;
            break;
        }
    }
    return inv;
}
function esEntero(n) {
    var m = parseInt(n);
    return (m == n && n % 1 == 0);
}
