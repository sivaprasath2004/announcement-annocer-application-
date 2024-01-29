import React, { Component } from "react";
import { View } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";

class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "#FFFFFF",
      swatchesOnly: false,
      swatchesLast: false,
      swatchesEnabled: [],
      disc: false,
    };
  }

  onColorChange = (color) => {
    console.log("");
  };

  onColorChangeComplete = (color) => {
    this.props.onUpdate(color);
  };

  render() {
    return (
      <View style={{ marginTop: 30, marginBottom: 50 }}>
        <ColorPicker
          ref={(r) => {
            this.picker = r;
          }}
          color={this.state.currentColor}
          swatchesOnly={this.state.swatchesOnly}
          onColorChange={this.onColorChange}
          onColorChangeComplete={this.onColorChangeComplete}
          thumbSize={40}
          sliderSize={40}
          noSnap={true}
          row={false}
          swatchesLast={this.state.swatchesLast}
          swatches={this.state.swatchesEnabled}
          discrete={this.state.disc}
        />
      </View>
    );
  }
}

export default Picker;
