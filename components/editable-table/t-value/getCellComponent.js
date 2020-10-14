import tImageValue from './t-image-value';
import tNumberValue from './t-number-value';
import tTextValue from './t-text-value';

export default (type) => {
  switch (type){
    case 'image': return tImageValue;
    case 'number': return tNumberValue;
    case 'text': return tTextValue;
  }
}
