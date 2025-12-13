import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import { HomePage } from '../pages/Home';
import { MuseumPage } from '../pages/Museum';
import { ItemDetailPage } from '../pages/ItemDetail';
import { ItemXRPage } from '../pages/ItemXR';
import { MuseumVRPage } from '../pages/MuseumVR';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.MUSEUM} element={<MuseumPage />} />
      <Route path={ROUTES.ITEM_DETAIL} element={<ItemDetailPage />} />
      <Route path={ROUTES.ITEM_XR} element={<ItemXRPage />} />
      <Route path={ROUTES.MUSEUM_VR} element={<MuseumVRPage />} />
    </Routes>
  );
}
