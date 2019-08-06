import React from 'react';
import { View, Text, TextInput } from 'react-native';

// const MAX_LENGTH = 500;
const COMPOSER_HEIGHT = 200;

export default class TextInputC extends React.Component {
  static defaultProps = {
    ...TextInput.defaultProps,
    maxLength: 200,
    remainLength: 200
  };
  constructor(props) {
    super(props);
    this.state = {
      COMPOSER_HEIGHT: props.COMPOSER_HEIGHT || 200,
      selection: { start: 0, end: 0 }
    };
  }
  render() {
    const { COMPOSER_HEIGHT, selection } = this.state;
    const { remainLength, MAX_LENGTH, ...others } = this.props;
    console.log(remainLength, MAX_LENGTH);
    return (
      <View style={{ height: COMPOSER_HEIGHT }}>
        <TextInput
          ref={component => (this._textInput = component)}
          autoCapitalize={'none'}
          returnKeyType={'done'}
          maxLength={MAX_LENGTH}
          blurOnSubmit={true}
          multiline={true}
          textInputAutoFocus={true}
          // onSubmitEditing={this.props.onSubmitEditing}
          // onChange={this.onContentSizeChange}
          // onContentSizeChange={this.onContentSizeChange}
          enablesReturnKeyAutomatically
          underlineColorAndroid="transparent"
          selection={selection}
          onSelectionChange={({ nativeEvent: { selection } }) => {
            this.setState({ selection });
          }}
          {...others}
          // onFocus={_ => this.onTogglePress(false, true)}
          // onBlur={_ => this.onTogglePress(undefined, false)}
        />
        <Text
          style={{
            color: remainLength <= 0 ? 'red' : '#337ab7',
            textAlign: 'right'
          }}
        >
          {remainLength}
        </Text>
      </View>
    );
  }
}
