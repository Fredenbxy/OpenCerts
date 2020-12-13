//SPDX-License-Identifier: BXY
pragma solidity ^0.6.0;

contract Recipient {
    struct JieShouRen {
        string name; //学生姓名  
        string nric; //学生身份证号 
        string course; //学生专业 
        string studentId; //学生号 
        string transcript; //学生成绩单
    }
    JieShouRen[] public jsrlist;
    
    function addJieShouRen(string memory _name,string memory _nric,string memory _course,string memory _studentId,string memory _transcript) public {
        JieShouRen memory newjsr;
        newjsr.name = _name;
        newjsr.nric = _nric;
        newjsr.course = _course;
        newjsr.studentId = _studentId;
        newjsr.transcript = _transcript;
        jsrlist.push(newjsr);
    }
}