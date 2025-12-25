import {
  Button,
  Card,
  Flex,
  Space,
  Select,
  Typography,
  Table,
  Tooltip,
} from 'antd';
import useLanguageStore from './components/useLanguageStore';
import {
  languageControllerCreate,
  languageControllerDelete,
  languageControllerUpdate,
  useLanguageControllerFindAll,
  languageCodeControllerCreate,
  languageCodeControllerUpdate,
  languageCountryControllerCreate,
  languageCountryControllerUpdate,
  type LanguageDto,
  type LanguageCodeDto,
  type LanguageCountryDto,
  type LanguageCode,
  type LanguageCountry,
  type LanguageDtoFindOptionsWhereDto,
  type Language,
} from '@api';
import { useEffect, useState } from 'react';
import { ItemMode } from '@/components/BaseContext/createBaseContext';
import SelectedLanguageModal from './components/SelectedLanguageModal';
import SelectedLanguageCodeModal from './components/SelectedLanguageCodeModal';
import SelectedLanguageCountryModal from './components/SelectedLanguageCountryModal';
import useLanguageCodeStore from './components/useLanguageCodeStore';
import useLanguageCountryStore from './components/useLanguageCountryStore';
import { PenIcon, PlusIcon, Code, Globe } from 'lucide-react';
import {
  useLanguageCodeControllerFindAll,
  useLanguageCountryControllerFindAll,
} from '@api';
import type { ColumnType } from 'antd/es/table';

const { Text } = Typography;

export default function LanguagePage() {
  const { setSelectedData, setFilter, filter } = useLanguageStore();
  const { setSelectedData: setSelectedCodeData } = useLanguageCodeStore();
  const { setSelectedData: setSelectedCountryData } = useLanguageCountryStore();

  const {
    data: languages,
    mutate: mutateLanguages,
    isLoading: isLoadingLanguages,
  } = useLanguageControllerFindAll({
    withDeleted: true,
    where: filter,
  });
  const { data: languageCodes, mutate: mutateLanguageCodes } =
    useLanguageCodeControllerFindAll();
  const { data: languageCountries, mutate: mutateLanguageCountries } =
    useLanguageCountryControllerFindAll();

  const [selectedCode, setSelectedCode] = useState<string | undefined>(
    undefined,
  );
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined,
  );

  const handleCreateLanguage = () => {
    setSelectedData(null, ItemMode.CREATE);
  };

  const handleCreateCode = () => {
    setSelectedCodeData(null, ItemMode.CREATE);
  };

  const handleCreateCountry = () => {
    setSelectedCountryData(null, ItemMode.CREATE);
  };

  const handleOkLanguage = (value: LanguageDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.CREATE) {
      languageControllerCreate(value).then(() => {
        mutateLanguages();
      });
    }
    if (itemMode === ItemMode.EDIT && value.code) {
      languageControllerUpdate(value.id ?? 0, value).then(() => {
        mutateLanguages();
      });
    }
    if (itemMode === ItemMode.DELETE && value.code) {
      languageControllerDelete(value.id ?? 0).then(() => {
        mutateLanguages();
      });
    }
    if (itemMode === ItemMode.RESTORE && value.code) {
      languageControllerCreate({
        id: value.id,
        code: value.code,
        country: value.country,
        value: value.value,
      }).then(() => {
        mutateLanguages();
      });
    }
  };

  const handleOkCode = (value: LanguageCodeDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.CREATE) {
      languageCodeControllerCreate(value).then(() => {
        mutateLanguageCodes();
      });
    }
    if (itemMode === ItemMode.EDIT && value.id !== undefined) {
      languageCodeControllerUpdate(value.id, value).then(() => {
        mutateLanguageCodes();
      });
    }
  };

  const handleOkCountry = (value: LanguageCountryDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.CREATE) {
      languageCountryControllerCreate(value).then(() => {
        mutateLanguageCountries();
      });
    }
    if (itemMode === ItemMode.EDIT && value.id !== undefined) {
      languageCountryControllerUpdate(value.id, value).then(() => {
        mutateLanguageCountries();
      });
    }
  };

  useEffect(() => {
    if (selectedCode) {
      setSelectedCountry(undefined);
    }
  }, [selectedCode]);

  useEffect(() => {
    if (selectedCountry) {
      setSelectedCode(undefined);
    }
  }, [selectedCountry]);

  useEffect(() => {
    const whereFilter: LanguageDtoFindOptionsWhereDto = {};

    if (selectedCode) {
      whereFilter.code = { in: [selectedCode] };
    }

    if (selectedCountry) {
      whereFilter.country = { in: [selectedCountry] };
    }

    setFilter(Object.keys(whereFilter).length > 0 ? whereFilter : {});
  }, [selectedCode, selectedCountry, setFilter]);

  const getCodeInfo = (code: string) =>
    languageCodes?.find((lc: LanguageCode) => lc.code === code);

  const getCountryInfo = (country: string) =>
    languageCountries?.find((lc: LanguageCountry) => lc.country === country);

  // Table columns
  const columns: ColumnType<Language>[] = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (code: string) => {
        const info = getCodeInfo(code);
        return (
          <Tooltip title={info ? info.description : undefined}>
            <span>{code}</span>
          </Tooltip>
        );
      },
      filters: languageCodes?.map((lc: LanguageCode) => ({
        text: `${lc.code} - ${lc.description}`,
        value: lc.code,
      })),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (country: string) => {
        const info = getCountryInfo(country);
        return (
          <Tooltip title={info ? info.description : undefined}>
            <span>{country}</span>
          </Tooltip>
        );
      },
      filters: languageCountries?.map((lc: LanguageCountry) => ({
        text: `${lc.country} - ${lc.description}`,
        value: lc.country,
      })),
      onFilter: (value, record) => record.country === value,
    },
    {
      title: 'Language Value',
      dataIndex: 'value',
      key: 'value',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Language) => (
        <Space.Compact size="small">
          <Button
            size="small"
            type="text"
            onClick={() => setSelectedData(record, ItemMode.EDIT)}
          >
            <PenIcon size={14} />
          </Button>
        </Space.Compact>
      ),
      width: 120,
      align: 'center' as const,
    },
  ];

  return (
    <Card
      className="flex flex-col h-full"
      title="Language Management"
      classNames={{
        body: 'h-full overflow-y-auto my-2',
      }}
      extra={
        <Space>
          <Button onClick={handleCreateCode} icon={<Code />}>
            Add Code
          </Button>
          <Button onClick={handleCreateCountry} icon={<Globe />}>
            Add Country
          </Button>
          <Button type="primary" onClick={handleCreateLanguage}>
            <PlusIcon /> Add Language
          </Button>
        </Space>
      }
    >
      <Flex gap={16} vertical className="mb-4">
        <Flex gap={8}>
          <Select
            className="w-full"
            placeholder="Filter by Language Code"
            allowClear
            value={selectedCode}
            onChange={setSelectedCode}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={languageCodes?.map((lc: LanguageCode) => ({
              value: lc.code,
              label: `${lc.code} - ${lc.description}`,
            }))}
          />
          <Select
            className="w-full"
            placeholder="Filter by Country"
            allowClear
            value={selectedCountry}
            onChange={setSelectedCountry}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={languageCountries?.map((lc: LanguageCountry) => ({
              value: lc.country,
              label: `${lc.country} - ${lc.description}`,
            }))}
          />
        </Flex>
        <Text type="secondary">
          {languages?.length ?? 0} translation(s) found
        </Text>
      </Flex>
      <Table
        loading={isLoadingLanguages}
        dataSource={languages ?? []}
        columns={columns}
        rowKey="id"
        locale={{
          emptyText: (
            <Text type="secondary">
              {selectedCode || selectedCountry
                ? 'No translations found with selected filters'
                : 'No translations found. Please add some translations.'}
            </Text>
          ),
        }}
        pagination={{ pageSize: 20 }}
        size="middle"
        scroll={{ x: 'max-content' }}
      />
      <SelectedLanguageCountryModal onOk={handleOkCountry} />
      <SelectedLanguageModal
        onOk={handleOkLanguage}
        selectedCode={selectedCode}
        selectedCountry={selectedCountry}
      />
      <SelectedLanguageCodeModal onOk={handleOkCode} />
    </Card>
  );
}
