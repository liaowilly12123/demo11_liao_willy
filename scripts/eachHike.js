function showDetails() {
  let params = new URL(window.location.href);
  let id = params.searchParams.get("id");
  let hikeName = params.searchParams.get("hikeName");

  let message = "Hike name is : " + hikeName;
  message += " &nbsp | Document id is:  " + id;
  document.getElementById("HikeName").innerHTML = hikeName;
  document.getElementById("details-go-here").innerHTML = message;
}

showDetails();