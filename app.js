'use strict';

const Homey = require('homey');
const { workerData } = require('worker_threads');
const SERVICE_UUID = "181a"
class MyApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('MyApp has been initialized');
  /* const advertisements = await this.homey.ble.discover([SERVICE_UUID]);
    //  const sdata = await Homey.BleAdvertisement.serviceData;
    //const data = .serviceData;
	 console.log(advertisements); */
  /* const foundDevices = await this.homey.ble.discover([], 25 * 1000);
   foundDevices.forEach(device => {
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
        }
      })
    // console.log("*");
    //console.log(sdata.data);
})*/
}
}

module.exports = MyApp;
