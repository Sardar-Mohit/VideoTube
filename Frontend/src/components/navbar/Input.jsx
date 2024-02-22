
const Input = ({ label = "", name = "", type = "text", register, errors }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-medium leading-6 text-gray-900 items-start flex"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          autoComplete="off"
          {...register(name)}
          className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors[name] && (
          <p className="mt-2 text-sm text-red-500">{errors[name].message}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
