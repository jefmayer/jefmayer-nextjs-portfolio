import AmplifyIt from './amplifyit';
import Vitale from './vitale';
import Oovoo from './oovoo';
import Samsung from './samsung';
import BrtPointsApp from './brtpointsapp';
import Sunsetter from './sunsetter';
import Trainspotted from './trainspotted';
import Tumblr from './tumblr';

const getSectionComponentMap = () => (
  [
    {
      id: 'amplifyit',
      SectionComponent: AmplifyIt,
    },
    {
      id: 'samsung',
      SectionComponent: Samsung,
    },
    {
      id: 'brtpointsapp',
      SectionComponent: BrtPointsApp,
    },
    {
      id: 'sunsetter',
      SectionComponent: Sunsetter,
    },
    {
      id: 'vitale',
      SectionComponent: Vitale,
    },
    {
      id: 'oovoo',
      SectionComponent: Oovoo,
    },
    {
      id: 'trainspotted',
      SectionComponent: Trainspotted,
    },
    {
      id: 'tumblr',
      SectionComponent: Tumblr,
    },
  ]
);

export default getSectionComponentMap;
