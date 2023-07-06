import notifier from 'node-notifier'

export const errorNotifier = (msg: string): void => {
  notifier.notify({
    title: 'Nyelem Error',
    message: msg,
    sound: true
  })
}
