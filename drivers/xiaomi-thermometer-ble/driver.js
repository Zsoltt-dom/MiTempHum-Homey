'use strict';

const { Driver } = require('homey');
const delay = s => new Promise(resolve => setTimeout(resolve, 1000 * s));

class MyDriver extends Driver {

  /**
   * onInit is called when the driver is initialized.
   */
  async onInit() {
    this.log('MyDriver has been initialized');
    //polling BLE
    this.polling = true;
    this.addListener('poll', this.pollDevice);

    // Initiating device polling
    this.emit('poll');
  }

  /**
   * onPairListDevices is called when a user is adding a device
   * and the 'list_devices' view is called.
   * This should return an array with the data of devices that are available for pairing.
   */
  
  async onPairListDevices() {
    let devices = [];
    const foundDevices = await this.homey.ble.discover([], 25 * 1000);
    foundDevices.forEach(device => {
      const sdata = device.serviceData;
      sdata.forEach(uuid => {
        if(uuid.uuid=="181a"){
          console.log(device.localName);
          let new_device =
            {
              name: device.localName,
              data: {
                id: device.address,
              },

            }
      

            // Example device data, note that `store` is optional
            // {
            //   name: 'My Device',
            //   data: {
            //     id: 'my-device',
            //   },
            //   store: {
            //     address: '127.0.0.1',
            //   },
            // },
       devices.push(new_device);
      }
      })
      
    })
    return devices;
  }

  async pollDevice() {
    while (this.polling) {
        console.log(`Refreshing BLE`);
        let polling_interval = this.homey.settings.get('polling_interval');
        let scan_duration = this.homey.settings.get('scan_duration');

        //default value for polling and scan
        if (!polling_interval) polling_interval = 60;
        if (!scan_duration) scan_duration = 10;

        //listing all all Ruuvitag
        let devices = this.getDevices();

        
        const foundDevices = await this.homey.ble.discover([], scan_duration * 1000);
        //console.log(foundDevices, "Found devices in driver");
        devices.forEach(device => device.emit('updateTag', foundDevices));

        await delay(polling_interval);
    };
}
}

module.exports = MyDriver;
