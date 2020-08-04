import { ResponseParameters } from './telegram-types';

export type APIResponse = {
  ok: boolean;
  error_code?: number;
  description?: string;
  result?: any;
  parameters?: ResponseParameters;
};
