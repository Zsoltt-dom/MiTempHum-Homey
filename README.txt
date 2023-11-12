App for Mijia (BLE) Tempereature and Humidity sensor (LYWSD03MMC)

Please note, that the sensor needs to be modded with custom 'ATC' firmware using ATC441 advertising format.
For that please visit https://github.com/pvvx/ATC_MiThermometer and you can use the Telink Flasher to flash the firmware.
After flashing, don't forget to set the ATC1441 advertising format.
The app will filter the dicovered devices by their UUID (0x181A) and will list the devices by their name.

I'm not a developer, created this app only because I wanted to use my sensors with Homey. Feel free to modify the code on my github.
Thanks for Horakmartin for the contribution and for Robert Klep for implementing the ZigBee drivers also.
