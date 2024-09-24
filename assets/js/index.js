$("#add_user").submit(function (event) {
  alert("Données insérées avec succès");
  // Ici, vous pouvez ajouter le code pour envoyer les données au serveur
});

// Pour la mise a jour
$("#update_user").submit(function (event) {
  event.preventDefault();

  let unindexed_array = $(this).serializeArray();
  let data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  // Ajout de l'ID manuellement
  data.id = $('input[type="hidden"][name="id"]').val();

  console.log("Données sérialisées:", unindexed_array);
  console.log("Données formatées:", data);

  let request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request)
    .done(function (response) {
      alert("Données mises à jour avec succès !");
      window.location.href = "/";
    })
    .fail(function (xhr, status, error) {
      alert("Erreur lors de la mise à jour : " + error);
    });
});

// Pour supprimer un record
if (window.location.pathname == "/") {
  $ondelete = $(".table tbody a.delete");
  $ondelete.click(function () {
    let id = $(this).attr("data-id");

    let request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };
    if (confirm("Do you really want to delete this record ?")) {
      $.ajax(request).done(function (response) {
        alert("Données supprimées avec succès !");
        window.location.href = "/";
      });
    }
  });
}
