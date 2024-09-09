export function trigger<T extends typeof HTMLTextAreaElement | typeof HTMLInputElement> (inputElement: InstanceType<T>, Element: T, value: string) {
  // https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-change-or-input-event-in-react-js
  const set = Object.getOwnPropertyDescriptor(Element.prototype, 'value')!.set!;
  set.call(inputElement, value);
  const event = new Event('input', { bubbles: true });
  inputElement.dispatchEvent(event);
}