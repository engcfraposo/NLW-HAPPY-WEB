import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';
import mapMarkerImg from '../../image/Local.svg';

import './styles.scss';

export default function Sidebar() {
  const { goBack } = useHistory();

  return (
    <aside className="sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <ButtonBase type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </ButtonBase>
      </footer>
    </aside>
  );
}
