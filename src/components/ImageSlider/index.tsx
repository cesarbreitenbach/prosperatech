import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Dimensions, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ImageSliderProps {
    data: any;
    autoPlayInterval: number;
    handleClick: (item: any) => void;
}

const ImageSlider = ({ data, autoPlayInterval, handleClick }: ImageSliderProps) => {
  const flatListRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width: screenWidth } = Dimensions.get('window');

  useEffect(() => {
    const timer = setInterval(() => {
      // Move para o próximo item no intervalo de autoPlayInterval
      flatListRef.current.scrollToIndex({
        animated: true,
        index: (currentIndex + 1) % data.length,
      });
    }, autoPlayInterval);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(timer);
  }, [currentIndex]);

  const renderItem = ({ item }: any) => {
    return (
    <TouchableOpacity style={{ width: screenWidth }} activeOpacity={0.7} onPress={() => handleClick(item)}>
      <Image source={item.img} style={styles.bannerImage} resizeMode='contain'/>
    </TouchableOpacity>
  )};

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    // Atualiza o índice atual quando um novo item está visível
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToInterval={screenWidth}
      decelerationRate="fast"
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      contentContainerStyle={{height: 250, marginTop: -50}}
    />
  );
};

const styles = StyleSheet.create({
  bannerImage: {
    width: 400
  },
});

export default React.memo(ImageSlider);

