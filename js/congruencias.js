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
        var max = mcd2(a, n);
        this.coeficiente = a;
        this.independiente = b;
        this.modulo = n;
        this.sols = [];
        this.recalc();
    }
    EcuacionCongruencias.prototype.recalc = function () {
        var a = this.coeficiente;
        var b = this.independiente;
        var n = this.modulo;
        var max = mcd2(a, n);
        this.coeficiente /= max;
        this.independiente /= max;
        this.modulo /= max;
        this.sols = [];
        try {
            if (b % max != 0)
                throw "La ecuación no tiene solución";
            var t = inverso(a / max, n / max);
            for (var k = 0; k < max; k++) {
                this.sols.push(((b / max) * t + (n / max) * k) % n);
            }
            this.sols.sort(function (a, b) {
                return a - b;
            });
        }
        catch (error) {
            this.sols = [];
        }
    };
    EcuacionCongruencias.prototype.setModulo = function (m) {
        this.modulo = m;
        this.recalc();
    };
    Object.defineProperty(EcuacionCongruencias.prototype, "expresion", {
        get: function () {
            var b = this.independiente;
            var n = this.modulo;
            var max = mcd2(this.coeficiente, n);
            return "x = " + b / max + "t + " + n / max + "k";
        },
        enumerable: true,
        configurable: true
    });
    return EcuacionCongruencias;
}());
var EcuacionSimple = (function (_super) {
    __extends(EcuacionSimple, _super);
    function EcuacionSimple(a, n) {
        return _super.call(this, 1, a, n) || this;
    }
    Object.defineProperty(EcuacionSimple.prototype, "representante", {
        get: function () {
            var r = this.sols[0];
            this.independiente = r < 0 ? this.modulo + r : r;
            return this.independiente;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EcuacionSimple.prototype, "expresion", {
        get: function () {
            var b = this.representante;
            var n = this.modulo;
            var max = mcd2(this.coeficiente, n);
            return "x = " + (b / max) % this.modulo + " + " + n / max + "k";
        },
        enumerable: true,
        configurable: true
    });
    EcuacionSimple.prototype.masSoluciones = function (n) {
        var mSols = [];
        var a = this.representante;
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
    var m = arguments[0];
    for (var i = 1; i < arguments.length; i++)
        m = mcm2(m, arguments[i]);
    return m;
}
function mcm2(a, b) {
    return (a * b) / mcd2(a, b);
}
