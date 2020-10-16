import tDateValue from './t-date-value';
import tImageValue from './t-image-value';
import tNumberValue from './t-number-value';
import tPercentValue from './t-percent-value';
import tTextValue from './t-text-value';

export default (type) => {
  switch (type){
    case 'date': return tDateValue;
    case 'image': return tImageValue;
    case 'number': return tNumberValue;
    case 'percent': return tPercentValue;
    case 'text': return tTextValue;
  }
}
