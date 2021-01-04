console.log("Hello")
let accounts = [];

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}

console.log("isMetaMask:" + ethereum.isMetaMask)

$(".enableEthereumButton").click(function () {
    getAccount()
}
)

async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    $(".showAccount").html(account);

}

ethereum.on('accountsChanged', function (accounts) {
    console.log("accountsChanged");
    getAccount()
});

ethereum.on('chainChanged', (chainId) => {
    console.log("chainId ", chainId);
});

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
console.log("web3", web3)

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


const certmain_address = '0xf056c3EeC006EecDF209449ad351a9AbC587b034'
const Recipient_address = '0x5739Dd0b6554A34CBa33CE8bf10f57ECE1608884'
const certmain_contract = new web3.eth.Contract(certmain_abi, certmain_address)


$(".submit").click(function () {
    $("#load_ci_img").show();

    let name = $("#prodid").val()
    let nric = $("#nric").val()
    let course = $("#course").val()
    let studentId = $("#studentId").val()
    let transcript = $("#transcript").val()

    certmain_contract.methods.setRecipient(Recipient_address).send({ from: accounts[0] }).then(function (result1) {
        certmain_contract.methods.addJieShouRen(name, nric, course, studentId, transcript).send({ from: accounts[0] }).then(function (result2) {
            console.log("主合约连接副合约==>", result1);
            console.log("向副合约添加信息==>", result2);
            if (result1.status && result2.status) {
                $(".txt_CreatItem").html("信息上链成功")
                // 写入证书
                const schema = "opencerts/v2.0";
                const deploy = Recipient_address;
                const transaction_hash = result2.transactionHash;
                const data = { recipient: { name: name, nric: nric, course: course, studentId: studentId, transcript: transcript } }

                var content, btn;
                content = document.querySelector("#content");
                btn = document.querySelector("#save-btn");
                content.addEventListener("change", function () {
                    var f = function () {
                        btn.setAttribute("href", "data:text/paint; utf-8," + JSON.stringify({ schema, deploy, transaction_hash, data }));
                    }
                    return f(), f;
                }());
                $("#save-btn").show();


                let _txt = result2.transactionHash
                contract.methods.CreatItem(_txt).send({ from: accounts[0], value: 0.02 * Math.pow(10, 18) }).then(
                    function (result) {
                        console.log("result", result);
                        if (result.status) {
                            $(".txt_CreatItem").html("文件地址绑定钱包成功")
                            getBalance();
                            // window.location.href = "http://127.0.0.1:5502/%E5%90%84%E9%AB%98%E6%A0%A1%E4%BB%A3%E7%A0%81/%E4%B8%BB%E9%A1%B5.html";

                        } else {
                            hide
                            $(".txt_CreatItem").html("文件地址绑定钱包失败")
                        }
                        // $("#load_ci_img").hide();
                    }
                )
            } else {
                hide
                $(".txt_CreatItem").html("信息上链失败")
            }
            $("#load_ci_img").hide();

        })
    })

}
)



async function getProdID(_index) {
    contract.methods.getProdId(_index).call({ from: accounts[0] }).then(
        function (result) {
            console.log("getProdID", result)
            $("#pitem" + _index).html(result.r_token);
            $("#tokenIndex" + _index).html(result.r_index);

        }
    );

}


async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    // showAccount.innerHTML = account;
    $(".showAccount").html(account);
    getBalance();
    ErcAddress();
}


async function ErcAddress() {
    contract.methods.ErcAddress().call({ from: accounts[0] }).then(
        function (result) {
            console.log("ErcAddress==》", result)
            $(".ErcAddress").html(result)
        }
    )
}


function getBalance() {
    contract.methods.getUserBalance(accounts[0]).call({ from: accounts[0] }).then(
        function (result) {
            $('#box').children().remove();
            console.log('getUserBalance', result)
            $("#MyBalance").html(result)
            for (var i = 0; i < result; i++) {
                console.log(i + "========================")
                // var el = $('<h4>证书地址:<span id="pitem' + i + '">-- </span>#<span id="tokenIndex' + i + '"></span>' + '<br>现将证书授权于Address:<input id="s_address' + i + '" value="" /><button id="Btn_send' + i + '"  onClick="sendBtn(' + i + ')">发送</button></h4>');
                var el = $('<div>证书地址:<span id="pitem' + i + '">-- </span>#<span id="tokenIndex' + i + '"></span>' + '|接收人Address:<input id="s_address' + i + '" value="" /><button id="Btn_send' + i + '"  onClick="sendBtn(' + i + ')">发送</button></div>');
                
                getProdID(i);
                $('#box').append(el);
            }

        }
    );
}


function sendBtn(i) {
    _address = $('#s_address' + i).val();
    p_index = $('#tokenIndex' + i).html();
    alert('send' + i + "#" + _address + "#" + p_index);
    // transferProd
    getErc721($(".ErcAddress").html());
    contractERC721.methods.transferFrom(accounts[0], _address, p_index).send({ from: accounts[0] }).then(
        function (result) {
            console.log("transferProd==>", result);
            if (result.status) {
                $(".txt_CreatItem").html("添加成功")
                getBalance();
            } else {
                hide
                $(".txt_CreatItem").html("添加失败")
            }
            $("#load_ci_img").hide();
        }
    )

}


ethereum.on('accountsChanged', function (accounts) {
    console.log("accountsChanged");
    getAccount()
});

ethereum.on('chainChanged', (chainId) => {
    console.log("chainId", chainId);

});



var contractERC712Abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
            }
        ],
        "name": "awardItem",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "baseURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];


var contractERC721;

function getErc721(conAddress) {
    contractERC721 = new web3.eth.Contract(contractERC712Abi, conAddress);
    console.log('contractERC721==>', contractERC721);
}

// MyApp.sol abi
var contractAbi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "AllItems",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_prodid",
                "type": "string"
            }
        ],
        "name": "CreatItem",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_prodid",
                "type": "string"
            }
        ],
        "name": "CreatItem2Contract",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ErcAddress",
        "outputs": [
            {
                "internalType": "contract GameItem",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "UserProdMap",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "drawMoney",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_Index",
                "type": "uint256"
            }
        ],
        "name": "getProdId",
        "outputs": [
            {
                "internalType": "string",
                "name": "r_token",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "r_index",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTotalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getUserBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            }
        ],
        "name": "setPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// 0x0b23c2e1e574B301FdB2b36f7Cdeac31A8DC2893  本地
//0x7a9901a9667297b5744cC1fb3CFf075d76db95d3 rinkeby
var contract = new web3.eth.Contract(contractAbi, "0x52D64956cf1B513Df13A24947baEBe78BD458ca8");

console.log("contract", contract)





$("#Btn_getTotalSupply").click(function () {
    console.log("Btn_getTotalSupply");
    contract.methods.getTotalSupply().call({ from: accounts[0] }).then(
        function (result) {
            console.log(result)
            $(".txt_getTotalSupply").html(result)
        }
    );

}
)


// 

$("#Btn_getErc721").click(function () {
    console.log("Btn_getErc721");
    getErc721($(".ErcAddress").html())
}
)


