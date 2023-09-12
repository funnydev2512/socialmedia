import React from 'react'
// React.forwardRef is used to pass the ref from the parent component to the child component
const TextInput = React.forwardRef(
    (
        {label, type, labelStyles, placeholder, styles, name, error, register}, ref
    ) => {
        return (
            <div className='w-full flex flex-col mt-2'>
                {label && <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>}
                <div>
                    <input type={type} name={name} placeholder={placeholder} ref={ref} className={`bg=secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
                    //The {...register} syntax is a shortcut that passes all the props down to the input element
                    {...register}
                    // aria-invalid is used to indicate that the input is invalid
                    aria-invalid={error ? 'true' : 'false'}
                    />
                </div>
                {error && (
                    <span className='text-xs text-[#f64949fe] mt-0.5'>{error}</span>
                )}
            </div> 
        )
    }
)

export default TextInput