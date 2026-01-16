# Ant Bot Functional Specification Document (FSD)

## Introduction
The goal is to build an antbot robot (https://www.wikihow.com/Build-an-Antweight-Combat-Robot)
The robot body has already been designed and will be 3D printed.
It will have two wheels, one on either side, and a bulldozer-type ram that can rapdily lift up and down to flip other robots.
The robot is to be remotely controlled using an iPhone app with a graphical interface to steer the robot and trigger the ram.

## Functional Requirements

### User Stories
I want to control the AntBot using the EV-Micro:bit app on an iPhone 15 Max Pro.
It should use the controls to move forward, backward, left and right.
It should also provide a control to very quickly raise and lower the ram, such that it can flip a competitor robot. 
Once paired the app should remember the robot.

### Features

- ** Physical Features **
The AntBot is to be built using:
- a BBC Micro:bit (V2) 
- a CB Components Motor Driver board (https://github.com/sbcshop/Micro-Bit-Motor-Driver)
- Two continuous rotation motors (FS90R) to drive the wheels
- One servo motor () to rapidly raise and lower the ram through 45 degrees
- a 6V battery comprised of four 1.5 AA cells
- a 3D printed chassis mounting the servos, the wheels, the logic board, the motor board and the battery pack.
- a 3D printed ram which attaches to the chassis

- ** Software Features **
The controller should use the Bluetooth feature of the BBC Micro:bit to communicate with the iPhone.
It should translate the instructions from the EV-Micro:bit app to drive the continuous motors in the following ways.
- When the forward control is used both wheel servos should drive the robot promptly forward.
- When the left control is used the left wheel servo should reverse promptly whilst, simultaneously, the right wheel servo go foward promptly.
- When the right control is used the opposite should apply.
- When the backward control is used both wheel servos should promptly drive the robot in reverse.
When the ram control is selected the ram servo should very quickly raise through 45 degrees, then drop back as quickly.
The left wheel servo will be connected to P0 on the motor driver, the right wheel servo will be connected to P1.
The ram servo will be connected to P2 on the motor driver.
The code produced should be imported into Microsoft MakeCode for Micro:bit.


## Non-Functional Requirements

- ** Security **: the Bluetooth connection should pair uniquely between the iPhone and the micro:bit

## Technical Specifications

### Architecture

### Tech Stack
- Frontend: EV-Micro:bit app from Engineering Village LLC running on an iPhone 15 Pro Max
- IDE: Microsoft MakeCode
- Motor Driver: CB Components
