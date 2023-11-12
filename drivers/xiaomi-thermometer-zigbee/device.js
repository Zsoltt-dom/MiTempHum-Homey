'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { debug, CLUSTER } = require('zigbee-clusters');

// Enable debug logging of all relevant Zigbee communication
debug(true);

module.exports = class XiaomiThermometerZigbeeDevice extends ZigBeeDevice {

  async onNodeInit({ zclNode }) {
    this.printNode();

    if (this.isFirstInit()) {
      await this.configureAttributeReporting([{
        endpointId: 1,
        cluster: CLUSTER.POWER_CONFIGURATION,
        attributeName: 'batteryPercentageRemaining',
        minInterval: 65535,
        maxInterval: 0,
        minChange: 0,
      }]);
    }

    // measure_temperature
    zclNode.endpoints[1].clusters[CLUSTER.TEMPERATURE_MEASUREMENT.NAME]
      .on('attr.measuredValue', value => {
        this.setCapabilityValue('measure_temperature', value / 100.0);
      });

    // measure_humidity
    zclNode.endpoints[1].clusters[CLUSTER.RELATIVE_HUMIDITY_MEASUREMENT.NAME]
      .on('attr.measuredValue', value => {
        this.setCapabilityValue('measure_humidity', value / 100.0);
      });

    // measure_battery // alarm_battery
    zclNode.endpoints[1].clusters[CLUSTER.POWER_CONFIGURATION.NAME]
      .on('attr.batteryPercentageRemaining', value => {
        this.log('measured batt', value);
        this.setCapabilityValue('measure_battery', value);
      });
  }

};
