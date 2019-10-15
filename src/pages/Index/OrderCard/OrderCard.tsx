import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from "react-native";
import {
  Card,
  Icon,
  Flex,
  WhiteSpace,
  WingBlank,
  Toast
} from "@ant-design/react-native";
import { StyleProp, ViewStyle } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import navigation from "../../../utils/navigation";
import TextBadge from "../../../components/TextBadge";
import Button from "../../../components/Button";
import { phoneCall } from "../../../utils";
import styles from "./styles";
import { RoleType } from "../../../constants";
import { postReceiptCompleted } from "../../../servers/order";

interface IProps {
  itemData: any;
  style?: StyleProp<ViewStyle>;
  onSingFor?: (itemData: any) => void;
  role: string;
  showActions?: boolean;
  onDelayAction?: (itemData: any) => void;
  dispatch
}

const formatTmlp = "YYYY-MM-DD HH:mm:ss";

const getDayjs = time =>
  time
    .split(":")
    .reduce(
      (val, str, idx) =>
        val.set(["hour", "minute", "second"][idx], parseInt(str)),
      dayjs()
    );

class OrderCard extends Component<IProps> {
  static navigationOptions = {
    header: null
  };

  now = dayjs();
  endTimeDayjs = null;
  beginTimeDayjs = null;

  componentDidMount() {
    // const { itemData: {endShippingTime} } = this.props
  }

  onCallPhone = phone => {
    phoneCall(phone);
  };

  canfirmSignFor = item => {
    const { itemData, onSingFor, dispatch } = this.props;
    var that = this;
    Alert.alert("提示", "确定要签收此单吗？", [
      { text: "取消", style: "cancel" },
      {
        text: "签收",
        onPress: () => {
          // that.receiptCompletedAct(itemData.id,onSingFor);
          dispatch({
            type: "order/onReceiptCompleted",
            payload: {
              id: itemData.id,
              onSingFor
            }
          });
        }
      }
    ]);
  };

  // receiptCompletedAct = (id,onSingFor) => {
  //   postReceiptCompleted({id}).then(res => {
  //     //签收成功
  //     Toast.info('送达成功')
  //     if(onSingFor) onSingFor();
  //   })
  // }

  onDelaySignFor = () => {
    const { itemData, onDelayAction } = this.props;
    onDelayAction(itemData.id);
  };

  getTimeBetween = (start: Dayjs, end: Dayjs) => {
    const template = "HH:mm";
    return `${start.format(template)} - ${end.format(template)}`;
  };

  isToday = (time: Dayjs) => {
    return this.now.get("date") === time.get("date");
  };

  getHeaderRender = itemData => {
    const {
      status,
      deliveryReceivingTime,
      endShippingTime,
      beginShippingTime
    } = itemData;
    // 状态。0::待提货,1:干线途中,2:待分配,3配送中,4:已完成,-1:已拒收
    switch (status) {
      case 4:
        return <Card.Header title={`送达时间：${deliveryReceivingTime}`} />;
      case 3: {
        this.endTimeDayjs =
          endShippingTime.length === 19
            ? dayjs(endShippingTime)
            : getDayjs(endShippingTime);
        this.beginTimeDayjs =
          beginShippingTime.length === 19
            ? dayjs(beginShippingTime)
            : getDayjs(beginShippingTime);
        let timeTitle = null;
        if (this.isToday(this.beginTimeDayjs)) {
          // 今天配送
          const timeRemaining = this.endTimeDayjs.diff(this.now, "minute");
          if (timeRemaining > 60) {
            // 大于一个小时；今日 HH:mm-HH:mm
            timeTitle = (
              <Flex style={{ marginLeft: 5 }}>
                <Text>今日</Text>
                <Text style={{ color: "#f40" }}>
                  {this.getTimeBetween(this.beginTimeDayjs, this.endTimeDayjs)}
                </Text>
              </Flex>
            );
          } else if (timeRemaining >= 0) {
            // 一个小时内，
            timeTitle = (
              <Flex style={{ marginLeft: 5 }}>
                <Text
                  style={{ color: "#f40" }}
                >{`${timeRemaining}分钟内`}</Text>
                <Text>送达</Text>
              </Flex>
            );
          } else {
            // 负值，已超时
            timeTitle = (
              <Flex>
                <Text>已延迟</Text>
                <Text style={{ color: "#f40" }}>{`${-timeRemaining}分钟`}</Text>
              </Flex>
            );
          }
        } else {
          // 其它日期配送
          timeTitle = `配送时间：${this.beginTimeDayjs.format(
            "MM-DD ， HH:mm"
          )}-${this.endTimeDayjs.format("HH:mm")}`;
        }

        return (
          <Card.Header
            title={timeTitle}
            thumb={<Icon name="clock-circle" color="#333" />}
          />
        );
      }
      default:
        return null;
    }
  };

  //司机头部
  getHeaderDriverRender = itemData => {
    const {
      sn,
      boxQty
    } = itemData;
    return (
      <Card.Header
        title={'作业单号：' + sn}
        extra={'箱数：' + boxQty}/>
    )
  }

  getActionsRender = itemData => {
    const { showActions = true } = this.props;
    const { status } = itemData;
    if (!showActions) return null;
    else if (status === 3) {
      return (
        <Flex justify="around">
          <View style={{ width: "40%" }}>
            <Button
              onPress={this.canfirmSignFor}
              containerStyle={[
                styles.btnContainer,
                styles.btnContainer_primary
              ]}
              disabledContainerStyle={{ backgroundColor: "grey" }}
              style={styles.btn}
            >
              签收
            </Button>
          </View>
          <View style={{ width: "40%" }}>
            <Button
              onPress={this.onDelaySignFor}
              containerStyle={[
                styles.btnContainer,
                styles.btnContainer_success
              ]}
              disabledContainerStyle={{ backgroundColor: "grey" }}
              style={styles.btn}
            >
              延迟签收
            </Button>
          </View>
        </Flex>
      );
    }

    return null;
  };

  onCardItemClick = (role) => {
    const { itemData } = this.props;
    if (role === RoleType.DELIVERY) {
      navigation.navigate("DeliveryOrderDetails",{id:itemData.id});
    } else if (role === RoleType.DRIVER) {
      navigation.navigate("DriverOrderInfo",{id:itemData.id});
    }
  }

  render() {
    const { itemData, style, role } = this.props;
    let bottomBtn = false;

    return (
      <Card full style={style}>
        {Number(role) === RoleType.DELIVERY ? this.getHeaderRender(itemData) : this.getHeaderDriverRender(itemData)}
        <Card.Body>
          <TouchableHighlight
            onPress={() => this.onCardItemClick(role)}
          >
            <View style={{ backgroundColor: "#fff" }}>
              <WingBlank>
                <Flex justify="between">
                  <View>
                    <TextBadge>
                      <Flex direction="column" align="start">
                        <View>
                          <Text style={styles.addressTitle}>
                            {itemData.custom}
                          </Text>
                        </View>
                        <View style={styles.addressDetail}>
                          <Text>{itemData.takeAddress}</Text>
                        </View>
                        <View>
                          <Text>
                            {itemData.taker}（{itemData.takerPhone}）
                          </Text>
                        </View>
                      </Flex>
                    </TextBadge>
                  </View>

                  <View>
                    <Text>{itemData.spacing ? itemData.spacing + 'km' : '--'}</Text>
                    <TouchableOpacity
                      style={{ marginTop: 5 }}
                      onPress={() => this.onCallPhone(itemData.mobile)}
                    >
                      <Icon name="phone" color="#2d8cf0" size={24} />
                    </TouchableOpacity>
                  </View>
                </Flex>

                <WhiteSpace size="sm" />

                <Flex justify="between">
                  <TextBadge color="success" style={{ maxWidth: "80%" }}>
                    <Flex direction="column" align="start">
                      <View>
                        <Text style={styles.addressTitle}>
                          {itemData.address}
                        </Text>
                      </View>
                      {/* <View style={styles.addressDetail}>
                        <Text numberOfLines={10}>{itemData.address}</Text>
                      </View> */}
                      <View>
                        <Text>
                          {itemData.consignee}（{itemData.mobile}）
                        </Text>
                      </View>
                    </Flex>
                  </TextBadge>
                  <View style={{ maxWidth: "20%" }}>
                    <Text>{itemData.shippingPointSpacing ? itemData.shippingPointSpacing + 'km' : '--'}</Text>
                    <TouchableOpacity
                      style={{ marginTop: 5 }}
                      onPress={() => this.onCallPhone(itemData.mobile)}
                    >
                      <Icon name="phone" color="#2d8cf0" size={24} />
                    </TouchableOpacity>
                  </View>
                </Flex>
              </WingBlank>
              <WhiteSpace size="sm" />
            </View>
          </TouchableHighlight>

          {Number(role) === RoleType.DELIVERY &&  this.getActionsRender(itemData)}
        </Card.Body>

        {/* <Card.Footer extra={btns} /> */}
      </Card>
    );
  }

}

export default OrderCard;
