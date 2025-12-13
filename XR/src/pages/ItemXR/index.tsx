import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { XRCanvas } from '../../providers/XRProvider';
import { Item3DView } from '../../components/3d/Item3DView';
import type { Item } from '../../types';
import { itemsService } from '../../services/items.service';
import { ROUTES } from '../../config/constants';
import { XRButton, createXRStore } from '@react-three/xr';
import './ItemXR.css';

const xrStore = createXRStore();

export function ItemXRPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [language] = useState<'en' | 'vn'>('vn');

  useEffect(() => {
    if (id) {
      loadItem(id);
    }
  }, [id]);

  const loadItem = async (itemId: string) => {
    setLoading(true);
    try {
      const itemData = await itemsService.getItemById(itemId);
      setItem(itemData);
    } catch (error) {
      console.error('Failed to load item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToWeb = () => {
    if (id) {
      navigate(ROUTES.ITEM_DETAIL.replace(':id', id));
    }
  };

  if (loading) {
    return (
      <div className="xr-loading-page">
        <div className="loading-spinner"></div>
        <p>{language === 'vn' ? 'Đang tải...' : 'Loading...'}</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="xr-error-page">
        <h2>
          {language === 'vn' ? 'Không tìm thấy vật phẩm' : 'Item not found'}
        </h2>
        <button onClick={() => navigate(ROUTES.MUSEUM)}>
          {language === 'vn' ? 'Quay lại Bảo Tàng' : 'Back to Museum'}
        </button>
      </div>
    );
  }

  const name = language === 'vn' ? item.nameVn : item.name;

  return (
    <div className="item-xr-page">
      {/* XR Controls */}
      <div className="xr-controls">
        <button className="back-btn" onClick={handleBackToWeb}>
          ← {language === 'vn' ? 'Quay lại chế độ Web' : 'Back to Web Mode'}
        </button>
        <h1 className="xr-title">{name}</h1>
        <div className="xr-buttons">
          <XRButton store={xrStore} mode={'immersive-vr'} />
          <XRButton store={xrStore} mode={'immersive-ar'} />
        </div>
      </div>

      {/* Instructions */}
      <div className="xr-instructions">
        <h3>{language === 'vn' ? 'Hướng Dẫn' : 'Instructions'}</h3>
        <div className="instructions-grid">
          <div className="instruction-item">
            <span className="instruction-icon">🥽</span>
            <div>
              <strong>VR Mode:</strong>
              <p>
                {language === 'vn'
                  ? 'Sử dụng tay cầm VR để tương tác với vật phẩm. Di chuyển và xoay vật phẩm tự do.'
                  : 'Use VR controllers to interact with the item. Move and rotate freely.'}
              </p>
            </div>
          </div>
          <div className="instruction-item">
            <span className="instruction-icon">📱</span>
            <div>
              <strong>AR Mode:</strong>
              <p>
                {language === 'vn'
                  ? 'Đặt vật phẩm vào không gian thực của bạn. Di chuyển thiết bị để xem từ mọi góc độ.'
                  : 'Place the item in your real space. Move your device to view from all angles.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <XRCanvas xrEnabled={true}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* The 3D Item */}
        <Item3DView
          modelUrl={item.modelUrl}
          autoRotate={false}
          enableInteraction={false}
          scale={item.scale || 1}
          position={item.position}
          rotation={item.rotation}
        />

        {/* Environment */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </XRCanvas>
    </div>
  );
}
