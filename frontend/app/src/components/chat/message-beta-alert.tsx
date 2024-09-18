import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FlaskConicalIcon } from 'lucide-react';

export function MessageBetaAlert () {
  return (
    <Alert variant="info" className='my-2'>
      <FlaskConicalIcon />
      <AlertTitle>
        This chatbot is in Beta.
      </AlertTitle>
      <AlertDescription>
        All generated information should be verified prior to use.
      </AlertDescription>
    </Alert>
  );
}
