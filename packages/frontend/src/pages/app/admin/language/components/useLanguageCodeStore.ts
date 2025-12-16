import createBaseContext from '@/components/BaseContext/createBaseContext';
import {
  type LanguageCode,
  type LanguageCodeDtoFindOptionsWhereDto,
} from '@api';

export default createBaseContext<
  LanguageCode,
  LanguageCodeDtoFindOptionsWhereDto
>();

