import { useEffect, useRef } from 'react';

export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value; // обновляем ref после рендера
  }, [value]); // срабатывает, когда value меняется

  return ref.current; // возвращаем предыдущее значение
}
