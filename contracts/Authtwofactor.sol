pragma solidity ^0.4.5;
				//Second Contract//
contract Authtwofactor  {
				//Data Structure//
    string[] Username;
    bytes32[] password; 
    bytes32[] otp;
   
                //Signup//
    function signup(string uname, string pwd )returns (string ab)
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
            otp.push(sha3("1111"));
            return ("successful");
        }
        else 
        {
            return ("unsuccessful");
        }
    }
                //Login//
    function login(string uname, string pwd) constant returns( string ab)
    {
        for ( uint i =0; i< Username.length; i++)
        {
            var u = Username[i];
            var u2 = uname;
            if (sha3(u) == sha3(u2)) 
            {
                var p = password[i];
                var p2 = pwd;
                if (sha3(p) == sha3(sha3(p2)))
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
                    //store otp//
    function otpstore(string uname, string rng) returns (bool)          
    {
        for ( uint i =0; i< Username.length; i++)
        {
            var u = Username[i];
            var u2 = uname;
            var o1 = rng;
            if (sha3(u) == sha3(u2)) 
            {
                otp[i] = sha3(o1);
                return true;
            }
        }   
    }
              //Compare otp//
function otpcompare(string uname, string uotp) constant returns( string ab)
{
    for ( uint i =0; i< Username.length; i++)
        {
        var u = Username[i];
        var u2 = uname;
        if (sha3(u) == sha3(u2))
            {
                var o = otp[i];
                var o2 = uotp;
                if (sha3(o) == sha3(sha3(o2)))
                    {
                        return ("successful");
                    }
                else
                    {
                        return ("OTP is incorrect");
                    }
            }
        }
        return ("User Doesn't Exsist");
}
              
              
                //Password update
    function passwordupdate(string uname, string oldpwd, string newpwd) returns( string ab)
   {
        for ( uint i =0; i< Username.length; i++)
        {
            var u = Username[i];
            var u2 = uname;
            if (sha3(u) == sha3(u2)) 
            {
                var p = password[i];
                var p2 = oldpwd;
                var p3 = newpwd;
                if (sha3(p) == sha3(sha3(p2)))
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
