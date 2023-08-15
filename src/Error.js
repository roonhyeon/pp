import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <div>
      <div>잘못된 요청입니다</div>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default Error;
