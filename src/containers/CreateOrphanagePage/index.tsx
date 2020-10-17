/* eslint-disable react/button-has-type */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Marker } from 'react-leaflet';
import { ButtonBase } from '@material-ui/core';
import PrimaryButton from '../../components/PrimaryButton';
import Sidebar from '../../components/Sidebar';
import './styles.scss';
import { FiPlus } from 'react-icons/fi';
import Map from '../../components/Map';
import happyMapIcon from '../../components/Map/happyMapIcon';

export default function OrphanagesMap() {
  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map style={{ width: '100%', height: 280 }}>
              <Marker
                interactive={false}
                icon={happyMapIcon}
                position={[-27.2092052, -49.6401092]}
              />
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre
                <span>Máximo de 300 caracteres</span>
              </label>
              <textarea id="name" maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image" />

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <ButtonBase type="button" className="active">Sim</ButtonBase>
                <ButtonBase type="button">Não</ButtonBase>
              </div>
            </div>
          </fieldset>
          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </form>
      </main>
    </div>
  );
}