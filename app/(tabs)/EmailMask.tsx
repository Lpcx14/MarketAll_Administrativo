import { FontAwesome5 } from "@expo/vector-icons";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  email: string;
};

type State = {
  masked: boolean;
};

export default class EmailMask extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // estado inicial
    this.state = {
      masked: true,
    };
  }

  // método da classe → mascara o email
  maskEmail(email: string) {
    return "*".repeat(email.length);
  }

  // alterna o estado
  toggleMask = () => {
    this.setState({ masked: !this.state.masked });
  };

  render() {
    const { email } = this.props;
    const { masked } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {masked ? this.maskEmail(email) : email}
        </Text>

        <TouchableOpacity onPress={this.toggleMask}>
          <FontAwesome5
            name={masked ? "eye-slash" : "eye"}
            size={16}
            color="#333"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 14,
  },
});
