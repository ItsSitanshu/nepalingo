import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: 'slide1',
    title: 'Learn and Preserve Nepal\'s Indigenous Languages',
    text: 'Discover and learn the rich heritage of Nepal’s native languages.',
    image: require('@/assets/images/slide1.png'), // replace with your images
  },
  {
    key: 'slide2',
    title: 'Interactive Lessons',
    text: 'Engage with fun lessons designed to improve your skills.',
    image: require('@/assets/images/slide2.png'),
  },
  {
    key: 'slide3',
    title: 'Track Your Progress',
    text: 'Stay motivated with your XP and progress tracking.',
    image: require('@/assets/images/slide3.png'),
  },
];

export default function OnboardingScreen({ navigation }) {
  const [hoveredGetStarted, setHoveredGetStarted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showChoice, setShowChoice] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current; // horizontal slider

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => setShowSplash(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      Animated.timing(slideAnim, {
        toValue: -currentSlide * width,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [currentSlide, showSplash]);

  useEffect(() => {
    if (!showSplash && !showChoice) {
      if (currentSlide < slides.length - 1) {
        const slideTimer = setTimeout(() => {
          setCurrentSlide((prev) => prev + 1);
        }, 3000);
        return () => clearTimeout(slideTimer);
      } else {
        const choiceTimer = setTimeout(() => {
          setShowChoice(true);
        }, 10000);
        return () => clearTimeout(choiceTimer);
      }
    }
  }, [currentSlide, showSplash, showChoice]);

  if (showSplash) {
    return (
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        <Text style={styles.splashText}>Nepalingo</Text>
      </Animated.View>
    );
  }

  if (showChoice) {
    return (
      <View style={styles.choiceContainer}>
        <Text style={styles.choiceTitle}>Get Started with Nepalingo</Text>
        <TouchableOpacity
          style={styles.choiceButton}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.choiceButtonText}>New User? Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.choiceButton, styles.choiceButtonOutline]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.choiceButtonOutlineText}>Have an Account? Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentSlide ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
      <Animated.View
        style={[
          styles.slider,
          {
            width: width * slides.length,
            transform: [{ translateX: slideAnim }],
          },
        ]}>
        {slides.map(({ key, title, text, image }, index) => (
          <View key={key} style={styles.slide}>
            <Image source={image} style={styles.slideImage} />
            <View style={styles.slideTextContainer}>
              <Text style={styles.slideTitle}>{title}</Text>
              <Text style={styles.slideText}>{text}</Text>
              <Pressable
                onHoverIn={() => setHoveredGetStarted(true)}
                onHoverOut={() => setHoveredGetStarted(false)}
                style={[
                  hoveredGetStarted
                    ? styles.getStartedButtonHovered
                    : styles.getStartedButton,
                ]}
              >
                <Text
                  style={[
                    styles.getStartedText,
                    hoveredGetStarted && styles.getStartedTextHovered,
                  ]}
                >
                  Get Started
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: Colors.madder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  sliderContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#fff',
  },
  slider: {
    flexDirection: 'row',
    height: '100%',
  },
  slide: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  slideImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  slideTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '32%',
    backgroundColor: Colors.black_90,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  slideTitle: {
    marginTop: 30,
    fontSize: 24,
    textAlign: 'center',
    width: '90%',
    marginBottom: 8,
    color: Colors.white,
    fontFamily: 'bl-reg',
  },
  slideText: {
    fontSize: 16,
    color: '#999',
    width: '80%',
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: Colors.mrwood,
    marginBottom: 16,
    textAlign: 'left',
    fontFamily: 'bl-medit',
  },
  getStartedButton: {
    backgroundColor: Colors.mrwood,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  getStartedButtonHovered: {
    backgroundColor: '#fff',
  },
  getStartedText: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'bl-black',
    color: '#fff',
  },
  getStartedTextHovered: {
    color: Colors.africanviolet,
  },
  pagination: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  dot: {
    width: 100,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.madder,
  },
  choiceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  choiceTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 40,
  },
  choiceButton: {
    backgroundColor: Colors.blackbean,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  choiceButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.madder,
  },
  choiceButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  choiceButtonOutlineText: {
    color: Colors.madder,
    fontWeight: '600',
    fontSize: 18,
  },
});
