import React, { Component } from 'react';
import { Map, TileLayer, Marker } from "react-leaflet";
import './App.css';
import L from 'leaflet';
import logo from './iss.png';

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
    const issIcon = new L.Icon({
      iconUrl: logo,
      iconSize: [150, 100],
      iconAnchor: [70, 120],
    });
    return (
      <div>
        <div className="header">
          <h1>ISS CURRENT LOCATION</h1>
          <p>Did you know that the <a href="http://en.wikipedia.org/wiki/International_Space_Station" rel="noopener noreferrer" target="_blank">
            International Space Station</a> is moving at close to 28,000 km/h? Its location changes really fast!</p>
          <p>Below you can see exactly where ISS is passing right now, sit back and enjoy!</p>
        </div>
        <Map center={[pos.latitude, pos.longitude]} zoom={4} zoomControl={false} scrollWheelZoom={false} id="mapid">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[pos.latitude, pos.longitude]} onChange={ this.componentDidMount() } icon={ issIcon } />
        </Map>
      </div>
    )
  }
}

export default App;