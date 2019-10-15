import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  BackHandler,
  Picker
} from "react-native";
import { Flex, WhiteSpace, WingBlank, Icon, PickerView } from "@ant-design/react-native";
import { connect } from "../../utils/dva";
import strorge from "../../utils/strorge";
// import navigation from "../../utils/navigation";
import images from "../../assets/images";
import { boxShadow } from "../../styles";
import RadioForm from '../../components/SimpleRadioButton/SimpleRadioButton';

interface IProps {
  dispatch;
  navigation;
}
interface IState {
  userName: any;
  password: any;
  phone: any;
  code: any;
  [key: string]: any;
  isEyePwd: boolean;
  role: any
}
type FormKey = "account" | "password" | "phone" | "code" | "userName";

const Role = [
    {
      label: '骑手',
      value: 2,
    },
    {
      label: 'PDA',
      value: 4,
    },
    {
      label: '干线司机',
      value: 3
    }
];

class Login extends Component<IProps, IState> {
  static navigationOptions = {
    header: null
  };
  public pwdRef = null;
  public accountRef = null;

  state = {
    userName: "",
    password: "",
    phone: "",
    code: "",
    isEyePwd: false,
    accountError: null,
    passwordError: null,
    role: 1
  };

  componentDidMount() {
    strorge.get("account", "").then(val => {
      this.setState({ userName: val.toString() });
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    return true;
  };

  _signInAsync = async () => {
    const { userName, password, role } = this.state;
    const userType = role;

    try {
      await strorge.set("account", userName);
    } catch (e) {
      console.log("save-err", e);
    }

    const { dispatch } = this.props;
    dispatch({
      type: "user/onLogin",
      payload: { userName, password, userType }
    });
    // navigation.navigate("Index");
  };

  onChangeTab = (type: 0 | 1 = 0) => {
    this.setState({ loginType: type });
  };

  InputChange = (v: any, key: FormKey) => {
    this.setState(state => {
      let errorKey = `${key}Error`;
      // const err = state[errorKey]
      return {
        [key]: v,
        [errorKey]: null
      };
    });
  };
  onSubmit = () => {
    const { userName, password } = this.state;

    if (userName.length === 0) this.setState({ accountError: "请输入账户" });
    if (password.length === 0) this.setState({ passwordError: "请输入密码" });

    if (userName.length && password.length) {
      this._signInAsync();
    }
  };

  onClearInput = (key: FormKey) => {
    this.setState({ [key]: "" });
  };

  onSwitchEyePwd = () => {
    this.setState(({ isEyePwd }) => ({ isEyePwd: !isEyePwd }));
  };

  onChange = role => {
    this.setState({
      role,
    });
  };

  // 去注册
  onRegister = () => {};

  render() {
    const {
      userName,
      password,
      phone,
      isEyePwd,
      accountError,
      passwordError
    } = this.state;
    return (
      <View style={styles.loginPage}>
        <Flex justify="center" align="center" style={{ paddingTop: 80 }}>
          <Image source={images.logoText} />
        </Flex>
        <WhiteSpace size="lg" />

        <WingBlank>
          <View>
            <View>
              <Flex justify="start" align="center" style={styles.formItem}>
                <Flex
                  justify="center"
                  align="center"
                  style={styles.formItemLeft}
                >
                  <Icon name="user" />
                  <TextInput
                    style={styles.formItemInput}
                    value={userName}
                    onChangeText={v => this.InputChange(v, "userName")}
                    placeholder="driver|rider|deliver"
                    textContentType="username"
                    maxLength={11}
                    clearButtonMode="while-editing"
                    ref={ref => {
                      this.accountRef = ref;
                    }}
                  />
                </Flex>
                <Flex justify="end" style={styles.formItemRight}>
                  {phone.length ? (
                    <TouchableOpacity
                      onPress={() => this.onClearInput("phone")}
                    >
                      <Icon name="close-circle" />
                    </TouchableOpacity>
                  ) : null}
                </Flex>
              </Flex>
              <View style={styles.formItemLebal}>
                {accountError && (
                  <Text style={styles.formItemLebalError}>{accountError}</Text>
                )}
              </View>
            </View>
            <View>
              <Flex justify="center" align="center" style={styles.formItem}>
                <Flex
                  justify="center"
                  align="center"
                  style={styles.formItemLeft}
                >
                  <Icon name="lock" />
                  <TextInput
                    style={styles.formItemInput}
                    value={password}
                    onChangeText={v => this.InputChange(v, "password")}
                    placeholder="请输入账号密码"
                    secureTextEntry={!isEyePwd}
                    ref={ref => {
                      this.pwdRef = ref;
                    }}
                    onSubmitEditing={() => this.onSubmit()}
                    maxLength={100}
                  />
                </Flex>
                <Flex justify="end" style={styles.formItemRight}>
                  {password.length ? (
                    <TouchableOpacity onPress={() => this.pwdRef.clear()}>
                      <Icon name="close-circle" />
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity onPress={this.onSwitchEyePwd}>
                    <Icon name={!isEyePwd ? "eye" : "eye-invisible"} />
                  </TouchableOpacity>
                </Flex>
              </Flex>
            </View>
            <View style={styles.formItemLebal}>
              {passwordError && (
                <Text style={styles.formItemLebalError}>{passwordError}</Text>
              )}
            </View>
          </View>

          <RadioForm
            radio_props={Role}
            initial={0}
            formHorizontal={true}
            buttonWrapStyle={{marginLeft: 10}}
            labelStyle={{width:70}}
            onPress={this.onChange}
          />

          <WhiteSpace size="lg" />

          <TouchableOpacity style={styles.subBtn} onPress={this.onSubmit}>
            <Text style={styles.subBtnText}>登录</Text>
          </TouchableOpacity>

          <WhiteSpace size="lg" />

          <Flex justify="end">
            <TouchableOpacity onPress={this.onRegister}>
              <Text style={{ color: "#888" }}>立即注册</Text>
            </TouchableOpacity>
          </Flex>
        </WingBlank>
      </View>
    );
  }
}

export default connect()(Login);

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    width: "80%",
    paddingTop: 10,
    paddingBottom: 10
  },
  formItem: {
    // paddingTop: 10,
    // paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc"
    // marginBottom:
  },
  formItemLebal: {
    paddingTop: 2,
    paddingBottom: 2,
    height: 30
  },
  formItemLebalError: {
    color: "red",
    fontSize: 12
  },
  formItemLeft: {
    width: 250
  },
  formItemRight: { width: 50 },
  formItemInput: {
    width: 200,
    marginLeft: 10
  },
  subBtn: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#4DAAAB',
    backgroundColor: "#E06E59",
    // width: 100,
    marginTop: 10,
    borderRadius: 45,
    ...boxShadow()
  },
  subBtnText: { color: "#fff" }
});
