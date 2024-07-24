import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
export declare class AppFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
