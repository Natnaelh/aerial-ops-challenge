import React, { useState } from 'react';
import './App.css';
import useWindowDimensions from './components/useWindowDimensions';
import {Table , Group, Button, Stack, Modal, Loader ,ScrollArea, Text } from '@mantine/core'
import { DoubleArrowRightIcon, ReaderIcon } from '@radix-ui/react-icons';
import data from "./mockData";


function App() {
  const [opened, setOpened] = useState(false);
  const [verticalDocs , showVerticalDocs] = useState([])
  const {width , height}  = useWindowDimensions()
  const handleDisplayVertically=(documents:any)=>{
    // console.log(documents)
    showVerticalDocs(documents);
    setOpened(true);

  }
  // console.log({height, width})

  const rows = data.map((items,index) => (
    <tr key={items.id}>
      <td  align='left'><Text>{items.salary}</Text></td>
      <td align='left'>{
        (width <= 600 && items.documents.length >= 3 )|| 
        (width <= 800 && items.documents.length >= 5 ) ||
        (width <= 1000 && items.documents.length >= 7 ) ||
        (width <= 1200 && items.documents.length >= 8 ) ||
        (width <= 1400 && items.documents.length >= 10) ?
        <div>
        <Button color="dark" 
          onClick={()=>handleDisplayVertically(items.documents)}>Documents <DoubleArrowRightIcon style={{marginLeft:'5'}}/></Button>
        </div>
       :
        // const identifiers = Object.keys(docs).slice(1)
        <Group > 
          {items.documents.map((docs,index)=>{
          return (<div key={index}  
            style={{backgroundColor:'#f8f9fa', cursor:'pointer', borderRadius:5, color:'blue', display:'inline-flex', alignItems:'center', fontWeight:'bold'}}>
              <ReaderIcon color='black'/><Text>{items.documents[index]}</Text></div>)}
          )}
        </Group>
        
        } 
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
      <Table  
      style={{ marginTop: 10 }}>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
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
