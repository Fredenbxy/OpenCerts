//加密签名

const ethers = require('ethers');
const fs = require("fs");
// 账号0x97cDD303dc9EB548aba7fc429735891FcA46fda3 
let privateKey = "0xaaxxx4cb7e8eb629879"; //私钥
let wallet = new ethers.Wallet(privateKey);
// console.log('wallet=>', wallet);
let accountAddress = wallet.address;
console.log('账户地址=>', accountAddress);
// fs.readFile
var data = fs.readFileSync('./cert_bxy.json', 'utf8');
let json = JSON.parse(data);
// console.log("data",data)
console.log(json)
console.log("交易哈希:",json.transaction_hash);

let hash = json.transaction_hash;
let binaryData = ethers.utils.arrayify(hash);
let signPromise = wallet.signMessage(binaryData)

signPromise.then((signature) => {

    console.log('签署结果:', signature);

    let sig = ethers.utils.splitSignature(signature);
    console.log('展开:', sig);

	//插入签名
	var j =json;  
	j.signature=signature
	// console.log(j)


    fs.writeFile('./signature/cert_' + json.data.recipient.name + '.json', JSON.stringify(j), 'utf8', function (error) {
		if (error) {
			console.log(error);
			return false;
		}
		console.log('写入成功');
	})


});


