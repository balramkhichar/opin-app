// Define the form values type based on your form structure
export interface FormValues {
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

// Type for field props - using any to avoid complex generic types
export type FieldProps = {
  name: string;
  validators?: FormValidators[string];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (field: any) => React.ReactNode;
};

// Type for subscribe props - using any to avoid complex generic types
export type SubscribeProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selector?: (state: any) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (state: any) => React.ReactNode;
};
