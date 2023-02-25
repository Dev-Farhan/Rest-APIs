import "../model/connection.js"
import UserSchemaModel from "../model/userSchema..model.js"
import url from "url";
import jwt from "jsonwebtoken"
import rs from "randomstring"

export var updateUser=async(request,response,next)=>{
    let userDetails = await UserSchemaModel.findOne({_id: request.body._id});
    // console.log(userDetails)
    if(userDetails){
       let id = request.body._id;
    //    console.log(id)
       delete request.body._id;
       let user=await UserSchemaModel.updateOne({_id: id},{$set: request.body});   
       if(user)
        return response.status(201).json({user});
       else
        return response.status(500).json({error: "Server Error"});
    }
    else
     return response.status(404).json({error: "Requested resource not available"});
  }
export var save = async (req,res,next)=>{
 let userDetails=req.body;
 let userList = await UserSchemaModel.find();
 let l = userList.length;
  let _id=l==0?l:userList[l-1]._id+1;
//   console.log(_id)
 userDetails={...userDetails,"_id":_id,"status":0,"role":"user","info":Date()};
//  console.log(userDetails);
let user = await UserSchemaModel.create(userDetails);
if(user)
return res.status(201).json({"result":"User Register sucessfully"});
else
return res.status(500).json({"error":"Server Error"});
};

export var fetch = async(req,res,next)=>{
let condition_obj = url.parse(req.url,true).query;
// console.log(condition_obj)
let userList =await UserSchemaModel.find(condition_obj);
var l=userList.length;
if(l!=0)
return res.status(201).json(userList)
else
return res.status(500).json({"result":"Server Error"});
}

export  var deleteUser = async (req,res,next)=>{
let id =req.params.id;
let user =await UserSchemaModel.find({_id: id});
if(user.length!=0)
{
    let result = await UserSchemaModel.deleteMany({_id:id});
    if(result)
    return res.status(201).json({"msg":"success"})
    else
    return res.status(500).json({"msg":"error"})
}
else
return res.status(404).json({error:"Not Found"})
}

export var login =async(req,res,next)=>{
    var userDetails=req.body;
    userDetails = {...userDetails,"status":1}
    let userList = await UserSchemaModel.find(userDetails);
    let l = userList.length;
    if(l!=0)
    {
        let payload={"subject":userList[0].email};
        let key=rs.generate(10);
        // console.log(key)
         let token=jwt.sign(payload,key)
        return res.status(201).json({"token":token,"userDetails":userList[0]});
    }
    else{
        return res.status(501).json({"token":"Error"});
    }
}
