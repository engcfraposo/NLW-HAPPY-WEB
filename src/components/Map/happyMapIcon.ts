import L from 'leaflet';
import mapMarkerImg from '../../image/Local.svg';

export default L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});
