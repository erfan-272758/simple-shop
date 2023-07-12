/* eslint-disable @typescript-eslint/ban-types */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
@Injectable()
export class ValidationPipe implements PipeTransform {
  private types: Function[] = [String, Boolean, Number, Array, Object];

  private _detectError(errors: ValidationError[], depth = 10) {
    let errs = errors,
      i = 1;
    const filteredErrors = {};
    while (errs && i <= depth) {
      errs = errs.flatMap((err) => {
        Object.entries(err?.constraints ?? {}).forEach(
          ([k, v]) =>
            (filteredErrors[k] = `${
              filteredErrors[k] ? `${filteredErrors[k]} , ` : ''
            }${v}`),
        );
        return err?.children ?? [];
      });
      i++;
    }
    return filteredErrors;
  }
  async transform(value: any, { metatype, type }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    const object =
      plainToInstance(metatype, value, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      }) ?? {};
    const errors = await validate(object, {
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    });
    if (errors.length > 0) {
      throw new BadRequestException(
        'Validation failed :' +
          Object.entries(this._detectError(errors)).reduce((prev, [k, v]) => {
            return `${prev}\n${k} : ${v}`;
          }, ''),
      );
    }
    return object;
  }
  private toValidate(metatype: Function): boolean {
    return !this.types.includes(metatype);
  }
}
