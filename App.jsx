import React from 'react'
import { useState } from 'react';
import './index.css'
const App = () => {
  const[input_data,setInput_data]=useState({
    name:'',
    age:'',
    department:'',
    salary:'',
    city:''
  });

  const[employe,setEmploye]=useState([]);
  const[display,setDisplay]=useState([]);
  const[editdata,setEditdata]=useState(null);

  const[search,setSearch]=useState('')

  function grasp(event){ 
  
    setInput_data({...input_data,[event.target.name]:event.target.value})
  
  }

  function show(){
    if(input_data.name=='' || input_data.age=='' || input_data.department=='' || input_data.salary=='' || input_data.city=='')
    {
      return alert('please enter the given details')
    }
    setDisplay([...display,input_data])
    setEmploye([...employe,input_data])
    alert('success')
    setInput_data({name:'',age:'',department:'',salary:'',city:''})
  }

  let filtered;
  function remov(p){
    filtered=display.filter((item,i)=>{
      return (p!=i)
    })
    setDisplay(filtered)
  
  }
  function sea(search){
    if (search==''){
      return setDisplay(employe)
    }
    else {const searched =display.filter((item)=>{
      return item.name==search
    })
  setDisplay(searched)}
    
  }  

  const s= display.reduce((acc,item)=>{
    return acc=acc+Number(item.salary)

  },0)

  function  edt(index){
    setEditdata({...display[index],editIndex:index})   //old object is displaying
  }

  function edtchange(event){
    setEditdata({...editdata,[event.target.name]:event.target.value})  //new object displaying

  }

  function update(){
    if(editdata){
      const updated=display.map((item,index)=>{
        if(index==editdata.editIndex){
          return editdata;
        }
        else{return item};
      })
      setDisplay(updated)
      setEditdata(null)
    }else{
      show()
    }
  }


  return (
    <div className='container'>
      <nav>
        <h1>EMPLOYE MANAGEMENT SYSTEM</h1>
        <h3>DASHBOARD</h3>

        <h3>EMPLOYEES</h3>
        <h3>REPORTS</h3>
      </nav>

      <div className='total'>

      <div className='emp'>
      {<h3 className='count'>{display.length}</h3>}
      {<h3>TOTAL EMPLOYEES</h3>}
      </div>

      <div className='sal'>
      {<h3 className='price'>{s}</h3>}
      {<h3>TOTAL SALARIES</h3>}
      </div>
    
    


      <div className='dep'>
        <h3 className='depar'>{display.length}</h3>
        <h3>TOTAL DEPARTMENT</h3>
      </div>
      </div>

      <div className='inputboxes'>
      <input type='text' placeholder='SEARCH EMPLOYEE BY NAME'onChange={(event)=>{const val=event.target.value.toLowerCase(); setSearch(val);if (val==''){setDisplay(employe)}}}/><br/>
      <button onClick={()=>sea(search)} className='sbtn'>search</button><br/><br/>
      <div class='inpts'>
      <input type='text' name='name' value={editdata? editdata.name:input_data.name} placeholder='ENTER EMPLOYEE NAME' onChange={editdata?edtchange:grasp} /><br/>
      <input type='text' name='age' value={editdata? editdata.age:input_data.age} placeholder='ENTER AGE'onChange={editdata?edtchange:grasp}/><br/>
      <input type='text' name='department' value={editdata? editdata.department:input_data.department} placeholder='ENTER DEPARTMENT' onChange={editdata?edtchange:grasp}/><br/>
      <input type='text' name='salary'value={editdata? editdata.salary:input_data.salary} placeholder='ENTER SALARY'onChange={editdata?edtchange:grasp}/><br/>
      <input type='text' name='city'value={editdata? editdata.city :input_data.city} placeholder='ENTER CITY' onChange={editdata?edtchange:grasp}/><br/>
      </div>
      <button onClick={update} className='sbtn'>{editdata?'update':'addemploye'}</button>
  </div>
      {
        <div className='table'>
        <table>
  
          <tr className='display'>
            <th>ID</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>DEPARTMENT</th>
            <th>SALARY</th>
            <th>CITY</th>
            <th>ACTION</th>
          </tr>
        
          {
             display&& display.map((item,index)=>{
              return <tr key={index}>

                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.department}</td>
                <td>{item.salary}</td>
                <td>{item.city}</td>


                <div class='tblbtncontainer'>
      
                <td><button onClick={()=>edt(index)} className='tbledit'>EDIT</button></td>
                <td><button onClick={()=>remov(index)} className='tbldelete'>DELETE</button></td>
                </div>
              </tr>
            })
          }
        </table>
        </div>
      
    
      }
      
    </div>
  )
}
export default App;