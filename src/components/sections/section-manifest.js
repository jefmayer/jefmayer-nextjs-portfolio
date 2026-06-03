import AmplifyIt from './amplifyit';
import BrtPointsApp from './brtpointsapp';
import Oovoo from './oovoo';
import PetHealthTracker from './pethealthtracker';
import Samsung from './samsung';
import Sunsetter from './sunsetter';
import Trainspotted from './trainspotted';
import Tumblr from './tumblr';
import Vitale from './vitale';


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
      id: 'pethealthtracker',
      SectionComponent: PetHealthTracker,
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
