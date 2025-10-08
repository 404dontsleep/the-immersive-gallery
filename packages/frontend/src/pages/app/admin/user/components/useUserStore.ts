import createBaseContext from '@/components/BaseContext/createBaseContext';
import { type User, type UserDtoFindOptionsWhereDto } from '@api';

export default createBaseContext<User, UserDtoFindOptionsWhereDto>();
