export const Github = (props: { filename: string }) => {
  let url = `https://github.com/nishio/cookie_pomodoro/blob/main/src/${props.filename}`;
  return (
    <a target="_blank" href={url}>
      [?]
    </a>
  );
};
