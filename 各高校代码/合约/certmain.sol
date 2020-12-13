//SPDX-License-Identifier: BXY
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
import "./Recipient.sol";

contract certmain{
    Recipient _recipient;
 
    struct JieShouRen {
        string name; //学生姓名  
        string nric; //学生身份证号 
        string course; //学生专业 
        string studentId; //学生号 
        string transcript; //学生成绩
    }
    

    function setRecipient(Recipient addr) public {
        _recipient = addr;
    }

    function addJieShouRen(string memory _name,string memory _nric,string memory _course,string memory _studentId,string memory _transcript) public {
       return _recipient.addJieShouRen(_name,_nric,_course,_studentId,_transcript);
    }
}