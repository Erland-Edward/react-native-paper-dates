import React from 'react'
import type { ITimePickerButtonProps } from "./TimePickerComponentInterfaces"
import { Button } from "react-native-paper";

const TimePickerConfirmButton = (props: ITimePickerButtonProps) => {
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
          backgroundColor: "#3DCB51",
          borderColor: "#4472C4",
        },        
        props.style,
      ]}
      contentStyle={{padding: 10}}
      uppercase
    >
      Valmis
    </Button>
  )
}

export default TimePickerConfirmButton;