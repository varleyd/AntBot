/**
 * AntBot Controller for BBC Micro:bit V2
 * Compatible with EV-Micro:bit iOS app
 *
 * Servos:
 * - P0: Left wheel (FS90R continuous)
 * - P1: Right wheel (FS90R continuous)
 * - P2: Ram servo
 */

// Servo configuration for FS90R continuous rotation servos
const SERVO_STOP = 90
const SERVO_FORWARD_LEFT = 0
const SERVO_REVERSE_LEFT = 180
const SERVO_FORWARD_RIGHT = 180
const SERVO_REVERSE_RIGHT = 0

// Ram servo
const RAM_DOWN = 0
const RAM_UP = 45
const RAM_DELAY_MS = 150

let data = ""

// Initialize servos
pins.servoWritePin(AnalogPin.P0, SERVO_STOP)
pins.servoWritePin(AnalogPin.P1, SERVO_STOP)
pins.servoWritePin(AnalogPin.P2, RAM_DOWN)

// Start Bluetooth UART
bluetooth.startUartService()
basic.showIcon(IconNames.Heart)

// Connection handlers
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
})

bluetooth.onBluetoothDisconnected(function () {
    stopMotors()
    basic.showIcon(IconNames.No)
})

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

// Receive commands from EV-Micro:bit app (hash delimited)
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))

    // Process commands - adjust these based on what the app sends
    if (data == "F" || data == "f" || data == "forward") {
        driveForward()
        basic.showArrow(ArrowNames.North)
    } else if (data == "B" || data == "b" || data == "backward") {
        driveBackward()
        basic.showArrow(ArrowNames.South)
    } else if (data == "L" || data == "l" || data == "left") {
        turnLeft()
        basic.showArrow(ArrowNames.West)
    } else if (data == "R" || data == "r" || data == "right") {
        turnRight()
        basic.showArrow(ArrowNames.East)
    } else if (data == "S" || data == "s" || data == "stop") {
        stopMotors()
        basic.showIcon(IconNames.Happy)
    } else if (data == "A" || data == "a" || data == "action") {
        triggerRam()
        basic.showIcon(IconNames.Sword)
        basic.pause(100)
        basic.showIcon(IconNames.Happy)
    } else if (data == "Z" || data == "z") {
        // Action button released - ram already returned, just show ready
        basic.showIcon(IconNames.Happy)
    }
})

// Physical buttons for testing
input.onButtonPressed(Button.A, function () {
    triggerRam()
})

input.onButtonPressed(Button.B, function () {
    stopMotors()
})

basic.forever(function () {
    // Main loop empty - all logic is event-driven
})
