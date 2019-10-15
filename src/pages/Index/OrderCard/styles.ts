import { StyleSheet } from "react-native";
import theme from '../../../styles/theme';

export default StyleSheet.create({
  btnItem: {
    marginRight: 10,
    height: 30
  },
  addressTitle: {
    fontWeight: "600",
    color: "#333",
    fontSize: 14
  },
  addressDetail: {
    paddingVertical: 2
  },

  btn: {
    fontSize: 14,
    color: "#fff"
  },
  btnContainer: {
    height: 30,
    overflow: "hidden",
    borderRadius: 4,
    marginTop: 5,  
  },
  btnContainer_primary: {
    backgroundColor: theme.primary_button_fill
  },
  btnContainer_success: {
    backgroundColor: theme.button_color_success
  },
  btnDisabledContainer: {
    backgroundColor: "grey"
  },

});
