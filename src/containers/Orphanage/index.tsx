/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { ButtonBase, CircularProgress } from '@material-ui/core';
import { Marker } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import happyMapIcon from '../../components/Map/happyMapIcon';
import PrimaryButton from '../../components/PrimaryButton';
import Sidebar from '../../components/Sidebar';
import Map from '../../components/Map';
import './styles.scss';

interface Orphanage {
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images: {
        id: number;
        url: string;
    }[]
}

interface OrphanageParams {
    id: string;
}

export default function Orphanage() {
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const params = useParams<OrphanageParams>();

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response) => {
      setOrphanage(response.data);
    });
  }, [params]);

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        {orphanage
          ? (
            <div className="orphanage-details">
              <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

              <div className="images">
                {orphanage.images.map((image, index) => (
                  <ButtonBase
                    key={image.id}
                    className={activeImageIndex === index ? ('active') : ('')}
                    type="button"
                    onClick={() => {
                      setActiveImageIndex(index);
                    }}
                  >
                    <img src={image.url} alt={orphanage.name} />
                  </ButtonBase>
                ))}
              </div>

              <div className="orphanage-details-content">
                <h1>{orphanage.name}</h1>
                <p>{orphanage.about}</p>

                <div className="map-container">
                  <Map
                    interactive={false}
                    center={[orphanage.latitude, orphanage.longitude]}
                    zoom={16}
                    style={{ width: '100%', height: 280 }}
                  >
                    <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                  </Map>

                  <footer>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                    >
                      Ver rotas no Google Maps
                    </a>
                  </footer>
                </div>

                <hr />

                <h2>Instruções para visita</h2>
                <p>{orphanage.instructions}</p>

                <div className="open-details">
                  <div className="hour">
                    <FiClock size={32} color="#15B6D6" />
                    {orphanage.opening_hours}
                  </div>
                  <div className={`${orphanage.open_on_weekends ? ('open') : ('close')}-on-weekends`}>
                    <FiInfo size={32} color={orphanage.open_on_weekends ? ('#39CC83') : ('#ff6690')} />
                    {orphanage.open_on_weekends ? ('Atendemos') : ('Não Atendemos')}
                    {' '}
                    <br />
                    fim de semana
                  </div>
                </div>

                <PrimaryButton type="button">
                  <FaWhatsapp size={20} color="#FFF" />
                  Entrar em contato
                </PrimaryButton>
              </div>
            </div>
          )
          : (
            <div className="justify-content text-center fade-in">
              <div className="spinner-loading">
                <CircularProgress />
              </div>
            </div>
          )}
      </main>
    </div>
  );
}
