import './header.css'
export const Header = ({ onChangeTab, tab, onHandleChangeSearch, onHandleSearch })=>{
    return (
        <div className="container-fluid ">
            <div className="row justify-content-center">
                <h1 className="col-lg-8 mb-0 text-white main">WeatherCO</h1>
                <div className=" col-lg-4 w-25 input-group mt-3 mb-3 ">
                    <input type="text" onChange={e => onHandleChangeSearch(e)} className="form-control" placeholder="enter a city" aria-label="Username" aria-describedby="basic-addon1"/>
                    <button type="button" onClick={onHandleSearch} className="btn btn-primary">Search</button>
                </div>
                <div className="row bg-secondary text-white text-center">
                    <div onClick={(e) => onChangeTab(e, 0)} className={`col-lg-1 col-sm border-end nav-item ${tab === 0 ? 'activeTab' : ''}`}><h3>Today</h3></div>
                    <div onClick={(e) => onChangeTab(e, 1)} className={`col-lg-2 col-sm nav-item ${tab === 1 ? 'activeTab':''}`}><h3>5-day forecast</h3></div>
                </div>

            </div>
            
        </div>
    )
}