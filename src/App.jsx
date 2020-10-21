import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import L from 'leaflet'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null
    }
  }

  drawMap = () => {
    let osm = L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
      zIndex: 1,
      attribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
    })
    let map = L.map('map', {
      center: [34.6506293, 133.9207984],
      zoom: 14,
      layers: [
        osm
      ],
      zoomControl: true,
      minZoom: 6,
      maxZoom: 17,
      gestureHandling: true,
      preferCanvas: true,
      scrollWheelZoom: false
    })
    L.Routing.control({
      waypoints: [
        L.latLng(34.6506293, 133.9207984), // 岡山大学病院
        L.latLng(34.673039, 133.916253), // ノートルダム清心女子大学
        L.latLng(34.666121, 133.917734), // 岡山駅
      ]
    }).addTo(map);
    this.setState({
      map: map
    })
  }

  componentDidMount() {
    this.drawMap();
  }

  render() {
    return (
      <div id="map" />
    );
  }
}

export default App;
