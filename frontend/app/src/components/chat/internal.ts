const internalState: {
  message: string
} = {
  message: '',
};

export function __setMessage (msg: string) {
  internalState.message = msg;
}
