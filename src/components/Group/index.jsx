import React,{useState,useEffect} from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsArrowRight } from "react-icons/bs";
const Group=({keys,name,handleSetFrom,handleSetTo,status,todos})=>{
  const [from,setFrom]=useState("");
  const [to,setTo]=useState("");
  const [data,setData]=useState([]);
  console.log(name,keys)
  const groupNames=name.name+keys+1;
  const handleFromChange=(e)=>{
    setFrom(e.target.value);
    handleSetFrom(e.target.value,keys);
  }
  const handleToChange=(e)=>{
    setTo(e.target.value);
    handleSetTo(e.target.value,keys);

  }
  useEffect(()=>{
if(name.from && name.to){
  setFrom(name.from);
  setTo(name.to)
}
  },[name])
  useEffect(()=>{
if(status===true && name.from!==null && name.to!==null){
  const dataFrom=parseInt(name.from)-1;
  const dataTo=parseInt(name.to);
  const todosData=todos.slice(dataFrom,dataTo);
  setData(todosData);
}
  },[status,name.from,name.to]);
  console.log("data",data);
  
return(
<>
<InputGroup className="mb-3">
        <InputGroup.Text>{name.name} {keys+1}</InputGroup.Text>
        <Form.Control aria-label={name.from} value={from} onChange={handleFromChange} disabled={keys!=0?false:true} />
        <InputGroup.Text><BsArrowRight /></InputGroup.Text>
        <Form.Control aria-label={name.to} value={to} onChange={handleToChange}  />
      </InputGroup>
      <Form.Control
        type="text"
        aria-describedby="todos"
        value={data.length>0?(data.map(item=>`(${item.id}) ${item.completed}`)):("")
        }
      />
</>
)
}
export default Group;