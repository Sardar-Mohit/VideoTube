const useFormatDateHook = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export default useFormatDateHook;
