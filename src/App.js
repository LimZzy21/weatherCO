import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from './components/header/Header';
import { Content } from './components/content/Content';
import { useState } from 'react';

function App() {
  const [tab, setTab] = useState(0)
  const [searchStr, setSearchStr] = useState('')
  const [doSearch, setDosearch] = useState(null)
  const onHandleChangeSearch = (e) => {
    setSearchStr(e.target.value)
    
  }

  const onHandleSearch = ()=>{
    setDosearch(searchStr)
  }

  const onChangeTab = (e,id)=>{
    e.preventDefault()
    setTab(id)
  }

  return (
    <div className="App">
      <Header onHandleSearch={onHandleSearch} onHandleChangeSearch={onHandleChangeSearch} tab={tab} onChangeTab={onChangeTab} />
      <Content searchStr={searchStr} doSearch={doSearch} tab={tab}/>
  
    </div>
  );
}

export default App;
