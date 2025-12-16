import createBaseContext from '@/components/BaseContext/createBaseContext';
import { type Language, type LanguageDtoFindOptionsWhereDto } from '@api';

export default createBaseContext<Language, LanguageDtoFindOptionsWhereDto>();

