import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Group from "./components/Group";
import { BsFilePlusFill,BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

function App() {
  const [groups,setGroups]=useState([{name:"Group",id:1,from:1,to:10}]);
  const [todos,setTodos]=useState([]);
  const [status,setStatus]=useState(false);
  const [errorStatus,setErrorStatus]=useState({show:false,message:""})
  const handleGroupAdd=()=>{
    console.log("clicked");
    const groupNo=groups.length+1;
    const groupName="Group";
    setGroups([...groups,{name:groupName,id:groupNo,from:null,to:null}]);
  }
  const removeGroup=(index)=>{
const groupArr=[...groups];
groupArr.splice(index,1);
groupArr[0].from=1;
groupArr[0].to=10;
setGroups(groupArr);
  }


  const handleSetFrom=(val,index)=>{
const checkTo=groups[index-1].to;
console.log("checkTo",parseInt(checkTo)+1,val);

if(parseInt(checkTo)!==10){

  console.log("check")
  if(parseInt(val)===parseInt(checkTo)+1){

    const ngroupVal=groups[index];
    ngroupVal.from=val;
   
console.log("ngroupValue",ngroupVal,groups[index]);
  }//val===parseInt(checkTo)+1
  else{
console.log("ngroupVal error1");

    setErrorStatus({show:true,message:"Gap is not allowed"});
  }// else val===parseInt(checkTo)+1
  
} 
//checkTo!==10
else{
  setErrorStatus({show:true,message:"Maximum 10 Todos allowed only in all group"});
}
  
}
  
  const handleSetTo=(val,index)=>{
    const ngroupVal=groups[index];
    if(groups.length>1){
      console.log("check length & index",groups.length,index);
      if(groups.length>index+1){
        const checkFrom=groups[index+1].from;
      console.log("checkFrom",parseInt(checkFrom)+1,val);
      if(checkFrom!=null){
        
      if(val===parseInt(checkFrom)-1){
        ngroupVal.from=val;
       
    console.log("ngroupValue",ngroupVal);
      }//val===parseInt(checkFrom)-1
      else{
    console.log("ngroupVal error1");
    
        setErrorStatus({show:true,message:"Gap is not allowed"})
      }// else val===parseInt(checkFrom)-1
      } // checkFrom!=null
      else{
        if(val>8){
setErrorStatus({show:true,message:"Gap is maintained for next group."})
        }//val>8
        else{
          ngroupVal.to=val;
        } // else val>8
      } //checkfrom null
    }//groups.length>index+1
    else
    {
      //groups.length>index+1
      if(parseInt(val)===10){
        ngroupVal.to=val;
       
    console.log("ngroupVal",ngroupVal);
      }
      else{
    console.log("ngroupVal error");
    
        setErrorStatus({show:true,message:"Value can not be less than 10 or more than 10"})
      }
    }//groups.length>index+1
      }//groups length>1
      else{
        console.log("groups length=1",val);
        if(parseInt(val)===10){
          ngroupVal.to=val;
         
      console.log("ngroupVal",ngroupVal);
        }
        else{
      console.log("ngroupVal error");
      
          setErrorStatus({show:true,message:"Value can not be less than 10 or more than 10"})
        }
      }
    }
  const handleShowStatus=()=>{
    setStatus(true);
  }
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/todos/')
    .then(response => {
        // Handle response
        console.log("api response",response.data);
        const data=response.data.slice(0,10);
        console.log("sliced data",data);
        setTodos(data);
    })
    .catch(err => {
        // Handle errors
        console.error(err);
    });
  },[])
const closeAlert=()=>{
  setErrorStatus({show:false,message:""})
}
  return (
    <>
    <Container>
      <Row>
        {
          errorStatus.show?(
            <Alert variant="danger" onClose={closeAlert} dismissible>
              <Alert.Heading>{errorStatus.message}</Alert.Heading>
              
            </Alert>):null
        }
      </Row>
      <Row>
        {groups.map((item,index)=>{return (<>
    <Stack direction="horizontal" gap={3}><button style={{border:"none",background:"none"}} disabled={groups.length>1?false:true} onClick={()=>removeGroup({index})} ><BsFillTrashFill /></button> <Group keys={index} name={item} handleSetFrom={handleSetFrom} handleSetTo={handleSetTo} todos={todos} status={status} /></Stack></>)})}

    
        <Button variant="primary" style={{border:"none",background:"none",color:"blue"}} disabled={groups.length>1?true:false} onClick={handleGroupAdd}><BsFilePlusFill />Add Group</Button>
        <Button variant="primary" onClick={handleShowStatus}>Show Status</Button>
    </Row>
    </Container>
    </>
  );
}

export default App;
