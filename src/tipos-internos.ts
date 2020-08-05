import { ResponseParameters } from './types';

export type APIResponse = {
  ok: boolean;
  error_code?: number;
  description?: string;
  result?: any;
  parameters?: ResponseParameters;
};
