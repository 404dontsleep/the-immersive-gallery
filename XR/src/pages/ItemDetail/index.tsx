import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layouts/PageLayout';
import { XRCanvas } from '../../providers/XRProvider';
import { Item3DView } from '../../components/3d/Item3DView';
import type { Item } from '../../types';
import { itemsService } from '../../services/items.service';
import { ROUTES } from '../../config/constants';
import './ItemDetail.css';

export function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
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

  const handleEnterXR = () => {
    if (id) {
      navigate(ROUTES.ITEM_XR.replace(':id', id));
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="loading-page">
          <div className="loading-spinner"></div>
          <p>{language === 'vn' ? 'Đang tải...' : 'Loading...'}</p>
        </div>
      </PageLayout>
    );
  }

  if (!item) {
    return (
      <PageLayout>
        <div className="error-page">
          <h2>
            {language === 'vn' ? 'Không tìm thấy vật phẩm' : 'Item not found'}
          </h2>
          <button onClick={() => navigate(ROUTES.MUSEUM)}>
            {language === 'vn' ? 'Quay lại Bảo Tàng' : 'Back to Museum'}
          </button>
        </div>
      </PageLayout>
    );
  }

  const name = language === 'vn' ? item.nameVn : item.name;
  const description = language === 'vn' ? item.descriptionVn : item.description;

  return (
    <PageLayout>
      <div className="item-detail-page">
        <div className="item-detail-container">
          {/* 3D Viewer Section */}
          <div className="item-viewer-section">
            <div className="canvas-container">
              <XRCanvas>
                <Item3DView
                  modelUrl={item.modelUrl}
                  autoRotate={true}
                  enableInteraction={true}
                  scale={item.scale}
                  position={item.position}
                  rotation={item.rotation}
                />
              </XRCanvas>
            </div>

            <div className="viewer-controls">
              <button className="control-btn primary" onClick={handleEnterXR}>
                <span className="icon">🥽</span>
                {language === 'vn' ? 'Chuyển sang VR/AR' : 'Enter VR/AR'}
              </button>
              {item.videoUrl && (
                <button
                  className="control-btn"
                  onClick={() => setShowVideo(!showVideo)}
                >
                  <span className="icon">🎥</span>
                  {language === 'vn' ? 'Xem Video' : 'Watch Video'}
                </button>
              )}
            </div>

            {/* Video Modal */}
            {showVideo && item.videoUrl && (
              <div className="video-modal" onClick={() => setShowVideo(false)}>
                <div
                  className="video-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="close-btn"
                    onClick={() => setShowVideo(false)}
                  >
                    ✕
                  </button>
                  <video controls autoPlay>
                    <source src={item.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>

          {/* Information Section */}
          <div className="item-info-section">
            <div className="item-info-content">
              <button
                className="back-btn"
                onClick={() => navigate(ROUTES.MUSEUM)}
              >
                ← {language === 'vn' ? 'Quay lại' : 'Back'}
              </button>

              <h1 className="item-title">{name}</h1>
              <p className="item-description">{description}</p>

              {item.metadata && (
                <div className="item-metadata">
                  <h3>
                    {language === 'vn' ? 'Thông Tin Chi Tiết' : 'Details'}
                  </h3>
                  <div className="metadata-grid">
                    {item.metadata.period && (
                      <div className="metadata-item">
                        <span className="label">
                          {language === 'vn' ? 'Thời Kỳ' : 'Period'}:
                        </span>
                        <span className="value">{item.metadata.period}</span>
                      </div>
                    )}
                    {item.metadata.material && (
                      <div className="metadata-item">
                        <span className="label">
                          {language === 'vn' ? 'Vật Liệu' : 'Material'}:
                        </span>
                        <span className="value">{item.metadata.material}</span>
                      </div>
                    )}
                    {item.metadata.dimensions && (
                      <div className="metadata-item">
                        <span className="label">
                          {language === 'vn' ? 'Kích Thước' : 'Dimensions'}:
                        </span>
                        <span className="value">
                          {item.metadata.dimensions}
                        </span>
                      </div>
                    )}
                    {item.metadata.origin && (
                      <div className="metadata-item">
                        <span className="label">
                          {language === 'vn' ? 'Nguồn Gốc' : 'Origin'}:
                        </span>
                        <span className="value">{item.metadata.origin}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="interaction-hints">
                <h3>
                  {language === 'vn' ? 'Cách Tương Tác' : 'How to Interact'}
                </h3>
                <ul>
                  <li>
                    <strong>
                      {language === 'vn' ? 'Chuột Trái' : 'Left Mouse'}:
                    </strong>{' '}
                    {language === 'vn' ? 'Xoay vật phẩm' : 'Rotate item'}
                  </li>
                  <li>
                    <strong>
                      {language === 'vn' ? 'Cuộn Chuột' : 'Mouse Wheel'}:
                    </strong>{' '}
                    {language === 'vn' ? 'Phóng to/thu nhỏ' : 'Zoom in/out'}
                  </li>
                  <li>
                    <strong>{language === 'vn' ? 'Tự Động' : 'Auto'}:</strong>{' '}
                    {language === 'vn'
                      ? 'Sau 3 giây không tương tác, vật phẩm sẽ tự động xoay'
                      : 'After 3 seconds of inactivity, item will auto-rotate'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
