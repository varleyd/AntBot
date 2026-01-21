/**
 * AntBot CONTROLLER Code (runs on the handheld micro:bit)
 * Sends radio commands based on tilt and buttons
 *
 * Controls:
 * - Tilt forward: Drive forward
 * - Tilt backward: Drive backward
 * - Tilt left: Turn left
 * - Tilt right: Turn right
 * - Button A: Trigger ram
 * - Button B: Emergency stop
 * - Touch logo (V2): Trigger ram (alternative)
 */

// Radio setup - must match robot's group
radio.setGroup(42)
radio.setTransmitPower(7)

// Sensitivity threshold for tilt (adjust if too sensitive)
const TILT_THRESHOLD = 300

// Track current state to avoid spamming radio
let lastCommand = ""

// Show "C" for Controller
basic.showString("C")
basic.pause(500)
basic.showIcon(IconNames.Heart)

// Button A: Trigger ram
input.onButtonPressed(Button.A, function () {
    radio.sendString("RAM")
    basic.showIcon(IconNames.Sword)
    basic.pause(200)
    basic.showIcon(IconNames.Heart)
})

// Button B: Emergency stop
input.onButtonPressed(Button.B, function () {
    radio.sendString("S")
    lastCommand = "S"
    basic.showIcon(IconNames.No)
    basic.pause(200)
    basic.showIcon(IconNames.Heart)
})

// Logo touch (V2 only): Alternative ram trigger
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("RAM")
    basic.showIcon(IconNames.Sword)
    basic.pause(200)
    basic.showIcon(IconNames.Heart)
})

// Main loop: read tilt and send commands
basic.forever(function () {
    let x = input.acceleration(Dimension.X)
    let y = input.acceleration(Dimension.Y)
    let command = "S"  // Default to stop

    // Determine direction based on tilt
    // Y axis: forward/backward (tilt micro:bit toward/away from you)
    // X axis: left/right (tilt micro:bit sideways)

    if (y < -TILT_THRESHOLD) {
        // Tilted forward
        command = "F"
    } else if (y > TILT_THRESHOLD) {
        // Tilted backward
        command = "B"
    } else if (x < -TILT_THRESHOLD) {
        // Tilted left
        command = "L"
    } else if (x > TILT_THRESHOLD) {
        // Tilted right
        command = "R"
    }

    // Only send if command changed (reduces radio traffic)
    if (command != lastCommand) {
        radio.sendString(command)
        lastCommand = command

        // Show direction on LED
        if (command == "F") {
            basic.showArrow(ArrowNames.North)
        } else if (command == "B") {
            basic.showArrow(ArrowNames.South)
        } else if (command == "L") {
            basic.showArrow(ArrowNames.West)
        } else if (command == "R") {
            basic.showArrow(ArrowNames.East)
        } else {
            basic.showIcon(IconNames.Heart)
        }
    }

    // Small delay to prevent flooding
    basic.pause(50)
})
