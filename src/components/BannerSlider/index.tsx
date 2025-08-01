import React, { useEffect, useState } from 'react';
// import { ImageSlider } from "react-native-image-slider-banner";


import { Container } from './styles';
import { ImageSourcePropType } from 'react-native';
import { DataType } from 'react-native-image-slider-banner/src';
import { useNavigation } from '@react-navigation/native';
import {banners} from '../../services/bannerImages';
import ImageSlider from '../ImageSlider';

interface IBannerList {
    img: ImageSourcePropType
}


const BannerSlider: React.FC = () => {
    const navigation = useNavigation<any>()
    const [bannerList, setBannerList] = useState<IBannerList[]>(() => {
        const parsedArray: IBannerList | any = [];

        // Itera sobre cada item do array original
        banners.forEach(banner => {
            // Adiciona um novo objeto à lista no formato desejado
            parsedArray.push({ img: banner.image });
        });

        return parsedArray;
    });

    // Função para buscar a rota com base na imagem
    const getRouteByImage = (image: any) => {
        // Filtra o array para encontrar o objeto com a imagem correspondente
        const foundBanner = banners.find(banner => banner.image === image);
        // Retorna a rota se encontrada, senão retorna uma string vazia
        return foundBanner ? foundBanner.route : "";
    };

   
   
    const handleClick = (item: DataType) => {
        const route = getRouteByImage(item.img);
        if(route === "") return;
        navigation.navigate(route)
    }

    return (
    <Container>
        <ImageSlider 
                      data={bannerList}
                      autoPlayInterval={5000}
                      handleClick={handleClick}
                        
        />
 
    </Container>)
}

export default React.memo(BannerSlider);