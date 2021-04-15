import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Use Toggle Hook
 * @param initialValue
 * @returns value, toggle
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);
  return { value, toggle };
}

/**
 * Use Form Hook
 * @param initialState
 * @param callback
 * @returns inputs, handleChange, handleSubmit
 */
export function useForm(
  initialState: { [key: string]: string },
  callback?: (inputs: any) => void
) {
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState('');

  /**
   * Handles input change
   * @param event Change event
   */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.persist();
    setInputs((inputs: any) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  }

  /**
   * Handles form submit and returns useForm callback function
   * @param event Submit Event
   */
  function handleSubmit(event?: React.FormEvent<HTMLFormElement>) {
    if (event) {
      event.preventDefault();
    }
    callback && callback(inputs);
  }

  /**
   * Handles clipboard paste
   * @param event Paste event
   * @param key Object key name
   * @param maxStringLength Clipboard max string length
   */
  function handlePaste(
    event: React.ClipboardEvent<HTMLInputElement>,
    key: string,
    maxStringLength?: number
  ) {
    let paste = event.clipboardData.getData('text');

    try {
      if (maxStringLength && paste.length > maxStringLength) {
        throw new Error('Clipboard paste is too long');
      }

      let pasteArray = paste.split('');
      let i: number;
      let data: { [key: string]: string };
      let pastedInput: { [key: string]: string } = {};

      for (i = 0; i < pasteArray.length; i++) {
        data = { [`${key}${i + 1}`]: pasteArray[i] };
        pastedInput = { ...pastedInput, ...data };
      }

      setInputs((inputs: any) => ({
        ...inputs,
        ...pastedInput,
      }));
    } catch (err) {
      handleError(err);
    }
  }

  function handleError(error: Error) {
    setErrors(() => error.message);
    return;
  }

  return { inputs, error: errors, handleChange, handleSubmit, handlePaste };
}

/**
 * Use Dialog Hook
 * @param initialState
 * @param callback
 * @returns open, handleOpen, handleClose
 */
export function useDialog(initialState: boolean, callback?: () => void) {
  const [open, setOpen] = useState(initialState);

  /**
   * Handles open
   */
  const handleOpen = () => {
    setOpen(true);
  };

  /**
   * Handles close
   */
  const handleClose = () => {
    setOpen(false);
    callback && callback();
  };

  return { open, handleOpen, handleClose };
}

/**
 * Use Title Hook
 * @param title
 */
export const useTitle = (title?: string) => {
  useEffect(() => {
    title
      ? (document.title = `${title} Bingo - np-bingo`)
      : (document.title = `Bingo - np-bingo`);
  });
};

/**
 * Builds on useLocation to parse the query string
 * @returns
 */
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}