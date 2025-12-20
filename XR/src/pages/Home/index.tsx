import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ROUTES } from '../../config/constants';
import './Home.css';
import { useLanguageStore } from '@/stores/language.store';
import { Button, Col, Divider, Flex, Image, Row } from 'antd';

export function HomePage() {
  const navigate = useNavigate();
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
          <span className="text-cbase m-4 text-[50px] font-bold absolute bottom-4 left-4">
            {getLanguage('HERO_BANNER_1_TITLE')}
          </span>
        </section>

        <section className="p-4">
          <Row gutter={16}>
            <Col span={12}>
              <Image
                width={'100%'}
                src={getLanguage('INTRO_1_IMAGE')}
                alt="Trống Đồng"
              />
            </Col>
            <Col span={12}>
              <h1 className="text-2xl font-bold">
                {getLanguage('INTRO_1_TITLE')}
              </h1>
              <p>{getLanguage('INTRO_1_DESCRIPTION')}</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <h1 className="text-2xl font-bold">
                {getLanguage('INTRO_2_TITLE')}
              </h1>
              <p>{getLanguage('INTRO_2_DESCRIPTION')}</p>
            </Col>
            <Col span={12}>
              <Image
                width={'100%'}
                src={getLanguage('INTRO_2_IMAGE')}
                alt="Trống Đồng"
              />
            </Col>
          </Row>
        </section>
        <Divider />
        <section className="p-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            {getLanguage('INTRO_3_TITLE')}
          </h1>
          <Row gutter={16}>
            <Col span={8}>
              <Image
                width={'100%'}
                src={getLanguage('INTRO_3_IMAGE_1')}
                alt="Trống Đồng"
              />
            </Col>
            <Col span={8}>
              <Image
                width={'100%'}
                src={getLanguage('INTRO_3_IMAGE_3')}
                alt="Trống Đồng"
              />
            </Col>
            <Col span={8}>
              <Image
                width={'100%'}
                src={getLanguage('INTRO_3_IMAGE_2')}
                alt="Trống Đồng"
              />
            </Col>
          </Row>
        </section>
        <Divider />
        <section className="p-4">
          <div className="rounded-2xl bg-cbase-900 flex flex-row justify-between p-4">
            <Flex gap={16} className="w-full">
              <Flex vertical className="h-full flex-1">
                <h1 className="text-2xl font-bold text-cbase-100 mb-4">
                  {getLanguage('INTRO_4_TITLE')}
                </h1>
                <p className="text-cbase-100 mb-4">
                  {getLanguage('INTRO_4_DESCRIPTION')}
                </p>
                <div className="flex-1" />
                <Button
                  className="w-full"
                  type="dashed"
                  onClick={() => navigate(ROUTES.MUSEUM)}
                >
                  {getLanguage('INTRO_4_BUTTON_START')}
                </Button>
              </Flex>
              <Image
                height={'100%'}
                src={getLanguage('INTRO_4_IMAGE')}
                alt="Trống Đồng"
              />
            </Flex>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
