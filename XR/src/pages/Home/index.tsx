import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ROUTES } from '../../config/constants';
import './Home.css';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="home-page">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Chào Mừng Đến Với
              <br />
              <span className="gradient-text">Bảo Tàng Ảo Việt Nam</span>
            </h1>
            <p className="hero-description">
              Khám phá di sản văn hóa Việt Nam qua công nghệ 3D, VR và AR. Trải
              nghiệm bảo tàng từ bất cứ đâu, bất cứ khi nào.
            </p>
            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate(ROUTES.MUSEUM)}
              >
                Khám Phá Bảo Tàng
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate(ROUTES.MUSEUM_VR)}
              >
                Trải Nghiệm VR
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card">
              <img src="/13011.jpg" alt="Trống Đồng" />
              <p>Trống Đồng Đông Sơn</p>
            </div>
            <div className="floating-card delay-1">
              <img src="/13112.jpg" alt="Gốm Sứ" />
              <p>Gốm Sứ Truyền Thống</p>
            </div>
            <div className="floating-card delay-2">
              <img src="/54307.jpg" alt="Tượng Phật" />
              <p>Tượng Phật Cổ</p>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Tính Năng Nổi Bật</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Hiển Thị 3D</h3>
                <p>
                  Xem các vật phẩm dưới dạng 3D với khả năng xoay, phóng to và
                  khám phá từng chi tiết
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🥽</div>
                <h3>Trải Nghiệm VR/AR</h3>
                <p>
                  Đắm chìm trong môi trường ảo với công nghệ VR/AR, tương tác
                  với vật phẩm như thật
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏛️</div>
                <h3>Bảo Tàng Ảo</h3>
                <p>
                  Dạo bước trong không gian bảo tàng 3D, khám phá các vật phẩm
                  trong môi trường chân thực
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>Thông Tin Chi Tiết</h3>
                <p>
                  Tìm hiểu về lịch sử, nguồn gốc và ý nghĩa của từng vật phẩm
                  qua thông tin chi tiết
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎥</div>
                <h3>Video Giới Thiệu</h3>
                <p>
                  Xem các video giới thiệu chuyên sâu về các vật phẩm và bối
                  cảnh lịch sử
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Phân Loại Thông Minh</h3>
                <p>
                  Dễ dàng tìm kiếm và lọc vật phẩm theo danh mục, thời kỳ và
                  nguồn gốc
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2 className="cta-title">Sẵn Sàng Khám Phá?</h2>
            <p className="cta-description">
              Hãy bắt đầu hành trình khám phá di sản văn hóa Việt Nam ngay hôm
              nay
            </p>
            <button
              className="btn btn-large"
              onClick={() => navigate(ROUTES.MUSEUM)}
            >
              Bắt Đầu Khám Phá
            </button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
