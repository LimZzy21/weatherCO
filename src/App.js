import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from './components/header/Header';
import { Content } from './components/content/Content';
import { useState } from 'react';

function App() {
  const [tab, setTab] = useState(0)
<<<<<<< HEAD
 
=======
  const [searchStr, setSearchStr] = useState('')
  const [doSearch, setDosearch] = useState(null)
  const onHandleChangeSearch = (e) => {
    setSearchStr(e.target.value)
    
  }

  const onHandleSearch = ()=>{
    setDosearch(searchStr)
  }

>>>>>>> d71a1dec249e43fcaf8916613cf6783c523b57ca
  const onChangeTab = (e,id)=>{
    e.preventDefault()
    setTab(id)
  }

  return (
    <div className="App">
<<<<<<< HEAD
      <Header   tab={tab} onChangeTab={onChangeTab} />
      <Content  tab={tab}/>
=======
      <Header onHandleSearch={onHandleSearch} onHandleChangeSearch={onHandleChangeSearch} tab={tab} onChangeTab={onChangeTab} />
      <Content searchStr={searchStr} doSearch={doSearch} tab={tab}/>
>>>>>>> d71a1dec249e43fcaf8916613cf6783c523b57ca
  
    </div>
  );
}

export default App;
