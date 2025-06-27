// // main.js - Controlador principal da aplicação
// class HorizonApp {
//     constructor() {
//         this.currentPage = 'home';
//         this.components = {
//             navbar: 'navbar.html',
//             footer: 'footer.html',
//             home: 'home.html',
//             services: 'services.html',
//             about: 'about.html',
//             contact: 'contact.html'
//         };
//         this.init();
//     }

//     async init() {
//         try {
//             // Carregar componentes essenciais
//             await this.loadComponent('navbar', 'navbar-container');
//             await this.loadComponent('footer', 'footer-container');
            
//             // Carregar página inicial
//             await this.loadPage('home');
            
//             // Configurar navegação
//             this.setupNavigation();
            
//             // Configurar efeitos da navbar
//             this.setupNavbarEffects();
            
//             // Esconder loading screen
//             this.hideLoadingScreen();
            
//         } catch (error) {
//             console.error('Erro ao inicializar a aplicação:', error);
//             this.showError('Erro ao carregar a aplicação. Tente atualizar a página.');
//         }
//     }

//     async loadComponent(componentName, containerId) {
//         try {
//             const response = await fetch(this.components[componentName]);
//             if (!response.ok) {
//                 throw new Error(`Erro ao carregar ${componentName}: ${response.status}`);
//             }
            
//             const html = await response.text();
//             const container = document.getElementById(containerId);
            
//             if (container) {
//                 container.innerHTML = html;
//                 container.classList.add('loaded');
                
//                 // Aplicar animações
//                 this.applyAnimations(container);
//             }
//         } catch (error) {
//             console.error(`Erro ao carregar componente ${componentName}:`, error);
//             // Fallback para componente não encontrado
//             this.createFallbackComponent(componentName, containerId);
//         }
//     }

//     async loadPage(pageName) {
//         try {
//             const response = await fetch(this.components[pageName]);
//             if (!response.ok) {
//                 throw new Error(`Erro ao carregar página ${pageName}: ${response.status}`);
//             }
            
//             const html = await response.text();
//             const mainContainer = document.getElementById('main-content');
            
//             if (mainContainer) {
//                 // Fade out
//                 mainContainer.style.opacity = '0';
                
//                 setTimeout(() => {
//                     mainContainer.innerHTML = html;
//                     mainContainer.classList.add('loaded');
//                     this.currentPage = pageName;
                    
//                     // Fade in
//                     mainContainer.style.opacity = '1';
                    
//                     // Aplicar animações
//                     this.applyAnimations(mainContainer);
                    
//                     // Atualizar navbar ativa
//                     this.updateActiveNavLink(pageName);
                    
//                 }, 150);
//             }
//         } catch (error) {
//             console.error(`Erro ao carregar página ${pageName}:`, error);
//             this.showError(`Erro ao carregar a página ${pageName}`);
//         }
//     }

//     setupNavigation() {
//         // Delegar eventos para links de navegação
//         document.addEventListener('click', (e) => {
//             const link = e.target.closest('[data-page]');
//             if (link) {
//                 e.preventDefault();
//                 const pageName = link.getAttribute('data-page');
//                 this.loadPage(pageName);
                
//                 // Fechar menu mobile se estiver aberto
//                 const navbarToggler = document.querySelector('.navbar-collapse');
//                 if (navbarToggler && navbarToggler.classList.contains('show')) {
//                     const toggleButton = document.querySelector('.navbar-toggler');
//                     if (toggleButton) {
//                         toggleButton.click();
//                     }
//                 }
//             }
//         });

//         // Configurar botões de ação
//         document.addEventListener('click', (e) => {
//             if (e.target.matches('[data-action="contact"]')) {
//                 e.preventDefault();
//                 this.loadPage('contact');
//             }
//         });
//     }

//     setupNavbarEffects() {
//         // Efeito de scroll na navbar
//         let lastScrollTop = 0;
//         window.addEventListener('scroll', () => {
//             const navbar = document.querySelector('.navbar');
//             const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
//             if (navbar) {
//                 if (scrollTop > 100) {
//                     navbar.classList.add('navbar-scrolled');
//                 } else {
//                     navbar.classList.remove('navbar-scrolled');
//                 }
                
//                 // Auto-hide navbar on scroll down (opcional)
//                 if (scrollTop > lastScrollTop && scrollTop > 500) {
//                     navbar.style.transform = 'translateY(-100%)';
//                 } else {
//                     navbar.style.transform = 'translateY(0)';
//                 }
//             }
            
//             lastScrollTop = scrollTop;
//         });
//     }

//     updateActiveNavLink(pageName) {
//         // Remover classe active de todos os links
//         document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
//             link.classList.remove('active');
//         });
        
//         // Adicionar classe active ao link atual
//         const activeLink = document.querySelector(`[data-page="${pageName}"]`);
//         if (activeLink) {
//             activeLink.classList.add('active');
//         }
//     }

//     applyAnimations(container) {
//         // Aplicar animações aos elementos
//         const elements = container.querySelectorAll('[data-animate]');
//         elements.forEach((element, index) => {
//             const animationType = element.getAttribute('data-animate');
//             const delay = element.getAttribute('data-delay') || index * 100;
            
//             setTimeout(() => {
//                 element.classList.add(animationType);
//             }, delay);
//         });
//     }

//     hideLoadingScreen() {
//         const loadingScreen = document.getElementById('loading-screen');
//         if (loadingScreen) {
//             setTimeout(() => {
//                 loadingScreen.classList.add('hide');
//                 setTimeout(() => {
//                     loadingScreen.remove();
//                 }, 500);
//             }, 1000);
//         }
//     }

//     showError(message) {
//         // Criar toast de erro usando Bootstrap
//         const toastHtml = `
//             <div class="toast-container position-fixed top-0 end-0 p-3">
//                 <div class="toast show" role="alert">
//                     <div class="toast-header bg-danger text-white">
//                         <i class="fas fa-exclamation-triangle me-2"></i>
//                         <strong class="me-auto">Erro</strong>
//                         <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
//                     </div>
//                     <div class="toast-body">
//                         ${message}
//                     </div>
//                 </div>
//             </div>
//         `;
        
//         document.body.insertAdjacentHTML('beforeend', toastHtml);
        
//         // Auto-remove toast após 5 segundos
//         setTimeout(() => {
//             const toast = document.querySelector('.toast');
//             if (toast) {
//                 toast.remove();
//             }
//         }, 5000);
//     }

//     createFallbackComponent(componentName, containerId) {
//         const container = document.getElementById(containerId);
//         if (container) {
//             let fallbackHtml = '';
            
//             switch(componentName) {
//                 case 'navbar':
//                     fallbackHtml = `
//                         <nav class="navbar navbar-expand-lg navbar-light bg-light">
//                             <div class="container">
//                                 <a class="navbar-brand fw-bold text-gradient" href="#">
//                                     <i class="fas fa-chart-line me-2"></i>
//                                     Horizon Global Consulting
//                                 </a>
//                             </div>
//                         </nav>
//                     `;
//                     break;
//                 case 'footer':
//                     fallbackHtml = `
//                         <footer class="bg-dark text-white py-4">
//                             <div class="container text-center">
//                                 <p>&copy; 2025 Horizon Global Consulting. Todos os direitos reservados.</p>
//                             </div>
//                         </footer>
//                     `;
//                     break;
//             }
            
//             container.innerHTML = fallbackHtml;
//             container.classList.add('loaded');
//         }
//     }

//     // Método público para navegação programática
//     navigateTo(pageName) {
//         if (this.components[pageName]) {
//             this.loadPage(pageName);
//         } else {
//             console.warn(`Página "${pageName}" não encontrada`);
//         }
//     }

//     // Método para obter página atual
//     getCurrentPage() {
//         return this.currentPage;
//     }
// }

// // Inicializar aplicação quando DOM estiver carregado
// document.addEventListener('DOMContentLoaded', () => {
//     window.horizonApp = new HorizonApp();
// });

// // Exportar para uso global (opcional)
// window.HorizonApp = HorizonApp;