let date = new Date("Dec 24, 2024 23:59:59").getTime();

var update = setInterval(function() {
    var today = new Date().getTime();
    var difference = date - today;

    var days = Math.floor(difference / (1000*60*60*24));
    var hours = Math.floor((difference % (1000*60*60*24)) / (1000*60*60));
    var minutes = Math.floor((difference % (1000*60*60)) / (1000*60));
    var seconds = Math.floor((difference % (1000*60)) / 1000);
    
    //output
    document.getElementById("countdown" ).innerHTML = days + " dias " + hours + " horas " + minutes + " minutos " + seconds + " segundos";

    if(difference < 0) {
        clearInterval(update);
        document.getElementById("countdown"  ).innerHTML = "¡Llegó Papá Noel!";
    }
}, 1000);




document.addEventListener("DOMContentLoaded", function () {
    // click register
    const registerButton = document.querySelectorAll(".button" )[1];
    registerButton.addEventListener("click", function (event) {
        event.preventDefault();  
        openModal('registerModal');
    });
});


function openModal(modalId ) {
    document.getElementById(modalId ).style.display = "block";
}

function closeModal(modalId  ) {
    document.getElementById(modalId).style.display = "none";
}

function clearForm() {
    if (confirm("¿Estás segura/o de que quieres borrar todos los campos?")) {
        document.getElementById("registrationForm" ).reset();
        document.getElementById("childrenFields").innerHTML = "";
    }
}

function confirmCancel() {
    if (confirm("¿Estás segura/o de que deseas cancelar el registro?" )) {
        closeModal('registerModal');
    }
}

function addChildFields(count) {
    const container = document.getElementById("childrenFields"  );
    container.innerHTML = "";  // Clear existing fields

    for ( let i = 0; i < count; i++) {
        container.innerHTML += `
            <label>Child ${i + 1} Nombre:*</label>
            <input type="text" required minlength="3" />

            <label>Child ${i + 1} Edad:*</label>
            <input type="number" required min="0" />

            <label>Child ${i + 1} Juegetes favoritos:</label>
            <input type="text" />
        `;
    }
}

function handleRegistration(event) {
    event.preventDefault();  // control de registrarse

    const password = document.getElementById("password" ).value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!validatePassword(password  )) {
        alert("Contraseña debe ser 12 caracteres de longitud, con mínimo 2 números, 1  carácter especial, 1 letra mayúscula y 1 letra minúscula" );
        return;
    }

    if (password !== confirmPassword  ) {
        alert("Contraseñas no son igual");
        return;
    }

    const formData = {
        username: document.getElementById("username" ).value,
        password: password,
        email: document.getElementById("email"  ).value,
        city: document.getElementById("city" ).value,

        country: document.getElementById("country").value,

        gender: document.getElementById("gender" ).value,

        children: document.getElementById("children").value,
    };

    // Save to local storage
    localStorage.setItem("userData", JSON.stringify(formData));
    alert("Te has registrado exitosamente." );
    closeModal('registerModal');
}

function validatePassword(password  ) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return regex.test(password  );
}
//////////////////

document.addEventListener("DOMContentLoaded", function () {
    // Click a iniciar sesion
    const loginButton = document.querySelectorAll(".button")[0]; 
    loginButton.addEventListener("click", function (event) {
        event.preventDefault();  
        openModal('loginModal');
    });
});

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername" ).value;

    const password = document.getElementById("loginPassword").value;

    const storedData = JSON.parse( localStorage.getItem("userData" ));
    
    // Check if user data matches
    if (storedData && storedData.username === username && storedData.password === password  ) {
        alert("Inicio de sesión exitoso!");
        updateNavbarToProfile();
        closeModal('loginModal');
        localStorage.setItem("loggedInUser", username);  // Guarda el usuario que inició sesión

    } else {
        alert("Nombre de usuario o contraseña incorrectos." );
    }
}

function toggleProfileMenu() {
    document.getElementById( "profileMenu" ).classList.toggle("show" );
}

function handleLogout() {
    if (confirm("¿Estás segura/o de que quieres cerrar sesión?")) {
        updateNavbarToLoginRegister();
        alert("Se cerró sesión exitosamente." );
    }
    localStorage.removeItem("loggedInUser");

}

function updateNavbarToLoginRegister() {
    const navItems = document.getElementById( "nav-items");


    navItems.innerHTML += `
        <a href="#" class="button" onclick="openModal('loginModal')">Iniciar Sesion</a>
        <a href="#" class="button" onclick="openModal('registerModal')">Registrarse</a>
    `;
}




function updateNavbarToProfile() {
    const navItems = document.getElementById( "nav-items");

    navItems.querySelectorAll( ".button" ).forEach(button => button.remove());

    const profileIcon = document.createElement("div");
    profileIcon.classList.add("profile-icon" );
    profileIcon.innerHTML = `
        <div class="profile-menu" id="profileMenu">
            <a href="#" onclick="openProfileModal()">Mi Perfil</a>
            <a href="#" onclick="openMyLettersModal()">Mis Cartas</a>
            <a href="#" onclick="handleLogout()">Cerrar Sesion</a>
        </div>
    `;
    navItems.appendChild(profileIcon);
}

function toggleProfileMenu() {
    document.getElementById("profileMenu").classList.toggle( "show" );
}




function openProfileModal() {

    const storedData = JSON.parse( localStorage.getItem( "userData"));
    
    if (storedData) {

        document.getElementById( "profileUsername" ).value = storedData.username;
        document.getElementById("profileEmail").value = storedData.email;
        document.getElementById("profileCity" ).value = storedData.city;
        document.getElementById("profileCountry").value = storedData.country;
    }

    openModal('profileModal');
}


function saveProfile(event) {
    event.preventDefault();
    const updatedData = {
        ...JSON.parse( localStorage.getItem("userData" )),
        email: document.getElementById("profileEmail").value,
        city: document.getElementById("profileCity" ).value,
        country: document.getElementById("profileCountry").value
    };

    localStorage.setItem("userData", JSON.stringify(updatedData));
    alert("Perfil actualizado exitosamente." );
    closeModal('profileModal');
}



function openMyLettersModal() {
    const letters = JSON.parse(localStorage.getItem("userLetters")) || [];
    const container = document.getElementById("lettersContainer");
    container.innerHTML = "";

    if (letters.length === 0) {
        container.innerHTML = "<p>No se han enviado cartas.</p>";
    } else {
        letters.forEach((letter, index) => {
            const letterDiv = document.createElement("div");
            letterDiv.classList.add("letter");
            letterDiv.setAttribute("draggable", "true"); 
            letterDiv.setAttribute("data-index", index);

            letterDiv.innerHTML = `
                <h5>De: ${letter.name} (${letter.city}, ${letter.country})</h5>
                <p>${letter.content}</p>
                <button onclick="deleteLetter(${index})">Borrar</button>
            `;
            
            letterDiv.addEventListener("dragstart", handleDragStart);
            letterDiv.addEventListener("dragover", handleDragOver);
            letterDiv.addEventListener("drop", handleDrop);

            container.appendChild(letterDiv);
        });
    }

    openModal('lettersModal');
}



function deleteLetter(index) {
    if (confirm( "¿Estás seguro que deseas eliminar esta carta?" )) {

        const letters = JSON.parse( localStorage.getItem( "userLetters")) || [];
        letters.splice(index, 1); 

        localStorage.setItem( "userLetters", JSON.stringify( letters));


        openMyLettersModal();   }
} 
let draggedIndex = null;

function handleDragStart(event) {
    draggedIndex = event.target.getAttribute("data-index"); 
    event.dataTransfer.effectAllowed = "move"; 
}

function handleDragOver(event) {  ///drag
    event.preventDefault(); 
    event.dataTransfer.dropEffect = "move";
}

function handleDrop(event) {
    event.preventDefault();
    const droppedIndex = event.target.getAttribute("data-index"); 

    if (draggedIndex !== null && droppedIndex !== null && draggedIndex !== droppedIndex) {
        const letters = JSON.parse(localStorage.getItem("userLetters")) || [];

        const [draggedLetter] = letters.splice(draggedIndex, 1);
        letters.splice(droppedIndex, 0, draggedLetter);

        localStorage.setItem("userLetters", JSON.stringify(letters));
        openMyLettersModal(); 

        draggedIndex = null;
    }
}



function saveLetter() {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("Debes iniciar sesión para enviar una carta.");
        return; 
    }
    //memory
    const name = document.querySelector('#form1 .form_input').value;
    const email = document.querySelector('#form2 .form_input').value;
    const city = document.querySelector('#form3 .form_input').value;
    const country = document.querySelector('#form4 .form_input').value;
    const letterContent = document.getElementById('texto_pag4').value;

    if (!name || !email || !city || !country || !letterContent) {
        alert("Por favor, rellene todos los campos.");
        return;
    }

    const letter = {
        username: loggedInUser,
        name,
        email,
        city,
        country,
        content: letterContent
    };

    const letters = JSON.parse(localStorage.getItem("userLetters")) || [];
    letters.push(letter);

    localStorage.setItem("userLetters", JSON.stringify(letters));

    alert("¡Tu carta ha sido guardada!");
    document.getElementById("form_pag4").reset();
}

document.addEventListener( "DOMContentLoaded", function () {
    document.getElementById( "boton_pag4").addEventListener( "click", saveLetter);
});
