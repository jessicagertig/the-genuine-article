import { useState, useRef, SyntheticEvent } from 'react';

type Callback = (e: SyntheticEvent) => void;
type EventHandler = (e: SyntheticEvent, callback?: Callback) => void;

interface LongPressResult {
  action: string | undefined;
  onClick: EventHandler;
  onMouseDown: EventHandler;
  onMouseUp: EventHandler;
  onTouchStart: EventHandler;
  onTouchEnd: EventHandler;
}

export default function useLongPress(): LongPressResult {
  const [action, setAction] = useState<string | undefined>();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef<boolean>(false);

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction('longpress');
      console.log('Is long press.');
    }, 500);
  }

  const handleOnClick: EventHandler = (e, callback = () => {}) => {
    console.log('handleOnClick');
    if (isLongPress.current) {
      console.log('Is long press - not continuing.');
      return;
    }
    setAction('click');
    callback(e);
  };

  const handleOnMouseDown: EventHandler = (e, callback = () => {}) => {
    console.log('handleOnMouseDown');
    startPressTimer();
    callback(e);
  };

  const handleOnMouseUp: EventHandler = (e, callback = () => {}) => {
    console.log('handleOnMouseUp');
    clearTimeout(timerRef.current!);
    isLongPress.current = false;
    callback(e);
  };

  const handleOnTouchStart: EventHandler = (e, callback = () => {}) => {
    console.log('handleOnTouchStart');
    startPressTimer();
    callback(e);
  };

  const handleOnTouchEnd: EventHandler = (e, callback = () => {}) => {
    if (action === 'longpress') return;
    console.log('handleOnTouchEnd');
    clearTimeout(timerRef.current!);
    isLongPress.current = false;
    callback(e);
  };


  return {
    action,
    onClick: handleOnClick,
    onMouseDown: handleOnMouseDown,
    onMouseUp: handleOnMouseUp,
    onTouchStart: handleOnTouchStart,
    onTouchEnd: handleOnTouchEnd,
  };
}