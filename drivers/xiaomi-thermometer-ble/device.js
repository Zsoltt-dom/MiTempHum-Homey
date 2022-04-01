'use strict';

const { Device } = require('homey');

class MyDevice extends Device {

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    this.log('MyDevice has been initialized');
    //this.registerCapabilityListener('measure_battery');
    //this.registerCapabilityListener('measure_temperature');
    //this.registerCapabilityListener('measure_humidity');
    console.log(this.getData());
    this.addListener('updateTag', this.updateTag);
    //foundDevices.then(devices => devices.find(bleAdv => bleAdv.uuid == deviceData.uuid))

    //this.setCapabilityValue('measure_temperature', readTemperature(buffer));
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    this.log('MyDevice has been added');
    
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({ oldSettings, newSettings, changedKeys }) {
    this.log('MyDevice settings where changed');
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name) {
    this.log('MyDevice was renamed');
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    this.log('MyDevice has been deleted');
  }


  async updateTag(foundDevices) {
    console.log(`Updating measurements ${this.getName()}`);
    let deviceData = this.getData();
    let settings = this.getSettings();
    let mac = this.getData();
    //console.log(foundDevices, "passed");
    //foundDevices.find(test => device.loca))
    //foundDevices.then(devices => devices.find(bleAdv => bleadv.address == mac)) 
    /*foundDevices.then(devices => devices.find(bleAdv => bleAdv.address == mac))
      .then(bleAdv => {
        console.log(device.address, bleAdv, mac);
      if (bleAdv != undefined) {
          console.log(bleAdv, "gotcha");
          this.setCapabilityValue('measure_rssi', addr.rssi);
          return addr.manufacturerData;
      }
      else throw new Error(`No scanned data for device ${this.getName()
      }`);
  })
    .then(buffer => {
      if (deviceData.dataformat == readFormat(buffer)) return validateDataFormat(deviceData.dataformat, buffer);
      else {
          console.log(`Difference between dataFormat and read data for ${this.getName()} with uuid ${deviceData.uuid}`);
          throw new Error(`Unexpected data in buffer : ${buffer}`);
      }
  })
      .then(buffer => {
        console.log(bleAdv, "measureit");
        this.setCapabilityValue('measure_temperature', readTemperature(buffer));
      })*/

      //foundDevices = this.homey.ble.discover([], 10 * 1000);
      //console.log(foundDevices, "$$$$");
      foundDevices.forEach(device => {
        //console.log(foundDevices, "foundDevices");
        //console.log(device,"device");
        //device.forEach()
        
        //console.log(device.address,"address");
        //console.log(mac["id"], "mac");
        //mac = mac["id"];
        if(device.address==mac["id"]){
          console.log("Match!", mac, device.address);
          //sif (device.serviceData)
          //console.log(device.localName,device.serviceData);
          const sdata = device.serviceData;
          sdata.forEach(uuid => {
            if(uuid.uuid=="181a"){
              var datas = uuid["data"];
              const dattta = Buffer.from(uuid["data"],'hex');
              console.log(device.localName)
              console.log("Temp: ",dattta[7]/10,"Celsius");
              console.log("Hum: ",dattta[8],"%");
              console.log("Batt: ",dattta[9],"%");
             // console.log("Batt: ",dattta[10],dattta[11],"mV");
              //console.log(device.serviceData);
              console.log("");
              //datas = JSON.stringify(datas);
              //console.log(datas,"$$$$");
              let temperature = dattta[7]/10;
              let humidity = dattta[8];
              let battery = dattta[9];
              this.setCapabilityValue('measure_temperature', temperature);
              this.setCapabilityValue('measure_humidity', humidity);
              this.setCapabilityValue('measure_battery', battery);
            }
          })
        } else {
          //throw new Error("The device could not be found!");
        }
        // console.log("*");
        //console.log(sdata.data);
    })

  }

}
function readTemperature(buffer) {
  const data = Buffer.from(uuid["data"],'hex');
  console.log(data[7]/10), "readtemperature";
  return data[7]/10;
}
module.exports = MyDevice;
