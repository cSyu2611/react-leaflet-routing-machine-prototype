import React, { useState, useEffect } from 'react';
import './App.css';
import L from 'leaflet'
import {
  MapContainer,
  ZoomControl,
  ScaleControl,
  LayersControl,
  TileLayer,
  useMap,
  useMapEvents
} from 'react-leaflet'

const mapConfig = {
  tap: false,
  zoom: 14,
  minZoom: 6,
  maxZoom: 17,
  center: {
    lat: 35.6802117,
    lng: 139.7576692
  },
  gestureHandling: true,
  preferCanvas: true,
  zoomControl: false,
  scrollWheelZoom: true,
  doubleClickZoom: false,
  baseLayers: [
    {
      name: "OpenStreetMap",
      attribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors',
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      checked: true
    },
    {
      name: "国土地理院 - 淡色",
      attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
      url: "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
      checked: false
    },
    {
      name: "国土地理院 - 標準地図",
      attribution: "&copy; <a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
      url: "//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
      checked: false
    },
  ]
} // マップの設定

const RoutingMachine = props => {
  const map = useMap();
  useEffect(() => {
    L.Routing.control({
      waypoints: props.waypoints
    }).addTo(map);
  }, [])
  return null;
}

const RoutingMachineController = props => {
  const [waypoints, setWaypoints] = useState([]);
  const [search, setSearch] = useState(false);
  const mapRef = useMap();
  const map = useMapEvents({
    click: (e) => {
      ;
    },
    dblclick: (e) => {
      let latlng = e.latlng;
      let alliedForces = L.layerGroup().addTo(mapRef)
      console.log(alliedForces)
      alliedForces.clearLayers()
      setWaypoints([...waypoints, L.latLng(latlng.lat, latlng.lng)]);
    }
  })
  return (
    <>
      {search ? <RoutingMachine waypoints={waypoints} /> : null}
      <div style={{
        position: "absolute",
        width: 400,
        minHeight: 100,
        background: "#fff",
        zIndex: 500,
        margin: 20,
        borderWidth: 10,
        color: "#e2e2e2",
        border: "dashed",
        borderRadius: 10
      }}>
        <div style={{
          height: 50,
          width: 400,
          fontSize: 18,
          color: "black",
          textAlign: "center",
          display: "table-cell",
          verticalAlign: "middle",
          borderBottom: "dashed",
        }}>
          React Leaflet + Leaflet Routing Machine
        </div>
        <p style={{ height: 0 }}></p>
        <div style={{
          height: 30,
          width: 400,
          fontSize: 15,
          color: "black",
          textAlign: "center",
          display: "table-cell",
          verticalAlign: "middle"
        }}>
          地図上をダブルクリックして通過点を追加できます。
        </div>
        <p style={{ height: 0 }}></p>
        {waypoints.map((waypoint, idx) => (
          <>
            <div style={{
              height: 30,
              width: 400,
              textAlign: "center",
              display: "table-cell",
              verticalAlign: "middle"
            }}>{"緯度: " + waypoint.lat + ", 経度: " + waypoint.lng}</div>
            <p style={{ height: 0 }}></p>
          </>
        ))}
        {waypoints.length >= 2 ?
          <div style={{
            height: 40,
            textAlign: "center"
          }}>
            <button type="button" name="clearButton" value="clear" style={{
              background: "#4186F4",
              height: 30,
              width: 200,
              borderRadius: 20
            }}
              onClick={() => setSearch(true)}>
              <font style={{
                fontWeight: "bold",
                color: "white"
              }}>経路を探索する</font>
            </button>
          </div> : null}

        <div style={{
          height: 40,
          textAlign: "center"
        }}>
          <button type="button" name="clearButton" value="clear" style={{
            background: "#4186F4",
            height: 30,
            width: 200,
            borderRadius: 20
          }}
            onClick={() => { setWaypoints([]); window.location.reload() }}>
            <font style={{
              fontWeight: "bold",
              color: "white"
            }}>経路をクリア</font>
          </button>
        </div>
      </div>
    </>
  )
}

const App = () => {
  return (
    <MapContainer
      tap={mapConfig.tap}
      id="map"
      minZoom={mapConfig.minZoom}
      zoom={mapConfig.zoom}
      maxZoom={mapConfig.maxZoom}
      center={mapConfig.center}
      gestureHandling={mapConfig.gestureHandling}
      preferCanvas={mapConfig.preferCanvas}
      zoomControl={mapConfig.zoomControl}
      scrollWheelZoom={mapConfig.scrollWheelZoom}
      doubleClickZoom={mapConfig.doubleClickZoom}
    >
      {/* 右上のレイヤコントローラ */}
      <LayersControl position="topright">
        {mapConfig.baseLayers.map((layer, idx) => (
          <LayersControl.BaseLayer checked={layer.checked} name={layer.name} key={layer.name + idx.toString()} zIndex={0}>
            <TileLayer
              attribution={layer.attribution}
              url={layer.url}
              zIndex={0}
            />
          </LayersControl.BaseLayer>
        ))}
      </LayersControl>
      {/* 右上のレイヤコントローラ */}

      {/* 左下の縮尺 */}
      <ScaleControl position="bottomleft" />
      {/* 左下の縮尺 */}

      {/* 右下のズームコントローラ */}
      <ZoomControl position="bottomright" />
      {/* 右下のズームコントローラ */}

      <RoutingMachineController />
    </MapContainer>
  )
}

export default App;
