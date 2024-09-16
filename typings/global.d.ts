export interface BasicResponseInterface<T = null> {
  data: T;
  message: string;
  success: boolean;
  status_code: number;
}

export type FallbackComponentProps = {
  isModal?: boolean;
  error?: Error | null;
  resetError: VoidFunction;
};
