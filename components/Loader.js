import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.spinAnimation = null;
  }

  componentDidMount() {
    this.spin();
  }

  componentWillUnmount() {
    if (this.spinAnimation) {
      this.spinAnimation.stop();
    }
  }

  spin() {
    this.spinValue.setValue(0);
    this.spinAnimation = Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
      isInteraction: false,
      easing: Easing.linear,
    });
    this.spinAnimation.start(() => this.spin());
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 0.1, 0.2],
      outputRange: ["0deg", "180deg", "360deg"],
    });
    const reverse = this.spinValue.interpolate({
      inputRange: [0, 0.1, 0.2],
      outputRange: ["0deg", "-180deg", "-360deg"],
    });
    return (
      <View style={styles.loader}>
        <Animated.View
          style={[styles.after, { transform: [{ rotate: reverse }] }]}
        />
        <Animated.View
          style={[styles.before, { transform: [{ rotate: spin }] }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    position: "relative",
  },
  after: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 10,
    borderRadius: 25,
    borderTopColor: "blue",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderBottomColor: "blue",
    mixBlendMode: "darken",
    zIndex: 3,
  },
  before: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 5,
    borderRadius: 50,
    borderRightColor: "red",
    borderLeftColor: "blue",
    borderTopColor: "white",
    borderBottomColor: "white",
    mixBlendMode: "darken",
    zIndex: 5,
  },
});

export default Loader;
