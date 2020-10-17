import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonBase } from '@material-ui/core';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Marker, Popup } from 'react-leaflet';
import Map from '../../components/Map';
import MapMakerImg from '../../image/Local.svg';
import happyMapIcon from '../../components/Map/happyMapIcon';
import 'leaflet/dist/leaflet.css';
import './styles.scss';

const OrphanagesMap = () => (
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
    <Map>
      <Marker icon={happyMapIcon} position={[-8.0625462, -34.9175803]}>
        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
          Lar das meninas
          <LinkContainer to="/orphanages/1" exact>
            <ButtonBase>
              <FiArrowRight size={18} color="#fff" />
            </ButtonBase>
          </LinkContainer>
        </Popup>
      </Marker>
    </Map>
    <LinkContainer to="/orphanages/create" exact>
      <ButtonBase className="create-orphanage">
        <FiPlus size={26} color="rgba(0,0,0,0.6)" />
      </ButtonBase>
    </LinkContainer>
  </div>
);

export default OrphanagesMap;
