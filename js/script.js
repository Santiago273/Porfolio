document.addEventListener('DOMContentLoaded', () => {
    
    const navToggle = document.getElementById('nav-toggle');
    const navPrincipal = document.getElementById('navegacion-principal');

    if (navToggle && navPrincipal) {
        
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navPrincipal.classList.toggle('activo');
            
            
            if (navPrincipal.classList.contains('activo')) {
                navToggle.innerHTML = '✕'; 
            } else {
                navToggle.innerHTML = '☰'; 
            }
        });

        
        const enlaces = navPrincipal.querySelectorAll('a');
        enlaces.forEach(enlace => {
            enlace.addEventListener('click', () => {
                if (window.innerWidth <= 768) { 
                    navPrincipal.classList.remove('activo');
                    navToggle.innerHTML = '☰'; 
                }
            });
        });

        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navPrincipal.classList.remove('activo');
                navToggle.innerHTML = '☰';
            }
        });
    }

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.hash && this.hash !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(this.hash);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-contacto');
    const mensajeEstado = document.getElementById('mensaje-estado');
            
    // Configurar la URL de redirección dinámicamente
    const nextUrl = window.location.origin + '/mensaje-correo.html';
    formulario.querySelector('input[name="_next"]').value = nextUrl;
            
    formulario.addEventListener('submit', function(e) {
        // Validación adicional antes de enviar
        if (!validarFormulario()) {
            e.preventDefault();
            mostrarMensaje('Por favor, completa todos los campos requeridos correctamente.', 'error');
            return;
        }
                
        // Mostrar estado de "enviando"
        mostrarMensaje('Enviando mensaje...', 'info');
                
    });
            
    function validarFormulario() {
        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
        if (nombre === '' || correo === '' || mensaje === '') {
            return false;
        }
                
        if (!emailRegex.test(correo)) {
            return false;
        }
                
        return true;
    }
            
    function mostrarMensaje(texto, tipo) {
        mensajeEstado.textContent = texto;
        mensajeEstado.className = 'mensaje-estado';
                
        if (tipo === 'exito') {
            mensajeEstado.classList.add('mensaje-exito');
        } else if (tipo === 'error') {
            mensajeEstado.classList.add('mensaje-error');
        }
                
        mensajeEstado.classList.remove('oculto');
                
        // Ocultar mensaje después de 5 segundos
        setTimeout(function() {
            mensajeEstado.classList.add('oculto');
        }, 5000);
    }
});