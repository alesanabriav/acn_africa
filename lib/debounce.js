export default function debounce(fn, delay) {
  let delayed;

  return e => {
    clearTimeout(delayed);
    delayed = setTimeout(
      function() {
        fn(e);
      },
      delay
    );
  };
}
