const express = require('express')
const app = express()
const path = require("path");
let Web3 = require('web3')
let url_geth = 'ws://127.0.0.1:8546'
let web3 = new Web3(url_geth)


// 部署
var certmain_abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_nric",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_course",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_studentId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_transcript",
				"type": "string"
			}
		],
		"name": "addJieShouRen",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract Recipient",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "setRecipient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const certmain_address = '0xBdB7cbAEefD6838a9F903423aA6F18ff910777E7'
const certmain_contract = new web3.eth.Contract(certmain_abi, certmain_address)

const Recipient_address = '0x7a17a0F3Fe7A87a873d30A4F6Fd4D07Fb28b0a5F'
const My_address = '0x97cDD303dc9EB548aba7fc429735891FcA46fda3'

app.get('/submit', function (req, res) {


	const name = req.query.name
	const nric = req.query.nric
	const course = req.query.course
	const studentId = req.query.studentId
	const transcript = req.query.transcript


	certmain_contract.methods.setRecipient(Recipient_address).send({ from: My_address }, (error, result) => {
		certmain_contract.methods.addJieShouRen(name, nric, course, studentId, transcript).send({ from: My_address }, (error, result) => {
			if (!error) {
				console.log('回执1:', result)
			
	const fs = require("fs");

	const schema = "opencerts/v2.0";
	const deploy = Recipient_address;
	const transaction_hash  = result;
	const data = {recipient:{name: name, nric: nric, course: course, studentId: studentId, transcript: transcript}  }

	fs.writeFile('./upload/cert_' + name + '.json', JSON.stringify({ schema, deploy, transaction_hash, data }), 'utf8', function (error) {
		if (error) {
			console.log(error);
			return false;
		}
		console.log('写入成功');
	})

	res.render('submit.ejs', {
		msg: { code: "00", txt: "信息上链成功，交易哈希为：" + result +
		"，并且生成的教育证书文件已保存在upload目录下" }

	});
}

})

})
})
app.use(express.static(path.join(__dirname, "public")));

app.listen(1113)

app.get("/submit3", (req, res, next) => {
	res.render("submit.ejs")
});

app.get("/upload", (req, res, next) => {
	res.render("upload.ejs")
});








