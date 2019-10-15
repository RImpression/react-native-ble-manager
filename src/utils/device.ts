import DeviceInfo from "react-native-device-info";

let info

export default function getDeviceInfo() {
  info = info || {
    appName: DeviceInfo.getApplicationName(),

    brand: DeviceInfo.getBrand(),

    manufacturer: DeviceInfo.getManufacturer(),

    buildNumber: DeviceInfo.getBuildNumber(), // 获取应用程序内部版本号

    bundleId: DeviceInfo.getBundleId(), // 获取应用程序包标识符

    carrier: DeviceInfo.getCarrier(), // 网络运营商

    deviceId: DeviceInfo.getDeviceId(),

    deviceName: DeviceInfo.getDeviceName(),

    firstInstallTime: DeviceInfo.getFirstInstallTime(),

    instanceId: DeviceInfo.getInstanceID(),

    lastUpdateTime: DeviceInfo.getLastUpdateTime(),

    readableVersion: DeviceInfo.getReadableVersion(),

    serialNumber: DeviceInfo.getSerialNumber(),

    systemVersion: DeviceInfo.getSystemVersion(),

    uniqueId: DeviceInfo.getUniqueID(),

    userAgent: DeviceInfo.getUserAgent(),

    version: DeviceInfo.getVersion(),

    supportedABIs: DeviceInfo.supportedABIs()
  };

  return info
}
