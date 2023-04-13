import * as React from 'react'
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native'

import { IconButton, overlay, useTheme } from 'react-native-paper'
import type {
  Fonts,
  MD3Typescale,
} from 'react-native-paper/lib/typescript/types'

import {
  Button,
  IconButton,
  MD2Theme,
  overlay,
  useTheme,
} from 'react-native-paper'

import TimePicker from './TimePicker'
import {
  clockTypes,
  getTimeInputTypeIcon,
  inputTypes,
  PossibleClockTypes,
  PossibleInputTypes,
  reverseInputTypes,
} from './timeUtils'
import TimePickerCancelButton from './components/TimePickerCancelButton'
import TimePickerConfirmButton from './components/TimePickerConfirmButton'

const supportedOrientations: (
  | 'portrait'
  | 'portrait-upside-down'
  | 'landscape'
  | 'landscape-left'
  | 'landscape-right'
)[] = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
]

export function TimePickerModal({
  visible,
  onDismiss,
  onConfirm,
  hours,
  minutes,
  label = 'Select time',
  uppercase = true,
  cancelLabel = 'Cancel',
  confirmLabel = 'Ok',
  animationType = 'none',
  locale,
  keyboardIcon = 'keyboard-outline',
  clockIcon = 'clock-outline',
  use24HourClock,
  inputFontSize,
}: {
  locale?: undefined | string
  label?: string
  uppercase?: boolean
  cancelLabel?: string
  confirmLabel?: string
  hours?: number | undefined
  minutes?: number | undefined
  visible: boolean | undefined
  onDismiss: () => any
  onConfirm: (hoursAndMinutes: { hours: number; minutes: number }) => any
  animationType?: 'slide' | 'fade' | 'none'
  keyboardIcon?: string
  clockIcon?: string
  use24HourClock?: boolean
  inputFontSize?: number
}) {
  const theme = useTheme()

  let textFont
  let labelText = label

  if (theme.isV3) {
    textFont = theme.fonts.labelMedium
  } else {
    textFont = (theme as any as MD2Theme)?.fonts.medium
  }

  const [inputType, setInputType] = React.useState<PossibleInputTypes>(
    inputTypes.keyboard
  )
  const [focused, setFocused] = React.useState<PossibleClockTypes>(
    clockTypes.hours
  )
  const [localHours, setLocalHours] = React.useState<number>(getHours(hours))
  const [localMinutes, setLocalMinutes] = React.useState<number>(
    getMinutes(minutes)
  )

  if (inputType === inputTypes.keyboard && !label) {
    labelText = 'Enter time'
  }

  React.useEffect(() => {
    setLocalHours(getHours(hours))
  }, [setLocalHours, hours])

  React.useEffect(() => {
    setLocalMinutes(getMinutes(minutes))
  }, [setLocalMinutes, minutes])

  const onFocusInput = React.useCallback(
    (type: PossibleClockTypes) => setFocused(type),
    []
  )
  const onChange = React.useCallback(
    (params: {
      focused?: PossibleClockTypes | undefined
      hours: number
      minutes: number
    }) => {
      if (params.focused) {
        setFocused(params.focused)
      }

      setLocalHours(params.hours)
      setLocalMinutes(params.minutes)
    },
    [setFocused, setLocalHours, setLocalMinutes]
  )
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
      presentationStyle="overFullScreen"
      supportedOrientations={supportedOrientations}
      statusBarTranslucent={true}
    >
      <>
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View
            style={[
              StyleSheet.absoluteFill,
              styles.modalBackground,
              { backgroundColor: theme.colors?.backdrop },
            ]}
          />
        </TouchableWithoutFeedback>
        <View
          style={[StyleSheet.absoluteFill, styles.modalRoot]}
          pointerEvents="box-none"
        >
          <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={'padding'}
          >
            <Animated.View
              style={[
                styles.modalContent,
                {
                  backgroundColor:
                    theme.dark && theme.isV3
                      ? theme.colors.elevation.level3
                      : theme.isV3
                      ? theme.colors.surface
                      : theme.dark
                      ? overlay(10, theme.colors.surface)
                      : theme.colors.surface,
                  borderRadius: theme.isV3
                    ? theme.roundness * 6
                    : theme.roundness,
                },
              ]}
            >
              <ImageBackground source={require("./assets/modal-bg-2.jpg")}>
                <View style={styles.labelContainer}>
                  <Text
                    style={[
                      styles.label,
                      {
                        ...textFont,                        
                        letterSpacing: 1,
                        fontSize: 15,                        
                        color: "white"
                      },
                    ]}
                  >
                    {uppercase ? label.toUpperCase() : label}
                  </Text>
                </View>
                <View style={styles.timePickerContainer}>
                  <TimePicker
                    locale={locale}
                    inputType={inputType}
                    focused={focused}
                    hours={localHours}
                    minutes={localMinutes}
                    onChange={onChange}
                    onFocusInput={onFocusInput}
                  />
                </View>
                <View style={styles.bottom}>
                  <IconButton
                    icon={getTimeInputTypeIcon(inputType, {
                      keyboard: keyboardIcon,
                      picker: clockIcon,
                    })}
                    onPress={() => setInputType(reverseInputTypes[inputType])}
                    size={24}
                    style={styles.inputTypeToggle}
                    accessibilityLabel="toggle keyboard"
                    color='white'
                  />
                  <View style={styles.fill} />
                  <TimePickerCancelButton 
                    onPress={onDismiss}
                    text={cancelLabel}
                    style={{marginRight: 20}}
                  />
                  <TimePickerConfirmButton 
                    onPress={() =>
                      onConfirm({ hours: localHours, minutes: localMinutes })
                    }
                    text={confirmLabel}
                  />
                </View>
              </ImageBackground>

            </Animated.View>
          </KeyboardAvoidingView>
        </View>
      </>
    </Modal>
  )
}

function getMinutes(minutes: number | undefined | null): number {
  return minutes === undefined || minutes === null
    ? new Date().getMinutes()
    : minutes
}
function getHours(hours: number | undefined | null): number {
  return hours === undefined || hours === null ? new Date().getHours() : hours
}

const styles = StyleSheet.create({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  keyboardView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalBackground: {
    flex: 1,
  },
  modalContent: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 3,
    minWidth: 287,
    paddingVertical: 8,
  },
  labelContainer: {
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
  },
  label: {
    letterSpacing: 1,
    fontSize: 13,
  },
  timePickerContainer: {
    paddingLeft: 24,
    paddingTop: 20,
    paddingBottom: 16,
    paddingRight: 24,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  inputTypeToggle: { margin: 4 },
  fill: { flex: 1 },
})

export default React.memo(TimePickerModal)
