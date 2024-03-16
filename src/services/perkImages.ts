import { ImageSourcePropType } from 'react-native';
import picaretaFerro from '../assets/images/picaretaFerro.png';
import picaretaOuro from '../assets/images/picaretaOuro.png';
import upgradeMina from '../assets/images/upgradeMina.png';

interface IPerkImages {
    [key: number]: ImageSourcePropType; 
}

export const mapPerkImages : IPerkImages = {
    1: picaretaFerro,
    2: picaretaOuro,
    3: upgradeMina
}