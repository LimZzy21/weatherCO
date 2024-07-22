import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from './components/header/Header';
import { Content } from './components/content/Content';
import { useState } from 'react';

function App() {
  const [tab, setTab] = useState(0)
 

  const onChangeTab = (e,id)=>{
    e.preventDefault()
    setTab(id)
  }

  return (
    <div className="App">

      <Header   tab={tab} onChangeTab={onChangeTab} />
      <Content  tab={tab}/>

    </div>
  );
}

export default App;
