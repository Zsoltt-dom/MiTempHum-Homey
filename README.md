# MiTemp_BLE

BLE Tempereature and Humidity sensor app for Homey

Feel free to modify, use the code. It is very dirty currently, sorry for that. I put it together in a few hours.


App for Mijia (BLE) Tempereature and Humidity sensor (LYWSD03MMC)

Please note, that the sensor needs to be modded with custom 'ATC' firmware using ATC441 advertising format.
For that please visit https://github.com/pvvx/ATC_MiThermometer and you can use the Telink Flasher to flash the currently supported v3.5 firmware.
After flashing, don't forget to set the ATC441 advertising format.
The app will filter the dicovered devices by their dataformat (0x181A) and will list the devices by their name.

I'm not a developer, created this app only because I wanted to use my sensors with Homey.
