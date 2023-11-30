import { BannersEffects } from './banners.effects';
/* eslint-disable @typescript-eslint/naming-convention */
import { UserEffects } from './user.effects';
import { ItemEffects } from './item.effects';
import { RatingEffects } from './rating.effects';
import { ExpertEffects } from './expert.effects';
import { FinishedEffects } from './finished.effects';
import { CancelledEffects } from './cancelled.effects';
import { ScoreEffects } from './score.effects';


export const EffectsArray: any[] = [
  UserEffects,
  ItemEffects,
  ExpertEffects,
  RatingEffects,
  FinishedEffects,
  CancelledEffects,
  BannersEffects,
  ScoreEffects,
];
