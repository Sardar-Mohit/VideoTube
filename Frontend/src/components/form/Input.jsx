const Input = ({
  label = "",
  name = "",
  type = "text",
  register,
  accept,
  defaultVal,
  errors,
  required = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="text-sm font-medium leading-6 text-white items-start flex"
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        id={name}
        name={name}
        type={type}
        accept={accept}
        autoComplete="off"
        required={required}
        defaultValue={defaultVal}
        {...register(name)}
        className={`mt-1 rounded-[5px] text-black px-2 py-[7px] border ring-slate-500 border-slate-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  </div>
);

export default Input;