import { useEffect, useRef } from "react";

import { getFormattedTime } from '../../../helpers/getFormattedTime'

import './ProgressBar.scss'

const ProgressBar = ({value, maxValue = 0, onChange, withValues = false}) => {
  const progressRef = useRef()

  useEffect(() => {
    const setProgressWidth = () => {
      if (value === 0) return
      
      let target = progressRef.current
      const min = target.min
      const max = target.max
      const val = target.value

      target.style.backgroundSize = (val - min) * 100 / (max - min) + "% 100%"
    }
    if (progressRef) {
      setProgressWidth()
    }
  }, [value])

  return (
    <div className='progressbar'>
      {withValues && <span>{getFormattedTime(value)}</span>}
      <input 
        ref={progressRef}
        type="range" 
        min={0} 
        max={maxValue} 
        value={value} 
        onChange={onChange} 
        className="progressbar__input"
      />
      {withValues && <span>{getFormattedTime(maxValue)}</span>}
    </div>
  );
}
 
export default ProgressBar;