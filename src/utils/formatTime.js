export const formatTime = (isoString) => {
  const date = new Date(isoString);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleString('default', options);
};