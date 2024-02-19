
const Input = ({
    placeholderName = "",
    name = "",
    id = "",
    type = "text",
    autoComplete = "on",
    value = "",
    handleChange,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-medium leading-6 text-gray-900 items-start flex"
      >
        {placeholderName}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={handleChange}
          required
          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default Input;
