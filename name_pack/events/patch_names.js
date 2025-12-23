({
  checkType: "general",

  checkAndAct: function () {
    var FLAG = "name_pack_patched_v1";

    // Run once per save
    if (window.daapi &&
        window.daapi.getGlobalFlag &&
        window.daapi.getGlobalFlag({ flag: FLAG })) {
      return;
    }

    // Capture webpack require
    if (!window.__REQ__ && window.webpackJsonp && window.webpackJsonp.push) {
      try {
        window.webpackJsonp.push([
          ["__req_cap__"],
          {
            "__req_cap__": function (module, exports, __webpack_require__) {
              window.__REQ__ = __webpack_require__;
            }
          },
          [["__req_cap__"]]
        ]);
      } catch (e) {
        console.warn("[name_pack] Failed to capture webpack require", e);
      }
    }

    if (typeof window.__REQ__ !== "function") {
      console.warn("[name_pack] webpack require not available; skipping");
      return;
    }

    // Load the names table
    var N = window.__REQ__("7dba").default || window.__REQ__("7dba");

    function addUnique(arr, items) {
      if (!Array.isArray(arr)) return;
      for (var i = 0; i < items.length; i++) {
        if (arr.indexOf(items[i]) === -1) arr.push(items[i]);
      }
    }

    // ✍️ Add your names here
    var PACK = {
        praenomen_male: [
            "Aeneas","Amor","Amulius","Anchises","Ascanius","Auster",
            "Consus","Cupid","Cupido","Euryalus","Evander","Evandrus",
            "Faunus","Gemini","Giano","Giove","Hercules","Ianus",
            "Iovis","Italus","Iuppiter","Janus","Jove","Júpiter","Jupiter",
            "Liber","Mars","Marte","Mercurius","Mercury","Neptune",
            "Neptuno","Neptunus","Nettuno","Netuno","Nisus","Numitor",
            "Pluto","Pollux","Quirinus","Remus","Romulus","Saturn",
            "Saturnus","Silvanus","Silvius","Summanus","Tatius",
            "Terminus","Turnus","Ulysses","Vesper","Vulcan","Vulcanus"
        ],

        praenomen_female: [
            "Amor","Angerona","Aurora","Bellona","Camilla","Cardea",
            "Cerere","Ceres","Clementia","Concordia","Diana","Dido",
            "Discordia","Elissa","Fauna","Felicitas","Flora","Fortuna",
            "Fulgora","Giunone","Hersilia","Invidia","Iuno","Iuturna",
            "Juventas","Juno","Junon","Juturna","Lara","Larunda",
            "Latona","Laverna","Lavinia","Levana","Libitina","Lucina",
            "Lucretia","Luna","Maia","Minerva","Minerve","Naenia",
            "Nona","Nox","Pax","Pomona","Proserpina","Proserpine",
            "Rhea","Salacia","Silvia","Spes","Thisbe","Venere",
            "Vénus","Vênus","Venus","Veritas","Vesper","Vesta","Victoria"
        ]

    };

    // Apply pack
    addUnique(N.praenomen.male,   PACK.praenomen_male);
    addUnique(N.praenomen.female, PACK.praenomen_female);


    // Mark done
    if (window.daapi && window.daapi.setGlobalFlag) {
      window.daapi.setGlobalFlag({ flag: FLAG, data: true });
    }

    console.log("[name_pack] Name lists patched successfully.");
    console.log("[name_pack] Added:", PACK.praenomen_male.length, PACK.praenomen_female.length,);
  }
})