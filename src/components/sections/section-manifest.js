import AmplifyIt from './amplifyit';
import Graber from './graber';
import Oovoo from './oovoo';
import Samsung from './samsung';
import SwfCorp from './swfcorp';
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
      id: 'graber',
      SectionComponent: Graber,
    },
    {
      id: 'oovoo',
      SectionComponent: Oovoo,
    },
    {
      id: 'swfcorp',
      SectionComponent: SwfCorp,
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
