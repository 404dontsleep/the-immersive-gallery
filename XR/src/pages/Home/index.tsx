import { PageLayout } from '../../components/layouts/PageLayout';
import './Home.css';
import { useLanguageStore } from '@/stores/language.store';
import { Col, Divider, Row } from 'antd';
import Image from '@/components/common/PlaceHolderImage';

export function HomePage() {
  const { getLanguage } = useLanguageStore();

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto bg-museum">
        <section className="overflow-hidden p-4 rounded-lg relative">
          <Image
            className="w-full"
            width={'100%'}
            src={getLanguage('HERO_BANNER_1')}
            alt="Trống Đồng"
          />
          <span className="text-white m-4 text-[50px] font-bold absolute bottom-4 left-4">
            {getLanguage('HERO_BANNER_1_TITLE')}
          </span>
        </section>

        <section className="p-4">
          <Row gutter={16}>
            <Col span={12}>
              <Image
                width={'100%'}
                height={'100%'}
                src={getLanguage('INTRO_1_IMAGE')}
                alt="Trống Đồng"
              />
            </Col>
            <Col span={12}>
              <div className="p-4">
                <h1 className="text-4xl font-bold">
                  {getLanguage('INTRO_1_TITLE')}
                </h1>
                <h1 className="text-2xl mt-4 text-justify">
                  {getLanguage('INTRO_1_DESCRIPTION')}
                </h1>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div className="p-4">
                <h1 className="text-4xl font-bold">
                  {getLanguage('INTRO_2_TITLE')}
                </h1>
                <h1 className="text-2xl mt-4 text-justify">
                  {getLanguage('INTRO_2_DESCRIPTION')}
                </h1>
              </div>
            </Col>
            <Col span={12}>
              <Image
                width={'100%'}
                height={'100%'}
                src={getLanguage('INTRO_2_IMAGE')}
                alt="Trống Đồng"
              />
            </Col>
          </Row>
        </section>
        <Divider />
        <section className="p-4">
          <h1 className="text-4xl font-bold text-center mb-4">
            {getLanguage('INTRO_3_TITLE')}
          </h1>
          <Row gutter={16} className="h-[300px]">
            <Col span={8} className="h-full">
              <Image
                width={'100%'}
                height={'100%'}
                className="object-cover"
                src={getLanguage('INTRO_3_IMAGE_1')}
                alt="Trống Đồng"
              />
            </Col>
            <Col span={8} className="h-full">
              <Image
                width={'100%'}
                height={'100%'}
                className="object-cover"
                src={getLanguage('INTRO_3_IMAGE_2')}
                alt="Trống Đồng"
              />
            </Col>
            <Col span={8} className="h-full">
              <Image
                width={'100%'}
                height={'100%'}
                className="object-cover"
                src={getLanguage('INTRO_3_IMAGE_3')}
                alt="Trống Đồng"
              />
            </Col>
          </Row>
        </section>
      </div>
    </PageLayout>
  );
}
