import React from "react";
function NotFound() {
  return (
    <>
      <section class="page_404">
        <div class="container">
          <div class="row">
            <div
              class="col-sm-12 d-flex justify-content-center"
              style={{ marginTop: "150px" }}
            >
              <div class="col-sm-10 col-sm-offset-1">
                <div class="four_zero_four_bg">
                  <h1 class="text-center text-light">Opps ! Page Not Found</h1>
                </div>
                <div className="col-md-12"></div>
                <div className="d-flex text-danger justify-content-center">
                  <p style={{ fontSize: "120px" }}>404</p>
                </div>
                <div class="contant_box_404 text-light" align="center">
                  <h3 class="h2">Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>

                  <a href="/" className="link_404 btn btn-outline-info">
                    Go Back Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
