import createBaseContext from '@/components/BaseContext/createBaseContext';
import {
  type LanguageCountry,
  type LanguageCountryDtoFindOptionsWhereDto,
} from '@api';

export default createBaseContext<
  LanguageCountry,
  LanguageCountryDtoFindOptionsWhereDto
>();

