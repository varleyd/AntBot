# AntBot Arduino Nano Wiring Guide

## Pin Assignments

| Component | Arduino Nano Pin | Notes |
|-----------|------------------|-------|
| Left Wheel Servo (FS90R) | D9 | PWM pin |
| Right Wheel Servo (FS90R) | D10 | PWM pin |
| Ram Servo (MG90S) | D11 | PWM pin |
| HM-10 TXD | D2 | SoftwareSerial RX |
| HM-10 RXD | D3 | Via voltage divider |
| HM-10 VCC | 3.3V or 5V | Check module spec |
| HM-10 GND | GND | Common ground |

## Wiring Diagram

```
                    Arduino Nano
                   +------------+
                   |            |
              D2 ──┤ D2      5V ├── Servo VCC (red wires)
              D3 ──┤ D3     GND ├── Common GND (all grounds)
                   |            |
     Left Servo ───┤ D9     3V3 ├── HM-10 VCC (if 3.3V module)
    Right Servo ───┤ D10       |
      Ram Servo ───┤ D11       |
                   |        VIN ├── 5V LiPo (+)
                   |        GND ├── 5V LiPo (-)
                   +------------+


    HM-10 Module
   +------------+
   | VCC   TXD  ├──────────────── Arduino D2
   | GND   RXD  ├──────┬──[1K]── Arduino D3
   +------------+      │
                       └──[2K]── GND
                 (Voltage divider: 5V → 3.3V)
```

## Voltage Divider for HM-10 RXD

The HM-10 operates at 3.3V logic. Arduino Nano outputs 5V on TX.
Use a voltage divider to protect the HM-10:

```
Arduino D3 ───[1KΩ]───┬───[2KΩ]─── GND
                      │
                      └─────────── HM-10 RXD
```

Output voltage: 5V × (2K / 3K) = 3.3V

## Servo Power Considerations

The FS90R servos can draw significant current (up to 700mA each under load).
For reliable operation:

1. **Option A (Simple)**: Power servos from Arduino 5V pin
   - Works for testing
   - May cause brownouts under heavy load

2. **Option B (Recommended)**: Separate servo power
   - Connect servo VCC directly to 5V LiPo
   - Connect servo GND to LiPo GND AND Arduino GND
   - This prevents voltage drops affecting the Arduino

## Servo Connections

Each servo has 3 wires:
- **Brown/Black**: GND
- **Red**: VCC (5V)
- **Orange/Yellow**: Signal (to Arduino PWM pin)

## Breakout Board Usage

If using the Arduino Nano I/O Shield Expansion Board:
- Plug the Nano into the board
- Use the servo headers on the shield (usually labeled S/V/G)
- Connect HM-10 to available digital pins with jumper wires
