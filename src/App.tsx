import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import useWindowDimensions from './components/useWindowDimensions';
import {Table , Group, Button, Stack, Modal, Loader ,ScrollArea } from '@mantine/core'
import { DoubleArrowRightIcon } from '@radix-ui/react-icons';


const elements = [
  { id:1,  salary: "$150,000",   documents:['Offer',  'Employment', 'Assignment'] },
  { id:2,  salary: "$150,000",   documents:['Offer','Employment','Assignment',"Email Addresses",'Phone Numbers',"Social Media Accounts","People Informations", "Health Status","People Informations", "Health Status"] },
  { id:3,  salary: "$150,000",   documents:['Offer', 'Employment',  'Assignment',"Email Addresses", 'Random Files',] },
  { id:11,  salary: "$150,000",   documents:['Offer',  'Employment', 'Assignment'] },
  { id:12,  salary: "$150,000",   documents:['Offer','Employment','Assignment',"Email Addresses",'Phone Numbers',"Social Media Accounts","People Informations", "Health Status","People Informations", "Health Status"] },
  { id:13,  salary: "$150,000",   documents:['Offer', 'Employment',  'Assignment',"Email Addresses", 'Random Files',] },

];

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

  const rows = elements.map((element,index) => (
    <tr key={element.id}>
      <td  align='left'>{element.salary}</td>
      <td align='left'>{(width <= 600 && element.documents.length >= 3 )|| 
        (width <= 800 && element.documents.length >= 5 ) ||
        (width <= 1000 && element.documents.length >= 7 ) ||
        (width <= 1200 && element.documents.length >= 8 ) ||
        (width <= 1400 && element.documents.length >= 10) ?
        <div>
        <Button color="indigo" 
          onClick={()=>handleDisplayVertically(element.documents)}>Documents <DoubleArrowRightIcon style={{marginLeft:'5'}}/></Button>
        </div>
       :
        // const identifiers = Object.keys(docs).slice(1)
        <Group > 
          {element.documents.map((docs,index)=>{
          return (<div key={index}  style={{color:'blue', display:'inline-flex', fontWeight:'bold'}}><p>{element.documents[index]}</p></div>)}
          )}
        </Group>
        } 
      </td>
    </tr>
  ));

  const ths = (
    <tr>
      <th>Salary</th>
      <th>Documents</th>
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
        <ScrollArea sx={{height: 300}}>
        <Stack  align="center" 
         sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] })}>
          {verticalDocs.length > 0 ? verticalDocs.map((docs,index)=>{
            return <p key={index}>{docs}</p>
          }): <Loader />}
        </Stack>
        </ScrollArea>
      </Modal>
    </div>


  );
}


export default App;
