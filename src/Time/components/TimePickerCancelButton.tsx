import React from 'react'
import { Button } from "react-native-paper";
import type { ITimePickerButtonProps } from "./TimePickerComponentInterfaces";

const TimePickerCancelButton = (props: ITimePickerButtonProps) => {
  return (
    <Button
      mode="contained"
      onPress={props.onPress}
      style={[
        {
          borderRadius: 100,    
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          backgroundColor: "#2D508F",
          borderColor: 'black'
        },
        props.style,
      ]}
      contentStyle={{
        padding: 10
      }}
      uppercase
    >
      {props.text ?? "PERUUTA"}
    </Button>
  )
}

export default TimePickerCancelButton;
