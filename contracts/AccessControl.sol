// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract AccessControl {
    //berisi role
    enum Role {admin, member}
    mapping (address => Role) public authority;
    event roleCheck (address _add, Role _addRole);
// Fungsi menjadi admin
    constructor () {
    authority[msg.sender] = Role.admin;
}
    //Fungsi admin bisa menambah atau menghapus admin lain
    function addAdmin (address _newAdmin) public onlyAdmin {
        authority[_newAdmin] = Role.admin;
    }

    //Fungsi untuk memeriksa apakah sebuah alamat memiliki peran tertentu.
    function checkRole(address _add) public {
        emit roleCheck(_add, authority[_add]);
    }

    //Fungsi menambah member
    function addMemberOrOutAdmin(address _add) public onlyAdmin {
        authority[_add] = Role.member;
    }

    //Fungsi untuk membatasi akses fitur tertentu hanya untuk admin
    modifier onlyAdmin() {
        require(authority[msg.sender] == Role.admin, "kamu bukan atmin");
        _;
    } 
}


