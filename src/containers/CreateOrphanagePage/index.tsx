/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable react/button-has-type */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Marker } from 'react-leaflet';
import { ButtonBase } from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrimaryButton from '../../components/PrimaryButton';
import Sidebar from '../../components/Sidebar';
import './styles.scss';
import { FiPlus } from 'react-icons/fi';
import Map from '../../components/Map';
import { LeafletMouseEvent } from 'leaflet';
import happyMapIcon from '../../components/Map/happyMapIcon';
import { api } from '../../services/api';

export default function OrphanagesMap() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [openWeekends, setOpenWeekends] = useState<boolean>(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string[]>([]);

  const history = useHistory();


  const handleSelectImages = (image: ChangeEvent<HTMLInputElement>) => {
    if (!image.target.files) {
      return;
    }

    const selectedImages = Array.from(image.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((selectedImage) => URL.createObjectURL(selectedImage));
    setPreviewImage(selectedImagesPreview);
  };

  const handleClick = (point: LeafletMouseEvent) => {
    const { lat, lng } = point.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      about: '',
      instructions: '',
      opening_hours: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Requerido'),
      about: Yup.string().required('Requerido').max(300),
      instructions: Yup.string().required('Requerido'),
      opening_hours: Yup.string().required('Requerido'),
    }),
    onSubmit: async (values) => {
      console.log(values);

      const data = new FormData();

      const {
        name,
        about,
        instructions,
        opening_hours,
      } = values;

      const {
        latitude,
        longitude,
      } = position;

      data.append('name', name);
      data.append('about', about);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('instructions', instructions);
      data.append('opening_hours', opening_hours);
      data.append('open_on_weekends', String(openWeekends));
      images.forEach((image) => {
        data.append('images', image);
      });

      try {
        await api.post('orphanages', data);
        toast.success('Dados alterados com sucesso!');
        return history.push('/app');
      } catch (error) {
        console.log(error);
        return toast.error('Erro no cadastro sucesso!');
      }
    },
  });

  const {
    name: nameError,
    about: aboutError,
    instructions: instructionsError,
    opening_hours: openingHoursError,
  } = formik.errors;

  const {
    name: nameTouched,
    about: aboutTouched,
    instructions: instructionsTouched,
    opening_hours: openingHoursTouched,
  } = formik.touched;

  const {
    name,
    about,
    instructions,
    opening_hours,
  } = formik.values;

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
          className="create-orphanage-form"
        >
          <fieldset>
            <legend>Dados</legend>
            {(position.latitude === 0 && position.longitude === 0)
            && (
              <div className="input-block">
                <label className="error">Coloque o ponto no mapa!</label>
              </div>
            )}
            <Map
              style={{ width: '100%', height: 280 }}
              onclick={handleClick}
            >
              {(position.latitude !== 0 && position.longitude !== 0)
                && (
                  <Marker
                    interactive={false}
                    icon={happyMapIcon}
                    position={[position.latitude, position.longitude]}
                  />
                )}
            </Map>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={name}
                disabled={(
                  (position.latitude === 0 && position.longitude === 0)
                  )}
              />
              {(nameTouched && nameError) && (<label className="error">{nameError}</label>)}
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre
                <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                name="about"
                onChange={formik.handleChange}
                value={about}
                maxLength={300}
                disabled={(
                  (position.latitude === 0 && position.longitude === 0)
                  )}
              />
              {(aboutTouched && aboutError) && (<label className="error">{aboutError}</label>)}
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image" />

              <div className="images-container">
                {previewImage.map((preview) => (
                  <img key={preview} src={preview} alt={name} />
                ))}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                type="file"
                id="image[]"
                onChange={handleSelectImages}
                disabled={(
                  (position.latitude === 0 && position.longitude === 0)
                  )}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                name="instructions"
                onChange={formik.handleChange}
                value={instructions}
                disabled={(
                  (position.latitude === 0 && position.longitude === 0)
                  )}
              />
              {(instructionsTouched && instructionsError) && (<label className="error">{instructionsError}</label>)}
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de atendimento</label>
              <input
                id="opening_hours"
                name="opening_hours"
                onChange={formik.handleChange}
                value={opening_hours}
                disabled={(
                  (position.latitude === 0 && position.longitude === 0)
                  )}
              />
              {(openingHoursTouched && openingHoursError) && (<label className="error">{openingHoursError}</label>)}
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <ButtonBase
                  type="button"
                  className={openWeekends ? ('active') : ('')}
                  onClick={() => setOpenWeekends(true)}
                  disabled={(
                    (position.latitude === 0 && position.longitude === 0)
                    )}
                >
                  Sim
                </ButtonBase>
                <ButtonBase
                  type="button"
                  className={!openWeekends ? ('active') : ('')}
                  onClick={() => setOpenWeekends(false)}
                  disabled={(
                    (position.latitude === 0 && position.longitude === 0)
                    )}
                >
                  Não
                </ButtonBase>
              </div>
            </div>
          </fieldset>
          <PrimaryButton
            type="submit"
            disabled={(
              (position.latitude === 0 && position.longitude === 0)
              )}
          >
            Confirmar
          </PrimaryButton>
        </form>
      </main>
    </div>
  );
}
