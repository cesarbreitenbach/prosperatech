import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


import logo from '../../assets/images/ceasarsLogo2.png';


import { Brand, Container, LogoPng } from './styles';
import { useAuthContext } from '../../hooks/auth';


export default function Splash(){
    
    const navigation = useNavigation<any>();
    const {user} = useAuthContext()
    const splashAnimation = useSharedValue(0);


    const brandStyle = useAnimatedStyle(() => {
        return { 
            opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1]),
            transform: [
                {
                  //   translateX: interpolate(splashAnimation.value, [0, 50], [0, -50], Extrapolate.CLAMP)
                    translateY: interpolate(splashAnimation.value, [0, 50], [0, 150], Extrapolate.CLAMP)
                }
            ]
        }
    })


    const logoStyle = useAnimatedStyle(() => {
        return { 
            opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .7, 1]),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value, [0, 50], [-150, 0], Extrapolate.CLAMP)
                },
                {
                    rotateY: `${interpolate(splashAnimation.value, [0, 50], [0, 360])}deg`
                }
            ]
        }
    });

    async function startApp(){

      if(user.active){
        if(user.resetPassword) {
          navigation.navigate('changePassword')
        } else {
          navigation.navigate('home');
        }
      } else {
        navigation.navigate('activate');
      }

    }

    useEffect(() => {
        splashAnimation.value = withTiming( 
            50, 
            {duration: 4000},
            () => {
                'worklet'
                runOnJS(startApp)()
            })
    }, [])

return (
   <Container> 
      <Animated.View style={[brandStyle, {position: 'absolute'}]}>
        <Brand>Jogue, lucre e divirta-se!!</Brand>
      </Animated.View>
      <Animated.View style={[logoStyle, {position: 'absolute'}]}> 
        <LogoPng source={logo} />
      </Animated.View>
   </Container> 
);}