var bigInt = require("big-integer");
var DATA_SIZE = 128;
var GAMMA = 2048*3;
var ETA = 2048;
var RHO = 896;
var LAMDA = 640;
var GEN = 256;
var PRIME_CERTAINTY = 100;

var lamda = bigInt.one.shiftLeft(LAMDA).add(bigInt.one);
var sk;
var eZero;
var gen;
var prime;


exports.printMsg = function() {
    console.log("This is a message from the crypto package");
}
exports.testBigInt = function(){
    console.log('########################################################################################');
    console.log("\n [get bigint add 59+11] \n",bigInt(59).add(bigInt(11)));
}
exports.testBigInt2 = function(){
    console.log('########################################################################################');
    console.log("\n [get lamda] \n",lamda);
}
exports.testSKGenenerate = function(){
    console.log('\n[get sk] sk :',this.makeSecretKey().bitLength().toJSNumber(),'bit number, ');
}
exports.testGenerateZero = function(){
    console.log('\n[get eZero] eZero :',this.makeEncZero().bitLength().toJSNumber(),'bit number');
}
exports.getSK = function(){
    return sk;
}
exports.setSK = function(val){
    sk = val;
}
exports.makeSecretKey = function () {
    sk = this.randomBigIntWithBitLength(ETA);
    return sk;
}
exports.makeEncZero = function () {
    eZero = this.encrypt(bigInt.zero);
    return eZero;
}
exports.encrypt = function (bigint) {
    if(sk === null){
        return ;
    }
    // var gamma_minus_eta = GAMMA - ETA;
    var gamma_minus_eta = 3000 - ETA;
    var r1 = this.randomBigIntWithBitLength(gamma_minus_eta);
    var r2 = this.randomBigIntWithBitLength(RHO);
    var out = r1.multiply(sk).add(r2.multiply(lamda)).add(bigint);
    return out;
}
exports.randomBigIntWithBitLength = function (bitLen) {
    var a = bigInt(2);
    var base = bitLen-1;
    var pbase = bitLen;
    var genNum = bigInt.randBetween(a.pow(bigInt(base)), a.pow(bigInt(bigInt(pbase))));
    return genNum;
}