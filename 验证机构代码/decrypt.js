//解密验证

const fs = require("fs");
const ethers = require('ethers');
let accountAddress = "0x97cDD303dc9EB548aba7fc429735891FcA46fda3";
console.log('账户地址:', accountAddress);

var data = fs.readFileSync('./signature/cert_bxy.json', 'utf8');
let json = JSON.parse(data);
// console.log("data",data)
// console.log(json)
console.log("交易哈希:",json.transaction_hash);
console.log("合约签名:",json.signature);


let hash = json.transaction_hash;
let binaryData = ethers.utils.arrayify(hash);

let signature=json.signature;

    let signingAddress = ethers.utils.verifyMessage(binaryData, signature);
    console.log('签名人：', signingAddress);
    if (accountAddress === signingAddress) {
        console.log('验证成功，是教育厅签署后的教育证书！！！')
    } else {
        console.log('验证失败，非公认机构发布证书！！！')
    }


