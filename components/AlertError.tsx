import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AlertErrorProps = {
    errorStr: string;
};

export function AlertError({ errorStr }: AlertErrorProps) {
    return (
        <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertTitle>{errorStr}</AlertTitle>
            {/* <AlertDescription className="mt-2">
                Please check your email or password and try again
            </AlertDescription> */}
        </Alert>
    );
}
