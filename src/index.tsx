import React from 'react';
import ReactDOM from 'react-dom';
import { MapProvider } from 'react-map-gl';
import { App } from './app';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <MapProvider>
      <App />
    </MapProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
