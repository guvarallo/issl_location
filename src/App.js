import React, { Component } from 'react';
import { Map, TileLayer, Marker } from "react-leaflet";
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      pos: {
        latitude: -23.550520,
        longitude: -46.633308
      }
    }
  }

  componentDidMount() {
    fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(positions => this.setState({ pos: positions.iss_position }))
  }
  

  render() {
    const { pos } = this.state;
    return (
      <div>
        <h1 className="App">This is where the ISS is passing right now!</h1>
        <Map center={[pos.latitude, pos.longitude]} zoom={3} id="mapid">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[pos.latitude, pos.longitude]}></Marker>
        </Map>
      </div>
    )
  }
}

export default App;


// fetch('http://api.open-notify.org/iss-now.json')
// .then(response => response.json()) 
// .then(positions => positions.latitude);