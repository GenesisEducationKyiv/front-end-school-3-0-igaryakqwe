import { ClassValue } from 'class-variance-authority/types';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(classNames(inputs));
};
