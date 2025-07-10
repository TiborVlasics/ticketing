import { useState } from 'react';
import z from 'zod';

interface UseRequestProps<T> {
  url: string;
  method: string;
  body?: BodyInit;
  onSuccess?: (data: T) => void;
}

interface ValidationError {
  message: string;
  field?: string;
}

const ValidationErrorResponse = z.object({
  errors: z.array(
    z.object({
      message: z.string(),
      field: z.string().optional(),
    })
  ),
});

export default function useRequest<T>({
  url,
  method,
  body,
  onSuccess,
}: UseRequestProps<T>) {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const doRequest = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      const data = await response.json();
      const parseError = ValidationErrorResponse.safeParse(data);

      if (parseError.success) {
        setErrors(parseError.data.errors);
        return;
      }
      setData(data);
      setErrors([]);

      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { doRequest, data, isLoading, errors };
}
