/**
 * AntBot Controller for BBC Micro:bit V2
 * Compatible with official micro:bit iOS app gamepad
 *
 * Controls:
 * - Left wheel servo: P0
 * - Right wheel servo: P1
 * - Ram servo: P2
 *
 * Gamepad mapping:
 * - D-pad Up: Forward
 * - D-pad Down: Backward
 * - D-pad Left: Turn left
 * - D-pad Right: Turn right
 * - Button A: Trigger ram
 * - Button B: Stop (safety)
 */

// Servo configuration for FS90R continuous rotation servos
// 90 = stop, 0 = full speed one way, 180 = full speed other way
const SERVO_STOP = 90
const SERVO_FORWARD_LEFT = 0
const SERVO_REVERSE_LEFT = 180
const SERVO_FORWARD_RIGHT = 180
const SERVO_REVERSE_RIGHT = 0

// Ram servo configuration
const RAM_DOWN = 0
const RAM_UP = 45
const RAM_DELAY_MS = 150

// Initialize servos
pins.servoWritePin(AnalogPin.P0, SERVO_STOP)
pins.servoWritePin(AnalogPin.P1, SERVO_STOP)
pins.servoWritePin(AnalogPin.P2, RAM_DOWN)

// Show ready
basic.showIcon(IconNames.Heart)

// Movement functions
function stopMotors() {
    pins.servoWritePin(AnalogPin.P0, SERVO_STOP)
    pins.servoWritePin(AnalogPin.P1, SERVO_STOP)
}

function driveForward() {
    pins.servoWritePin(AnalogPin.P0, SERVO_FORWARD_LEFT)
    pins.servoWritePin(AnalogPin.P1, SERVO_FORWARD_RIGHT)
}

function driveBackward() {
    pins.servoWritePin(AnalogPin.P0, SERVO_REVERSE_LEFT)
    pins.servoWritePin(AnalogPin.P1, SERVO_REVERSE_RIGHT)
}

function turnLeft() {
    pins.servoWritePin(AnalogPin.P0, SERVO_REVERSE_LEFT)
    pins.servoWritePin(AnalogPin.P1, SERVO_FORWARD_RIGHT)
}

function turnRight() {
    pins.servoWritePin(AnalogPin.P0, SERVO_FORWARD_LEFT)
    pins.servoWritePin(AnalogPin.P1, SERVO_REVERSE_RIGHT)
}

function triggerRam() {
    pins.servoWritePin(AnalogPin.P2, RAM_UP)
    basic.pause(RAM_DELAY_MS)
    pins.servoWritePin(AnalogPin.P2, RAM_DOWN)
}

// Gamepad D-pad controls
devices.onGamepadButton(MesDpadButtonInfo.ADown, function () {
    driveForward()
    basic.showArrow(ArrowNames.North)
})

devices.onGamepadButton(MesDpadButtonInfo.AUp, function () {
    stopMotors()
    basic.showIcon(IconNames.Yes)
})

devices.onGamepadButton(MesDpadButtonInfo.CDown, function () {
    driveBackward()
    basic.showArrow(ArrowNames.South)
})

devices.onGamepadButton(MesDpadButtonInfo.CUp, function () {
    stopMotors()
    basic.showIcon(IconNames.Yes)
})

devices.onGamepadButton(MesDpadButtonInfo.DDown, function () {
    turnLeft()
    basic.showArrow(ArrowNames.West)
})

devices.onGamepadButton(MesDpadButtonInfo.DUp, function () {
    stopMotors()
    basic.showIcon(IconNames.Yes)
})

devices.onGamepadButton(MesDpadButtonInfo.BDown, function () {
    turnRight()
    basic.showArrow(ArrowNames.East)
})

devices.onGamepadButton(MesDpadButtonInfo.BUp, function () {
    stopMotors()
    basic.showIcon(IconNames.Yes)
})

// Gamepad action buttons
devices.onGamepadButton(MesDpadButtonInfo.OneDown, function () {
    triggerRam()
    basic.showIcon(IconNames.Sword)
    basic.pause(200)
    basic.showIcon(IconNames.Yes)
})

devices.onGamepadButton(MesDpadButtonInfo.TwoDown, function () {
    stopMotors()
    basic.showIcon(IconNames.No)
})

// Physical micro:bit buttons (backup controls)
input.onButtonPressed(Button.A, function () {
    triggerRam()
})

input.onButtonPressed(Button.B, function () {
    stopMotors()
    basic.showIcon(IconNames.No)
})

// Connection status
devices.onNotified(MesDeviceInfo.IncomingCall, function () {
    basic.showIcon(IconNames.Yes)
})
