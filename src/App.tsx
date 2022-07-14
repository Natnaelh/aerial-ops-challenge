import React, { useEffect, useState } from 'react';
import './App.css';
import useWindowDimensions from './components/useWindowDimensions';
import {Table , Group, Button, Stack, Modal, Loader ,ScrollArea, Text } from '@mantine/core'
import { DoubleArrowRightIcon, ReaderIcon } from '@radix-ui/react-icons';
import data from "./mockData";

// const tb = document.getElementById('table')! as HTMLTableElement
function App() {
  const [opened, setOpened] = useState(false);
  const [documentMenu , showDcoumentsMenu] = useState([])
  const {width , height}  = useWindowDimensions()
  const [tableBody, setTableBody] = useState(document.getElementById('table')! as HTMLTableElement) 
  const handleDisplayVertically=(documents:any)=>{
    // console.log(documents)
    showDcoumentsMenu(documents);
    setOpened(true);

  }
  // console.log({height, width})
  useEffect(()=>{
    const tableBody = document.getElementById('table') ! as HTMLTableElement
    setTableBody(tableBody)
    // console.log(tableBody.rows[])
    // for(let i:number= 1 ; i < tableBody.rows.length; i++){
    //         // console.log(`${i}th row`,tableBody.rows[i].offsetHeight)
    //         // setHeightValue(tableBody.rows[i].offsetHeight)
    // }
    // console.log(tb?.rows[1].offsetHeight)
    // console.log(tableBody.rows[2].offsetHeight)
  },[width])

  const rows = data.map((items,index) => (
    <tr  key={items.id} style={{maxHeight:'40px'}}>
      <td  align='left'><Text>{items.salary}</Text></td>
      <td  align='left'>
        <div  style={{display:'inline-flex', alignItems:'center' , margin:'3px 0'}}>
        {/* <div> */}
        <Button color="dark" style={{  position:'absolute', visibility:tableBody?.rows[items.id].offsetHeight > 60 ? "visible":"hidden"}}
          onClick={()=>handleDisplayVertically(items.documents)}>Documents <DoubleArrowRightIcon style={{marginLeft:'5'}}/>
        </Button>
        {/* </div> */}

        <Group style={{ maxHeight:"60px", overflow:'hiddtelen', visibility:tableBody?.rows[items.id].offsetHeight > 60 ? "hidden":"visible"}}> 
        {items.documents.map((docs,index)=>{
        return (<div key={index}  
          style={{ backgroundColor:'#f8f9fa', cursor:'pointer',
            borderRadius:5, color:'blue', alignItems:'center', fontWeight:'bold'}}>
            <Text style={{flexWrap:'nowrap'}}><ReaderIcon color='black'/> {items.documents[index]}</Text>
            </div>)}
        )}
        </Group>
        </div>
      </td>
    </tr>
  ));

  const ths = (
    <tr style={{fontWeight:'bold'}}>
      <th><Text>Salary</Text> </th>
      <th><Text>Documents</Text></th>
    </tr>
    );
  return (
    <div className="App">
      <h1>Hello Aerial Ops</h1>
      <Table  id='table' 
         style={{ border:'solid 2px gray'}}>
        <thead>{ths}</thead>
        <tbody >{rows}</tbody>
      </Table>

      <Modal opened={opened} onClose={()=>setOpened(false)}>
        <ScrollArea >
        <Stack  align="flex-start" 
         sx={(theme) => ({ fontWeight:'bold' , height: 150})}>
          {documentMenu.length > 0 ? documentMenu.map((docs,index)=>{
            return (<Text key={index} sx={(theme)=>({ cursor:'pointer', color:'blue',backgroundColor: theme.colors.gray[0]})}>
                   <ReaderIcon color='black'/> {docs}
                   </Text>)
          }): <Loader />}
        </Stack>
        </ScrollArea>
      </Modal>
    </div>


  );
}


export default App;
