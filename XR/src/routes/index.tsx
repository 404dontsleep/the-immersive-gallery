import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import { HomePage } from '../pages/Home';
import { MuseumPageWrapper } from '../pages/Museum';
import { ItemDetailPage } from '../pages/ItemDetail';
import { ItemXRPage } from '../pages/ItemXR';
import { MuseumVRPage } from '../pages/MuseumVR';
import About from '../pages/About/About';
import { MuseumItemsByCategory } from '../pages/Museum/MuseumItems';
import { MuseumPage } from '../pages/Museum/Museum';
import { MuseumItemDetail } from '../pages/Museum/MuseumItemDetail';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.MUSEUM} element={<MuseumPageWrapper />}>
        <Route index element={<MuseumPage />} />
        <Route
          path={ROUTES.MUSEUM_CATEGORY}
          element={<MuseumItemsByCategory />}
        />
        <Route path={ROUTES.MUSEUM_ITEM} element={<MuseumItemDetail />} />
      </Route>
      <Route path={ROUTES.ITEM_DETAIL} element={<ItemDetailPage />} />
      <Route path={ROUTES.ITEM_XR} element={<ItemXRPage />} />
      <Route path={ROUTES.MUSEUM_VR} element={<MuseumVRPage />} />
    </Routes>
  );
}
