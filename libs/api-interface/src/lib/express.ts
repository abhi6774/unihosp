import { Request as ERequest, Response as EResponse } from 'express';
import { AccessTokenData } from './accesstoken-data';

export type Request = ERequest & {
  user: AccessTokenData;
};

export type Respone = EResponse;
