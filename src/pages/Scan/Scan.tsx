import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Toast, Icon, Flex } from '@ant-design/react-native';
import { RNCamera } from "react-native-camera";
import BarcodeMask from "react-native-barcode-mask";
import { connect } from '../../utils/dva';
import theme from '../../styles/theme';

interface IProps {
  dispatch
}

interface IState {
  flash: boolean;
}
class Scan extends Component<IProps, IState> {
  static navigationOptions = {
    // header: null
    headerTitle: '二维码/条码',
    headerTransparent: true,
    headerTintColor: '#fff',
    headerMode: 'float',
    headerLeftContainerStyle: {
      zIndex: 999
    }
  };
  camera = null;
  reading = false
  state = {
    flash: false
  };
  onBarCodeRead = (event) => {
    console.log('scanner event',event);
    if (this.reading) return
    if (event && event.data) {
      const { dispatch } = this.props

      this.reading = true
      dispatch({
        type: 'app/resolveScanData',
        payload: {
          data: event.data
        }
      }).then((result) => {
        if (result === false) {
          Toast.fail('请扫描正确的条码~')
        }
        this.reading = false
      })
    } else {
      Toast.fail('扫码错误')
    }
  }
  componentDidMount() {

  }

  onSwitchFlash = () => {
    this.setState(({ flash }) => ({
      flash: !flash
    }))
  }
  startAnimation = () => {
    // this.state.moveAnim.setValue(0);
    // Animated.timing(this.state.moveAnim, {
    //   toValue: -200,
    //   duration: 1500,
    //   easing: Easing.linear
    // }).start(() => this.startAnimation());
  };
  render() {
    const { flash } = this.state
    const { off, torch } = RNCamera.Constants.FlashMode
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={flash ? torch : off}
        onBarCodeRead={this.onBarCodeRead}
        captureAudio={false}
      >
        <BarcodeMask
          edgeColor={"#62B1F6"}
          showAnimatedLine={true}
          animatedLineColor="#108ee9"
        />

        <Flex style={styles.rectangleContainer} direction="column" justify="center" align="center">
          <Text style={styles.rectangleText}>
            将二维码放入框内，即可自动扫描
          </Text>
          <TouchableOpacity onPress={this.onSwitchFlash} style={styles.flash}>
            {/* <Text>{flash ? '关闭闪光灯' : '轻触点亮'}</Text> */}
            <Icon name="bulb" size={34} color={flash ? theme.brand_primary : theme.color_text_caption }/>
          </TouchableOpacity>
        </Flex>
      </RNCamera>
    );
  }
}

export default connect(() => ({}))(Scan);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },

  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    transform: [
      { translateY: 170 }
    ]
  },
  rectangleText: {
    flex: 0,
    color: "#fff",
    marginTop: 10
  },
  flash: {
    marginTop: 30
  }
});
