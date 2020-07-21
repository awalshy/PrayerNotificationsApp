/**
 * Notification Manager
 */
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'

/**
 * Notification Peermission
 */
export const isNotificationPermittedAsync = async (): Promise<boolean> => {
  if (Constants.isDevice) {
    const status = await Notifications.getPermissionsAsync()
    console.log('Notification Status: ', status)
    if (!status) return true
    return false
  }
  return false
}

/**
 * Register For Notifications
 *
 * @returns {string} - ExpoPushToken
 */
export const registerForNotificationsAsync = async (): Promise<string> => {
  console.log('Register For Notifications async')
  if (!(await isNotificationPermittedAsync())) {
    const res = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true
      }
    })
    console.log('Current permission for notifications is: ', res)
    // const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    // if (status !== Permissions.PermissionStatus.GRANTED) throw new Error('Notifications not allowed...')
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data
  console.log(token)

  // if (Platform.OS === 'android') {
  //   Notifications.setNotificationChannelAsync('angelus', {
  //     name: 'angelus',
  //     importance: Notifications.AndroidImportance.HIGH,
  //     vibrationPattern: [100, 100, 200, 200, 200, 100, 100],
  //     lightColor: '#FF231F7C'
  //   })
  // }

  return token
}
