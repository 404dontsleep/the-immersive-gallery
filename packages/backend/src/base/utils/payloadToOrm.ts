import {
  FindManyOptions,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Like,
} from 'typeorm';
import { IFindManyOptions } from './createFindManyOptionsDto';

export function payloadToOrm(options?: IFindManyOptions): FindManyOptions<any> {
  const resultWhere: FindManyOptions<any>['where'] = [];
  if (options?.where) {
    for (const where of Array.isArray(options?.where)
      ? options?.where
      : [options?.where]) {
      Object.keys(where).forEach(fieldKey => {
        const value = where[fieldKey];
        if (value) {
          Object.keys(value).forEach(queryKey => {
            switch (queryKey) {
              case 'in':
                if (Array.isArray(value[queryKey])) {
                  resultWhere.push({ [fieldKey]: In(value[queryKey]) });
                }
                break;
              case 'notIn':
                if (Array.isArray(value[queryKey])) {
                  resultWhere.push({ [fieldKey]: Not(In(value[queryKey])) });
                }
                break;
              case 'gt':
                resultWhere.push({ [fieldKey]: MoreThan(value[queryKey]) });
                break;
              case 'lt':
                resultWhere.push({ [fieldKey]: LessThan(value[queryKey]) });
                break;
              case 'isNull':
                if (value[queryKey]) {
                  resultWhere.push({ [fieldKey]: IsNull() });
                } else {
                  resultWhere.push({ [fieldKey]: Not(IsNull()) });
                }
                break;
              case 'isNotNull':
                if (value[queryKey]) {
                  resultWhere.push({ [fieldKey]: Not(IsNull()) });
                } else {
                  resultWhere.push({ [fieldKey]: IsNull() });
                }
                break;
              case 'gte':
                resultWhere.push({
                  [fieldKey]: MoreThanOrEqual(value[queryKey]),
                });
                break;
              case 'lte':
                resultWhere.push({
                  [fieldKey]: LessThanOrEqual(value[queryKey]),
                });
                break;
              case 'contains':
                if (typeof value[queryKey] === 'string') {
                  resultWhere.push({
                    [fieldKey]: Like(`%${value[queryKey]}%`),
                  });
                }
                break;
            }
          });
        }
      });
    }
  }
  return {
    skip: options?.skip,
    take: options?.take,
    withDeleted: options?.withDeleted,
    where:
      resultWhere.length === 0
        ? undefined
        : resultWhere.length === 1
          ? resultWhere[0]
          : resultWhere,
  };
}
