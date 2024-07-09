import  { useEffect } from 'react';

export const NearlyPlacesWeather = ({ places, onFetchChosenCity }) => {
  let limitedPlaces = places.slice(0, 4);
  
  useEffect(() => {

  }, [])

if(!limitedPlaces) return

  return (
    <div className='container pb-5 pt-3 mt-4 bg-white text-primary'>
      <div className="ms-4">
        <h4>Nearby Places</h4>
      </div>
      <div className="row justify-content-center mt-4 gap">
        {limitedPlaces.map((place) => (
          
          <div key={place.id} className="col-lg-5 col-sm-12 w-75 border rounded text-secondary d-flex">
            <h4 className='col-lg-8 col-lg-sm-7 '>{place.name}</h4>
            <button className='btn btn-outline-warning col-lg-3 col-lg-sm-5 ' onClick={() => onFetchChosenCity({ lon: place.coords.longitude, lat: place.coords.latitude })}>Show weather</button>
          </div>
        
        ))}
      </div>
    </div>
  );
};
