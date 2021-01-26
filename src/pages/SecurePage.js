export default function SecurePage() {
  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">Secure page</h2>
          <h4>Only available if logged in</h4>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
