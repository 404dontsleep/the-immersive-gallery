import { PageLayout } from '@/components/layouts/PageLayout';
import { useLanguageStore } from '@/stores/language.store';
import { Col, Divider, Image, Row } from 'antd';
import { useMemo } from 'react';

export default function About() {
  const { getLanguage } = useLanguageStore();

  const aboutItems = useMemo(
    () => [
      {
        key: 'ABOUT_ITEM_1',
        title: getLanguage('ABOUT_ITEM_1_TITLE'),
        description: getLanguage('ABOUT_ITEM_1_DESCRIPTION'),
        image: getLanguage('ABOUT_ITEM_1_IMAGE'),
      },
      {
        key: 'ABOUT_ITEM_2',
        title: getLanguage('ABOUT_ITEM_2_TITLE'),
        description: getLanguage('ABOUT_ITEM_2_DESCRIPTION'),
        image: getLanguage('ABOUT_ITEM_2_IMAGE'),
      },
      {
        key: 'ABOUT_ITEM_3',
        title: getLanguage('ABOUT_ITEM_3_TITLE'),
        description: getLanguage('ABOUT_ITEM_3_DESCRIPTION'),
        image: getLanguage('ABOUT_ITEM_3_IMAGE'),
      },
    ],
    [getLanguage],
  );

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto bg-museum">
        <section className="p-4 relative">
          <Image
            width={'100%'}
            src={getLanguage('ABOUT_BANNER_IMAGE')}
            alt="About"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-5xl font-bold text-cbase-100 bg-black/50 p-12 rounded-lg max-w-2xl whitespace-break-spaces text-center">
              {getLanguage('ABOUT_BANNER_TITLE')}
            </p>
          </div>
        </section>
        <section className="p-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            {getLanguage('ABOUT_TITLE')}
          </h1>
          <Row gutter={16}>
            {aboutItems.map((item) => (
              <Col span={8} key={item.key}>
                <h2 className="text-lg font-bold text-center mb-4 ring-1 rounded-md">
                  {item.title}
                </h2>
                <Image width={'100%'} src={item.image} alt={item.key} />
                <p className="text-sm text-center">{item.description}</p>
              </Col>
            ))}
          </Row>
        </section>
        <Divider />
        <section className="p-4">
          <h1 className="text-2xl font-bold mb-4">
            {getLanguage('ABOUT_LOCATION_TITLE')}
          </h1>
          <p className="mb-4">{getLanguage('ABOUT_LOCATION_DESCRIPTION')}</p>
          <iframe
            src={getLanguage('ABOUT_LOCATION_MAP_URL')}
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
        {/* FOOTER */}
      </div>
    </PageLayout>
  );
}
