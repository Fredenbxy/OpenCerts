// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./GameItem.sol";

contract owned {
    address payable owner;

    // Contract constructor: set owner
    constructor() public {
        owner = msg.sender;
    }

    // Access control modifier
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }
}

contract MyDapp is owned {
    GameItem private gi;
    uint256 private price;

    // struct ProudItem {
    //     string _proudid;
    // }

    mapping(address => string[]) public UserProdMap;
    string[] public AllItems;

    constructor() public {
        gi = new GameItem();

        price = 0.01 ether;
    }

    function setPrice(uint256 _price) public {
        price = _price;
    }

    function CreatItem(string memory _prodid) public payable {
        require(msg.value >= price, "at least 0.1 Eth");
        gi.awardItem(msg.sender, _prodid);

        AllItems.push(_prodid);
        string[] storage user_Prod;
        user_Prod = UserProdMap[msg.sender];
        user_Prod.push(_prodid);
        UserProdMap[msg.sender] = user_Prod;
    }

    function CreatItem2Contract(string memory _prodid) public payable {
        require(msg.value >= price, "at least 0.1 Eth");
        gi.awardItem(address(this), _prodid);

        AllItems.push(_prodid);
        string[] storage user_Prod;
        user_Prod = UserProdMap[msg.sender];
        user_Prod.push(_prodid);
        UserProdMap[msg.sender] = user_Prod;
    }

    function getTotalSupply() public view returns (uint256) {
        return gi.totalSupply();
    }

    function getUserBalance(address _user) public view returns (uint256) {
        return gi.balanceOf(_user);
    }

    function getProdId(uint256 _Index)
        public
        view
        returns (string memory r_token, uint256 r_index)
    {
        uint256 _token = gi.tokenOfOwnerByIndex(msg.sender, _Index);
        return (gi.tokenURI(_token), _token);
    }

    function ErcAddress() public view returns (GameItem) {
        return gi;
    }

    // 合约往账户转账
    function drawMoney(address _to, uint256 _value) public onlyOwner {
        address(uint160(_to)).transfer(_value);
        return;
    }

    // 得到合约里面的eth余额
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }



 

    //   function getLast10Item(address _to,string memory _proudid) public {

    //     uint256 totleitem = gi.totalSupply();
    //         for (uint i = 0; i < totleitem; i++) {
    //     }
    // }
}
