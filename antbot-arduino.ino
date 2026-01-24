/**
 * AntBot Controller for Arduino Nano
 * Compatible with EV-Micro:bit iOS app via HM-10 Bluetooth
 *
 * Pin Layout:
 * -----------
 * HM-10 Bluetooth Module:
 *   - VCC  → 5V (or 3.3V if module requires)
 *   - GND  → GND
 *   - TXD  → Pin 2 (SoftwareSerial RX)
 *   - RXD  → Pin 3 (SoftwareSerial TX) via voltage divider (5V→3.3V)
 *
 * Servos (connect to breakout board PWM pins):
 *   - Left wheel (FS90R)  → Pin 9
 *   - Right wheel (FS90R) → Pin 10
 *   - Ram (MG90S)         → Pin 11
 *
 * Power:
 *   - 5V LiPo → VIN or 5V pin (ensure adequate current for servos)
 *   - Servos should ideally have separate power with common ground
 *
 * Required Libraries:
 *   - Servo (built-in)
 *   - SoftwareSerial (built-in)
 */

#include <Servo.h>
#include <SoftwareSerial.h>

// Pin definitions
const int BT_RX_PIN = 2;      // Connect to HM-10 TXD
const int BT_TX_PIN = 3;      // Connect to HM-10 RXD (via voltage divider)
const int LEFT_SERVO_PIN = 9;
const int RIGHT_SERVO_PIN = 10;
const int RAM_SERVO_PIN = 11;

// Servo configuration for FS90R continuous rotation servos
// 90 = stop, 0 = full speed one direction, 180 = full speed other direction
const int SERVO_STOP = 90;
const int SERVO_FORWARD_LEFT = 0;
const int SERVO_REVERSE_LEFT = 180;
const int SERVO_FORWARD_RIGHT = 180;
const int SERVO_REVERSE_RIGHT = 0;

// Ram servo configuration (MG90S standard servo)
const int RAM_DOWN = 0;
const int RAM_UP = 45;
const int RAM_DELAY_MS = 150;

// Create objects
SoftwareSerial btSerial(BT_RX_PIN, BT_TX_PIN);
Servo leftServo;
Servo rightServo;
Servo ramServo;

// Buffer for incoming commands
String commandBuffer = "";

void setup() {
    // Initialize serial for debugging (optional)
    Serial.begin(9600);
    Serial.println("AntBot Arduino Starting...");

    // Initialize Bluetooth serial (HM-10 default baud rate)
    btSerial.begin(9600);

    // Attach servos
    leftServo.attach(LEFT_SERVO_PIN);
    rightServo.attach(RIGHT_SERVO_PIN);
    ramServo.attach(RAM_SERVO_PIN);

    // Initialize to stopped/rest position
    stopMotors();
    ramServo.write(RAM_DOWN);

    Serial.println("AntBot Ready!");
}

void loop() {
    // Check for incoming Bluetooth data
    while (btSerial.available()) {
        char c = btSerial.read();

        // Commands are delimited by '#' (EV-Micro:bit app format)
        if (c == '#') {
            processCommand(commandBuffer);
            commandBuffer = "";
        } else {
            commandBuffer += c;
        }
    }
}

void processCommand(String cmd) {
    // Trim whitespace
    cmd.trim();

    // Debug output
    Serial.print("Received: ");
    Serial.println(cmd);

    // Process movement commands
    if (cmd == "F" || cmd == "f" || cmd == "forward") {
        driveForward();
    }
    else if (cmd == "B" || cmd == "b" || cmd == "backward") {
        driveBackward();
    }
    else if (cmd == "L" || cmd == "l" || cmd == "left") {
        turnLeft();
    }
    else if (cmd == "R" || cmd == "r" || cmd == "right") {
        turnRight();
    }
    else if (cmd == "S" || cmd == "s" || cmd == "stop") {
        stopMotors();
    }
    else if (cmd == "A" || cmd == "a" || cmd == "action") {
        triggerRam();
    }
}

void stopMotors() {
    leftServo.write(SERVO_STOP);
    rightServo.write(SERVO_STOP);
    Serial.println("Motors stopped");
}

void driveForward() {
    leftServo.write(SERVO_FORWARD_LEFT);
    rightServo.write(SERVO_FORWARD_RIGHT);
    Serial.println("Driving forward");
}

void driveBackward() {
    leftServo.write(SERVO_REVERSE_LEFT);
    rightServo.write(SERVO_REVERSE_RIGHT);
    Serial.println("Driving backward");
}

void turnLeft() {
    leftServo.write(SERVO_REVERSE_LEFT);
    rightServo.write(SERVO_FORWARD_RIGHT);
    Serial.println("Turning left");
}

void turnRight() {
    leftServo.write(SERVO_FORWARD_LEFT);
    rightServo.write(SERVO_REVERSE_RIGHT);
    Serial.println("Turning right");
}

void triggerRam() {
    Serial.println("Ram triggered!");
    ramServo.write(RAM_UP);
    delay(RAM_DELAY_MS);
    ramServo.write(RAM_DOWN);
}
