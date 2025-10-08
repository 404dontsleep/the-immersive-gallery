import createBaseService from '@/base/base.service';
import { SysConfig } from './sys-config.entity';
import { DeepPartial } from 'typeorm';
import { UnprocessableEntityException } from '@nestjs/common';
import { createAntdError } from '@/utils/antd.error';

interface ValidationError {
  name: string;
  errors: string[];
}

interface ValidationResult {
  statusCode: number;
  message: string;
  errors: ValidationError[];
}

function validateStructure(
  obj1: any,
  obj2: any,
  name = 'value',
): ValidationResult | null {
  const errors: string[] = [];

  function compare(a: any, b: any, path: string) {
    // Null check
    if (a === null || b === null) {
      if (a !== b) {
        errors.push(
          `${path} expected ${a === null ? 'null' : typeof a} but got ${b === null ? 'null' : typeof b}`,
        );
      }
      return;
    }

    // Kiểm tra typeof
    if (typeof a !== typeof b) {
      errors.push(`${path} expected ${typeof a} but got ${typeof b}`);
      return;
    }

    // Nếu là mảng
    if (Array.isArray(a) && Array.isArray(b)) {
      // Nếu một trong hai rỗng
      if (a.length === 0 && b.length === 0) return;

      // Lấy sample từ mảng không rỗng
      const sample = a[0] ?? b[0];

      // Kiểm tra tất cả phần tử của a
      a.forEach((item, index) => {
        compare(item, sample, `${path}[${index}]`);
      });

      // Kiểm tra tất cả phần tử của b
      b.forEach((item, index) => {
        compare(item, sample, `${path}[${index}]`);
      });

      return;
    }

    // Nếu một là mảng, một không phải
    if (Array.isArray(a) !== Array.isArray(b)) {
      errors.push(`${path} expected array but got ${typeof b}`);
      return;
    }

    // Nếu là object
    if (typeof a === 'object' && typeof b === 'object') {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      // Kiểm tra thiếu key trong b
      for (const key of keysA) {
        if (!(key in b)) {
          errors.push(`${path} .${key} is missing in obj2`);
        }
      }

      // Kiểm tra thừa key trong b
      for (const key of keysB) {
        if (!(key in a)) {
          errors.push(`${path} .${key} is missing in obj1`);
        }
      }

      // Kiểm tra từng key chung
      for (const key of keysA) {
        if (!(key in b)) continue;
        compare(a[key], b[key], path ? `${path}.${key}` : key);
      }
      return;
    }

    // Kiểu nguyên thủy => không so sánh giá trị, chỉ so sánh typeof (đã kiểm tra ở trên)
  }

  // Bắt đầu so sánh
  compare(obj1, obj2, name);

  // Nếu có lỗi => trả về object chuẩn
  if (errors.length > 0) {
    throw new UnprocessableEntityException({
      statusCode: 422,
      message: 'Validation failed',
      errors: [createAntdError('value', errors)],
    });
  }

  // Nếu không có lỗi => null (không có vấn đề)
  return null;
}

export class SysConfigService extends createBaseService(SysConfig) {
  async update(
    id: number,
    data: DeepPartial<SysConfig<unknown>>,
  ): Promise<SysConfig<unknown>> {
    const oldData = await this.findOne({
      where: {
        id,
      },
    });
    const { value, ...rest } = data;

    let updateData: DeepPartial<SysConfig<unknown>> = {
      ...rest,
    };

    validateStructure(oldData.value, value);
    updateData.value = value;

    return super.update(id, updateData);
  }
}
