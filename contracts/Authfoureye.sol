pragma solidity ^0.4.5;
//Contract name//
contract Authfoureye  {
//Data Structure//
string[] Username1;
bytes32[] password1;
string[] Username2;
bytes32[] password2;

      //Signup first user//
function signup(string uname1, string pwd1, string uname2, string pwd2) returns (string ab)
    {
        var ucheck = uname1;
        string memory flag = "F";
        for ( uint i =0; i< Username1.length; i++)
        {
            var uoriginal = Username1[i];
            if (sha3(ucheck) ==sha3(uoriginal))
            {
                flag = "T";
            }
        }
        var f2 = flag;
        string memory checker = "F";
        var checker2 = checker;
        if (sha3(f2) == sha3(checker2))
        {
            Username1.push(uname1);
            password1.push(sha3(pwd1));
            Username2.push(uname2);
            password2.push(sha3(pwd2));
             return ("successful");
        }
        else
        {
             return ("unsuccessful");
        }
    }
      //Login//
function login(string uname1, string pwd1, string uname2, string pwd2) constant returns( string ab )
{
    for ( uint i =0; i< Username1.length; i++)
        {
        var u1 = Username1[i];
        var u21 = uname1;
        if (sha3(u1) == sha3(u21))
            {
                var p1 = password1[i];
                var p21 = pwd1;
                if (sha3(p1) == sha3(sha3(p21)))
                    {
                        for ( uint j =0; j< Username2.length; j++)
                            {
                            var u2 = Username2[j];
                            var u22 = uname2;
                            if (sha3(u2) == (sha3(u22)))
                                {
                                    var p2 = password2[j];
                                    var p22 = pwd2;
                                    if (sha3(p2) == sha3(sha3(p22)))
                                        {
                                            return ("successful");
                                        }
                                }
                            }
                    }

                
                  
            }
        }
          {
                        return ("unsuccessful");
                    }
}
      //Password update
function passwordupdate(string uname, string oldpwd, string newpwd) returns( string ab )
{
    var u2 = uname;
    var p3 = newpwd;
    var p2 = oldpwd;
    for ( uint i =0; i< Username1.length; i++)
    {
        var u = Username1[i];
        if (sha3(u) == (sha3(u2)))
        {
            var p = password1[i];
            if (sha3(p) == sha3(sha3(p2)))
                {
                    password1[i] = sha3(newpwd);
                      return ("successful");
                }
        }
    }
    for ( uint z =0; z< Username2.length; z++)
    {
        var uz = Username2[z];
        if (sha3(uz) == (sha3(u2)))
        {
            var pz = password2[z];
            if (sha3(pz) == sha3(sha3(p2)))
            {
                password2[z] = sha3(newpwd);
               return ("successful");
            }
        }
    }
    return ("unsuccessful");
}

}

