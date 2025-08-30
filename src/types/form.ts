// Define the form values type based on your form structure
export interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string | number | boolean | undefined;
}

// Type for form validators
export type FieldValidator<T = string> = (props: {
  value: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldApi: any; // Using any for FieldApi to avoid complex generics
}) => string | undefined;

export type FormValidators = {
  [K in keyof FormValues]?: {
    onChange?: FieldValidator<FormValues[K]>;
    onBlur?: FieldValidator<FormValues[K]>;
    onSubmit?: FieldValidator<FormValues[K]>;
  };
};
