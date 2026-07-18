import { useEffect, useState } from 'react'

const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [delay, value])

  return debouncedValue
}

export default useDebounce