/**
 * AntBot Controller for BBC Micro:bit V2
 *
 * Controls:
 * - Left wheel servo: P0
 * - Right wheel servo: P1
 * - Ram servo: P2
 *
 * Compatible with EV-Micro:bit app via Bluetooth UART
 */

// Servo configuration for FS90R continuous rotation servos
// 90 = stop, 0 = full speed clockwise, 180 = full speed counter-clockwise
const SERVO_STOP = 90
const SERVO_FORWARD_LEFT = 0      // Left wheel forward
const SERVO_REVERSE_LEFT = 180    // Left wheel reverse
const SERVO_FORWARD_RIGHT = 180   // Right wheel forward (opposite direction)
const SERVO_REVERSE_RIGHT = 0     // Right wheel reverse

// Ram servo configuration
const RAM_DOWN = 0
const RAM_UP = 45
const RAM_DELAY_MS = 150  // Time to hold ram up before dropping

// Initialize servos to stopped/rest position
pins.servoWritePin(AnalogPin.P0, SERVO_STOP)
pins.servoWritePin(AnalogPin.P1, SERVO_STOP)
pins.servoWritePin(AnalogPin.P2, RAM_DOWN)

// Show device name pattern for pairing
basic.showString("AB")
basic.pause(500)

// Start Bluetooth UART service
bluetooth.startUartService()

// Advertise the device name so the app can find it
bluetooth.setTransmitPower(7)  // Max power for better range

// Show heart to indicate ready and waiting for connection
basic.showIcon(IconNames.Heart)

// Handle Bluetooth connection
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})

bluetooth.onBluetoothDisconnected(function () {
    // Stop all motors when disconnected
    stopMotors()
    basic.showIcon(IconNames.No)
})

// Stop all drive motors
function stopMotors() {
    pins.servoWritePin(AnalogPin.P0, SERVO_STOP)
    pins.servoWritePin(AnalogPin.P1, SERVO_STOP)
}

// Drive forward - both wheels forward
function driveForward() {
    pins.servoWritePin(AnalogPin.P0, SERVO_FORWARD_LEFT)
    pins.servoWritePin(AnalogPin.P1, SERVO_FORWARD_RIGHT)
}

// Drive backward - both wheels reverse
function driveBackward() {
    pins.servoWritePin(AnalogPin.P0, SERVO_REVERSE_LEFT)
    pins.servoWritePin(AnalogPin.P1, SERVO_REVERSE_RIGHT)
}

// Turn left - left wheel reverse, right wheel forward
function turnLeft() {
    pins.servoWritePin(AnalogPin.P0, SERVO_REVERSE_LEFT)
    pins.servoWritePin(AnalogPin.P1, SERVO_FORWARD_RIGHT)
}

// Turn right - left wheel forward, right wheel reverse
function turnRight() {
    pins.servoWritePin(AnalogPin.P0, SERVO_FORWARD_LEFT)
    pins.servoWritePin(AnalogPin.P1, SERVO_REVERSE_RIGHT)
}

// Trigger ram - quick raise and drop
function triggerRam() {
    pins.servoWritePin(AnalogPin.P2, RAM_UP)
    basic.pause(RAM_DELAY_MS)
    pins.servoWritePin(AnalogPin.P2, RAM_DOWN)
}

// Listen for commands from EV-Micro:bit app via Bluetooth UART
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let command = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))

    // Process movement commands from EV-Micro:bit app
    if (command.includes("F") || command.includes("forward")) {
        driveForward()
    } else if (command.includes("B") || command.includes("backward") || command.includes("back")) {
        driveBackward()
    } else if (command.includes("L") || command.includes("left")) {
        turnLeft()
    } else if (command.includes("R") || command.includes("right")) {
        turnRight()
    } else if (command.includes("S") || command.includes("stop")) {
        stopMotors()
    } else if (command.includes("A") || command.includes("action") || command.includes("ram")) {
        triggerRam()
    }
})

// Manual controls using Micro:bit buttons (for testing without app)
input.onButtonPressed(Button.A, function () {
    triggerRam()
})

input.onButtonPressed(Button.B, function () {
    stopMotors()
})

// Accelerometer control fallback (tilt to drive)
input.onButtonPressed(Button.AB, function () {
    // Toggle accelerometer mode indicator
    basic.showString("T")
})
