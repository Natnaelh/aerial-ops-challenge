import React, { useEffect, useState } from 'react';
import './App.css';
import useWindowDimensions from './components/useWindowDimensions';
import {Table , Group, Button, Stack, Modal, Loader ,ScrollArea, Text } from '@mantine/core'
import { DoubleArrowRightIcon, ReaderIcon } from '@radix-ui/react-icons';
import data from "./mockData";

// const tb = document.getElementById('wibble')! as HTMLTableElement
function App() {
  const [opened, setOpened] = useState(false);
  const [verticalDocs , showVerticalDocs] = useState([])
  const {width , height}  = useWindowDimensions()
  const [tableBody, setTableBody] = useState(document.getElementById('wibble')! as HTMLTableElement) 
  const handleDisplayVertically=(documents:any)=>{
    // console.log(documents)
    showVerticalDocs(documents);
    setOpened(true);

  }
  // console.log({height, width})
  useEffect(()=>{
    const tableBody = document.getElementById('wibble') ! as HTMLTableElement
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
      <td   align='left'>
        <div  style={{display:'inline-flex'}}>
        <Button color="dark" style={{ position:'absolute', visibility:tableBody?.rows[items.id].offsetHeight > 40 ? "visible":"hidden"}}
        onClick={()=>handleDisplayVertically(items.documents)}>Documents <DoubleArrowRightIcon style={{marginLeft:'5'}}/>
        </Button>
        <Group style={{ maxHeight:40, overflow:'hidden', visibility:tableBody?.rows[items.id].offsetHeight > 40 ? "hidden":"visible"}}> 
        {items.documents.map((docs,index)=>{
        return (<span key={index}  
          style={{ backgroundColor:'#f8f9fa', cursor:'pointer',
            borderRadius:5, color:'blue', alignItems:'center', fontWeight:'bold'}}>
            {/* <ReaderIcon color='black'/> */}
            <Text style={{flexWrap:'nowrap'}}>{items.documents[index]}</Text>
            </span>)}
        )}
        </Group>
        </div>

        {/* {
        ( tableBody?.rows[items.id].offsetHeight > 40)
        // (width <= 800 && items.documents.length >= 5 ) 
        // (width <= 1000 && items.documents.length >= 7 ) ||
        // (width <= 1200 && items.documents.length >= 8 ) ||
        // (width <= 1400 && items.documents.length >= 10) 
        ?
        // <div>     
        <Button color="dark" 
        onClick={()=>handleDisplayVertically(items.documents)}>Documents <DoubleArrowRightIcon style={{marginLeft:'5'}}/>
        </Button>
        // </div>
       :
        // const identifiers = Object.keys(docs).slice(1)
        <Group > 
        {items.documents.map((docs,index)=>{
        return (<span key={index}  
          style={{ backgroundColor:'#f8f9fa', cursor:'pointer',
            borderRadius:5, color:'blue', alignItems:'center', fontWeight:'bold'}}>
            <ReaderIcon color='black'/>
            <Text style={{flexWrap:'nowrap'}}>{items.documents[index]}</Text>
            </span>)}
        )}
      </Group>
        }  */}
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
      <Table id='wibble' 
      style={{ marginTop: 10 }}>
        <thead>{ths}</thead>
        <tbody >{rows}</tbody>
      </Table>

      <Modal opened={opened} onClose={()=>setOpened(false)}>
        <ScrollArea >
        <Stack  align="center" 
         sx={(theme) => ({ fontWeight:'bold' , height: 150})}>
          {verticalDocs.length > 0 ? verticalDocs.map((docs,index)=>{
            return (<Text key={index} sx={(theme)=>({ cursor:'pointer', color:'blue',backgroundColor: theme.colors.gray[0]})}><ReaderIcon color='black'/> {docs}</Text>)
          }): <Loader />}
        </Stack>
        </ScrollArea>
      </Modal>
    </div>


  );
}


export default App;
