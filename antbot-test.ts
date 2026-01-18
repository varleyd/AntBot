/**
 * AntBot - Minimal Bluetooth Test
 * Use this to verify Bluetooth connection works
 */

// Show "1" - starting up
basic.showNumber(1)
basic.pause(500)

// Show "2" - starting Bluetooth
basic.showNumber(2)
bluetooth.startUartService()

// Show "3" - Bluetooth started successfully
basic.showNumber(3)
basic.pause(500)

// Show heart - ready for connection
basic.showIcon(IconNames.Heart)

bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})

bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    // Flash to show data received
    basic.showIcon(IconNames.Diamond)
    basic.pause(200)
    basic.showIcon(IconNames.Yes)
})
