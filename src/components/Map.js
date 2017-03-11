import React from 'react';
import ReactUploadFile from 'react-upload-file';

const NY_POSITION= {
  lat: 40.7809261,
  lng: -73.9637594
};

export default class Map extends React.Component {

  constructor() {
    super();
    this.findAddress = this.findAddress.bind(this);
  }

  findAddress(address ) {
	     var geocoder = new google.maps.Geocoder();
	     var map = this.map;
           geocoder.geocode( {'address':address }, function(results, status ){
		    if (status == google.maps.GeocoderStatus.OK) {
		        map.setCenter(results[0].geometry.location);
		         var marker = new google.maps.Marker({
				       position: results[0].geometry.location,
				        title:address
				    });
               marker.setMap(map);
 		    } else {
		      alert('Geocode failed: ' + status);
		   }
         }).bind(this);

  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: NY_POSITION,
      zoom: 16
    });
    var marker = new google.maps.Marker({
       position: NY_POSITION,
        title:"New York"
    });
    marker.setMap(this.map);
    this.geocoder = new google.maps.Geocoder();
  }


  render() {

  const options = {
    baseUrl: 'http://127.0.0.1',
    query: {
      warrior: 'fight'
    },
   uploadSuccess: (resp) => {
  	    console.log('upload success!');
    }
  }

    return (
      <div>
        <h1>Map</h1>
        <div>
         <ReactUploadFile options={options}  />
        </div>
          <div ref="map" style={{width: 500, height: 500, border: '1px solid black'}}>
          </div>
          <div>
		       <table>
		             <tr><th>Address </th></tr>
				     <tr><td><a href="" onMouseOver={()=> this.findAddress('Space Needle, Seattle, WA') }>Space Needle, Seattle, WA </a> </td></tr>
				     <tr><td><a href="" onMouseOver={()=> this.findAddress('Bellevue Square Mall, Bellevue, WA') }>Bellevue Square Mall, Bellevue, WA</a> </td></tr>
		      </table>
         </div>
      </div>

    );
  }
}

Map.propTypes = {
  initialPosition: React.PropTypes.object.isRequired
};