import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonBase, CircularProgress } from '@material-ui/core';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Marker, Popup } from 'react-leaflet';
import Map from '../../components/Map';
import MapMakerImg from '../../image/Local.svg';
import happyMapIcon from '../../components/Map/happyMapIcon';
import { api } from '../../services/api';
import 'leaflet/dist/leaflet.css';
import './styles.scss';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <>
      {orphanages.length > 0
        ? (
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
              {orphanages.map((orphanage) => (
                <Marker
                  key={orphanage.id}
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                >
                  <Popup
                    closeButton={false}
                    minWidth={240}
                    maxWidth={240}
                    className="map-popup"
                  >
                    {orphanage.name}
                    <LinkContainer
                      to={`/orphanages/${orphanage.id}`}
                      exact
                    >
                      <ButtonBase>
                        <FiArrowRight size={18} color="#fff" />
                      </ButtonBase>
                    </LinkContainer>
                  </Popup>
                </Marker>
              ))}
            </Map>
            <LinkContainer to="/orphanages/create" exact>
              <ButtonBase className="create-orphanage">
                <FiPlus size={26} color="rgba(255,255,255,0.8)" />
              </ButtonBase>
            </LinkContainer>
          </div>
        )
        : (
          <div className="justify-content text-center fade-in">
            <div className="spinner-loading">
              <CircularProgress />
            </div>
          </div>
        )}

    </>
  );
};
export default OrphanagesMap;
