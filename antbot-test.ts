/**
 * AntBot - Bluetooth Test with all services
 */

// Show "1" - starting up
basic.showNumber(1)
basic.pause(300)

// Show "2" - starting Bluetooth services
basic.showNumber(2)

// Start multiple Bluetooth services that the app might need
bluetooth.startUartService()
bluetooth.startLEDService()
bluetooth.startButtonService()
bluetooth.startIOPinService()

// Show "3" - Bluetooth started successfully
basic.showNumber(3)
basic.pause(300)

// Show heart - ready for connection
basic.showIcon(IconNames.Heart)

bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})

bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Heart)
})

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    basic.showIcon(IconNames.Diamond)
    basic.pause(200)
    basic.showIcon(IconNames.Yes)
})
