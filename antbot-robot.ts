/**
 * AntBot ROBOT Code (runs on the robot's micro:bit)
 * Receives radio commands and controls servos
 *
 * Servos:
 * - P0: Left wheel (FS90R continuous)
 * - P1: Right wheel (FS90R continuous)
 * - P2: Ram servo
 */

// Radio setup - both micro:bits must use the same group
radio.setGroup(42)
radio.setTransmitPower(7)

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

// Initialize servos to stopped
pins.servoWritePin(AnalogPin.P0, SERVO_STOP)
pins.servoWritePin(AnalogPin.P1, SERVO_STOP)
pins.servoWritePin(AnalogPin.P2, RAM_DOWN)

// Show "R" for Robot
basic.showString("R")
basic.pause(500)
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

// Receive radio commands
radio.onReceivedString(function (receivedString) {
    if (receivedString == "F") {
        driveForward()
        basic.showArrow(ArrowNames.North)
    } else if (receivedString == "B") {
        driveBackward()
        basic.showArrow(ArrowNames.South)
    } else if (receivedString == "L") {
        turnLeft()
        basic.showArrow(ArrowNames.West)
    } else if (receivedString == "R") {
        turnRight()
        basic.showArrow(ArrowNames.East)
    } else if (receivedString == "S") {
        stopMotors()
        basic.showIcon(IconNames.Heart)
    } else if (receivedString == "RAM") {
        triggerRam()
        basic.showIcon(IconNames.Sword)
        basic.pause(100)
        basic.showIcon(IconNames.Heart)
    }
})

// Safety: stop if no signal for a while (handled by controller sending "S")
