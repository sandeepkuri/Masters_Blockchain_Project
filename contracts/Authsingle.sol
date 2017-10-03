pragma solidity ^0.4.5;
//First Contract //
contract Authsingle  {
//Data Structure//
string[] Username;
bytes32[] password;

      //Signup//
function signup(string uname, string pwd) returns (string ab)
    {
        string memory flag = "fal";
        var flag1 = flag;
        for ( uint i =0; i< Username.length; i++)
        {
            string memory uoriginal = Username[i];
            string memory ucheck = uname;
            if (sha3(ucheck) == sha3(uoriginal))
            {
                flag = "tru";
            }
        }
        string memory checker = "fal";
        var checker1 = checker;
        if (sha3(flag) == sha3(checker))
        { 
            Username.push(uname);
            password.push(sha3(pwd));
            return ("successful");
        }
        else 
        {
            return ("unsuccessful");
        }
    }
      //Login//
function login(string uname, string pwd) constant returns( string ab )
{
    for ( uint i =0; i< Username.length; i++)
        {
        var u = Username[i];
        var u2 = uname;
        if (sha3(u) ==sha3(u2))

           {
                var p = password[i];
                var p2 = pwd;
                if (sha3(p) ==sha3(sha3(p2)))
                    {
                        return ("successful");
                    }
                else
                    {
                        return ("unsuccessful");
                    }
            }
       
        }
       return ("User Doesn't Exsist");
}
      //Password update
function passwordupdate(string uname, string oldpwd, string newpwd) returns (string ab)
{
    uint ul = Username.length;
    for ( uint i =0; i< ul; i++)
        {
         string memory u = Username[i];
         string memory u2 = uname;
        if (sha3(u) == sha3(u2))
            {
                 var  p = password[i];
                  string memory p2 = oldpwd;
                  string memory p3 = newpwd;
                  if (sha3(sha3(p2)) == sha3(p))
                  {
                    password[i] = sha3(newpwd);
                   
                    return ("successful");
                  }
                  else
                  {
                       return ("unsuccessful");
                  }
            }
        
        }
        return ("User Doesn't Exsist");
}
}

