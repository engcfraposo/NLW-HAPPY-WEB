import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonBase } from '@material-ui/core';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';
import MapMakerImg from '../../image/Local.svg';

import 'leaflet/dist/leaflet.css';
import './styles.scss';

const OrphanegesMap = () => (
  <div id="page-map">
    <aside>
      <header>
        <img src={MapMakerImg} alt="happy" />
        <h2>
          Escolha
          um orfanato
          no mapa
        </h2>
        <p>
          Muitas crianças estão
          esperando a sua visita :)
        </p>
      </header>
      <footer>
        <strong>Recife</strong>
        <span>Pernambuco</span>
      </footer>
    </aside>
    <Map
      center={[-8.0625462, -34.9175803]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
    >
      {/** <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
      <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
    </Map>
    <LinkContainer to="/create" exact>
      <ButtonBase className="create-orphanage">
        <FiPlus size={26} color="rgba(0,0,0,0.6)" />
      </ButtonBase>
    </LinkContainer>
  </div>
);

export default OrphanegesMap;
