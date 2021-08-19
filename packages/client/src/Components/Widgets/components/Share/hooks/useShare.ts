import { useState } from 'react';

export function useShare(
  reference: HTMLInputElement | null,
  close: () => void
): [string, () => void, () => void] {
  const [isCopied, setIsCopied] = useState(false);
  const copyText = isCopied
    ? 'Link copied to clipboard!'
    : 'Click to copy link to clipboard';

  /**
   * Focus link and copy value to keyboard
   * @returns
   */
  const copyToClipboard = () => {
    if (reference === null) return;
    reference.select();
    try {
      document.execCommand('copy');
      copy();
    } catch (err) {
      throw new Error('Error in copy code to clipboard');
    }
  };

  /**
   * Copy
   */
  const copy = () => {
    setIsCopied(true);
  };

  /**
   * Clear
   */
  const clear = () => {
    setIsCopied(false);
  };

  /**
   * Closes modal and resets copy
   */
  const handleClose = () => {
    close();
    clear();
  };

  return [copyText, handleClose, copyToClipboard];
}
