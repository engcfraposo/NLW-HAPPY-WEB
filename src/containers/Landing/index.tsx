import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonBase } from '@material-ui/core';
import { FiArrowRight } from 'react-icons/fi';
import LogoImg from '../../image/Logo.svg';

import './styles.scss';

const Landing = () => (
  <div id="page-landing">
    <div className="content-wrapper">
      <img src={LogoImg} alt="Happy" />
      <main>
        <h1>Leve felicidade para o mundo</h1>
        <p>
          Visite orfanatos e mude o dia
          de muitas crianças.
        </p>
      </main>
      <div className="location">
        <strong>Recife</strong>
        <span>Pernambuco</span>
      </div>
      <LinkContainer to="/app" exact>
        <ButtonBase className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </ButtonBase>
      </LinkContainer>
    </div>
  </div>
);

export default Landing;
