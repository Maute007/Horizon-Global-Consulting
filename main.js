class HorizonApp {
    constructor() {
        this.currentPage = 'home';
        this.components = {
            // Componentes principais
            navbar: 'components/navbar.html',
            footer: 'components/footer.html',
            
            // Páginas completas
            services: 'components/cabecalho-servicos.html',
            about: 'sobre-completo.html',

            heroSection: 'components/secao-principal.html',
            statsSection: 'components/secao-estatisticas.html',
            aboutSection: 'components/secao-sobre.html',
            servicesPreviewSection: 'components/secao-resumo-servicos.html',
            ctaSection: 'components/secao-chamada-acao.html',

            cabecalhoServicos: 'sections/servicos/cabecalho-servicos.html',
            navegacaoInterna: 'sections/servicos/navegacao-interna.html',
            secaoContabilidade: 'sections/servicos/secao-contabilidade.html',
            secaoConsultoriaFiscal: 'sections/servicos/secao-consultoria-fiscal.html',
            secaoConsultoriaFinanceira: 'sections/servicos/secao-consultoria-financeira.html',
            secaoAuditoria: 'sections/servicos/secao-auditoria.html',
            secaoGestaoEmpresarial: 'sections/servicos/secao-gestao-empresarial.html',
            secaoRecursosHumanos: 'sections/servicos/secao-recursos-humanos.html',
            secaoServicosAdministrativos: 'sections/servicos/secao-servicos-administrativos.html',
            tabelaPrecos: 'sections/servicos/tabela-precos.html',

            // Seções da página sobre nós
            cabecalhoSobreNos: 'sections/sobre-nos/cabecalho-sobre-nos.html',
            nossaHistoria: 'sections/sobre-nos/nossa-historia.html',
            missaoVisaoValores: 'sections/sobre-nos/missao-visao-valores.html',
            porqueEscolherNos: 'sections/sobre-nos/porque-escolher-nos.html',
            nossaEquipa: 'sections/sobre-nos/nossa-equipa.html',
            certificacoesReconhecimentos: 'sections/sobre-nos/certificacoes-reconhecimentos.html',
            chamadaFinalSobreNos: 'sections/sobre-nos/chamada-final-sobre.html',

            // Seções da página contato
            contactHero: 'sections/contacto/contact-hero.html',
            contactInfo: 'sections/contacto/contact-info.html',
            contactLocation: 'sections/contacto/contact-location.html',
            contactMethods: 'sections/contacto/contact-methods.html',
            contactCta: 'sections/contacto/contact-cta.html'
        };
        
        // Definir quais páginas usam seções modulares
        this.modularPages = {
            home: [
                'heroSection',
                'statsSection', 
                'aboutSection',
                'servicesPreviewSection',
                'ctaSection'
            ],
            services: [
                'cabecalhoServicos',
                'navegacaoInterna',
                'secaoContabilidade',
                'secaoConsultoriaFiscal',
                'secaoConsultoriaFinanceira',
                'secaoAuditoria',
                'secaoGestaoEmpresarial',
                'secaoRecursosHumanos',
                'secaoServicosAdministrativos',
                'tabelaPrecos'
            ],
            about: [
                'cabecalhoSobreNos',
                'nossaHistoria',
                'missaoVisaoValores',
                'porqueEscolherNos',
                'nossaEquipa',
                'certificacoesReconhecimentos',
                'chamadaFinalSobreNos'
            ],
            contact: [
                'contactHero',
                'contactInfo',
                'contactLocation',
                'contactMethods',
                'contactCta'
            ]
        };
        
        this.init();
    }

    async init() {
        try {
            // Carregar componentes essenciais
            await this.loadComponent('navbar', 'navbar-container');
            await this.loadComponent('footer', 'footer-container');
            
            // Carregar página inicial
            await this.loadPage('home');
            
            // Configurar navegação
            this.setupNavigation();
            
            // Configurar efeitos da navbar
            this.setupNavbarEffects();
            
            // Esconder loading screen
            this.hideLoadingScreen();
            
        } catch (error) {
            console.error('Erro ao inicializar a aplicação:', error);
            this.showError('Erro ao carregar a aplicação. Tente atualizar a página.');
        }
    }

    async loadComponent(componentName, containerId) {
        try {
            const response = await fetch(this.components[componentName]);
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${componentName}: ${response.status}`);
            }
            
            const html = await response.text();
            const container = document.getElementById(containerId);
            
            if (container) {
                container.innerHTML = html;
                container.classList.add('loaded');
                
                // Aplicar animações
                this.applyAnimations(container);
            }
        } catch (error) {
            console.error(`Erro ao carregar componente ${componentName}:`, error);
            // Fallback para componente não encontrado
            this.createFallbackComponent(componentName, containerId);
        }
    }

    async loadPage(pageName) {
        try {
            const mainContainer = document.getElementById('main-content');
            
            if (mainContainer) {
                // Fade out
                mainContainer.style.opacity = '0';
                
                setTimeout(async () => {
                    // Verificar se é uma página modular
                    if (this.modularPages[pageName]) {
                        await this.loadModularPage(pageName);
                    } else {
                        await this.loadSinglePage(pageName);
                    }
                    
                    this.currentPage = pageName;
                    
                    // Fade in
                    mainContainer.style.opacity = '1';
                    mainContainer.classList.add('loaded');
                    
                    // Aplicar animações
                    this.applyAnimations(mainContainer);
                    
                    // Atualizar navbar ativa
                    this.updateActiveNavLink(pageName);
                    
                }, 150);
            }
        } catch (error) {
            console.error(`Erro ao carregar página ${pageName}:`, error);
            this.showError(`Erro ao carregar a página ${pageName}`);
        }
    }

    async loadModularPage(pageName) {
        const mainContainer = document.getElementById('main-content');
        const sections = this.modularPages[pageName];
        
        // Limpar container
        mainContainer.innerHTML = '';
        
        // Carregar cada seção sequencialmente
        for (const sectionName of sections) {
            await this.loadSectionToContainer(sectionName, 'main-content');
        }
    }

    async loadSinglePage(pageName) {
        const response = await fetch(this.components[pageName]);
        if (!response.ok) {
            throw new Error(`Erro ao carregar página ${pageName}: ${response.status}`);
        }
        
        const html = await response.text();
        const mainContainer = document.getElementById('main-content');
        mainContainer.innerHTML = html;
    }

    async loadSectionToContainer(sectionName, containerId) {
        try {
            const response = await fetch(this.components[sectionName]);
            if (!response.ok) {
                throw new Error(`Erro ao carregar seção ${sectionName}: ${response.status}`);
            }
            
            const html = await response.text();
            const container = document.getElementById(containerId);
            
            if (container) {
                // Criar wrapper div para a seção
                const sectionWrapper = document.createElement('div');
                sectionWrapper.className = `section-wrapper ${sectionName}-wrapper`;
                sectionWrapper.innerHTML = html;
                
                // Adicionar ao container
                container.appendChild(sectionWrapper);
                
                console.log(`Seção ${sectionName} carregada com sucesso`);
            }
            
        } catch (error) {
            console.error(`Erro ao carregar seção ${sectionName}:`, error);
            this.createFallbackSection(sectionName, containerId);
        }
    }

    createFallbackSection(sectionName, containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            const fallbackHtml = `
                <section class="py-5 bg-light">
                    <div class="container text-center">
                        <div class="alert alert-warning" role="alert">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            <strong>Erro:</strong> Não foi possível carregar a seção "${sectionName}".
                            <br><small>Verifique se o arquivo existe no caminho correto.</small>
                        </div>
                    </div>
                </section>
            `;
            
            const sectionWrapper = document.createElement('div');
            sectionWrapper.className = `section-wrapper ${sectionName}-wrapper error`;
            sectionWrapper.innerHTML = fallbackHtml;
            container.appendChild(sectionWrapper);
        }
    }

    // ✅ ADICIONADO: Método para carregar página e rolar para seção específica
    async loadPageAndScrollToSection(pageName, sectionId) {
        try {
            // Primeiro carrega a página
            await this.loadPage(pageName);
            
            // Espera um pouco para a página carregar completamente
            setTimeout(() => {
                const targetElement = document.getElementById(sectionId);
                if (targetElement) {
                    // Rola suavemente para a seção
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Atualizar link ativo na navegação interna (se existir)
                    const serviceNavLinks = document.querySelectorAll('.service-nav-link');
                    if (serviceNavLinks.length > 0) {
                        serviceNavLinks.forEach(link => link.classList.remove('active'));
                        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
                        if (activeLink) {
                            activeLink.classList.add('active');
                        }
                    }
                } else {
                    console.warn(`Seção "${sectionId}" não encontrada na página "${pageName}"`);
                }
            }, 700); // Espera 700ms para garantir que todas as seções carregaram
            
        } catch (error) {
            console.error(`Erro ao carregar página ${pageName} e rolar para seção ${sectionId}:`, error);
            this.showError(`Erro ao navegar para ${pageName}`);
        }
    }

    setupNavigation() {
        // Delegar eventos para links de navegação
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-page]');
            if (link) {
                e.preventDefault();
                const pageName = link.getAttribute('data-page');
                const serviceSection = link.getAttribute('data-service'); // ✅ ADICIONADO
                
                // ✅ ADICIONADO: Se tem data-service, vai para página e depois para seção
                if (serviceSection) {
                    this.loadPageAndScrollToSection(pageName, serviceSection);
                } else {
                    this.loadPage(pageName);
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                
                // Fechar menu mobile se estiver aberto
                const navbarToggler = document.querySelector('.navbar-collapse');
                if (navbarToggler && navbarToggler.classList.contains('show')) {
                    const toggleButton = document.querySelector('.navbar-toggler');
                    if (toggleButton) {
                        toggleButton.click();
                    }
                }
            }
        });

        // Configurar botões de ação
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="contact"]')) {
                e.preventDefault();
                this.loadPage('contact');
            }
        });
    }

    setupNavbarEffects() {
        // Efeito de scroll na navbar
        let lastScrollTop = 0;
        let scrollTimer = null;
        
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (navbar) {
                // Adicionar classe scrolled
                if (scrollTop > 100) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
                // Auto-hide navbar on scroll down (opcional)
                if (scrollTop > lastScrollTop && scrollTop > 500) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                
                // Debounce scroll events
                if (scrollTimer) {
                    clearTimeout(scrollTimer);
                }
                
                scrollTimer = setTimeout(() => {
                    // Ações após parar de scroll
                    navbar.style.transition = 'transform 0.3s ease';
                }, 150);
            }
            
            lastScrollTop = scrollTop;
        });
    }
    updateActiveNavLink(pageName) {
        // Remover classe active de todos os links
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Adicionar classe active ao link atual
        const activeLink = document.querySelector(`[data-page="${pageName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    applyAnimations(container) {
        // Aplicar animações aos elementos
        const elements = container.querySelectorAll('[data-animate]');
        elements.forEach((element, index) => {
            const animationType = element.getAttribute('data-animate');
            const delay = element.getAttribute('data-delay') || index * 100;
            
            // Reset classes de animação
            element.classList.remove('fade-in', 'slide-in-left', 'slide-in-right');
            
            setTimeout(() => {
                element.classList.add(animationType);
            }, parseInt(delay));
        });
    }
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hide');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1000);
        }
    }
    // Mtodo para mostrar erros
    showError(message) {
        // Criei toast de erro usando Bootstrap/nao vou saber explicar
        const toastHtml = `
            <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999;">
                <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header bg-danger text-white">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        <strong class="me-auto">Erro</strong>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        ${message}
                    </div>
                </div>
            </div>
        `; 
        document.body.insertAdjacentHTML('beforeend', toastHtml);
        
        // Auto-remove toast após 5 segundos
        setTimeout(() => {
            const toast = document.querySelector('.toast');
            if (toast) {
                toast.remove();
            }
        }, 5000);
    }

    createFallbackComponent(componentName, containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            let fallbackHtml = '';
            
            switch(componentName) {
                case 'navbar':
                    fallbackHtml = `
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <div class="container">
                                <a class="navbar-brand fw-bold text-gradient" href="#">
                                    <i class="fas fa-chart-line me-2"></i>
                                    Horizon Global Consulting
                                </a>
                            </div>
                        </nav>
                    `;
                    break;
                case 'footer':
                    fallbackHtml = `
                        <footer class="bg-dark text-white py-4">
                            <div class="container text-center">
                                <p>&copy; 2025 Horizon Global Consulting. Todos os direitos reservados.</p>
                            </div>
                        </footer>
                    `;
                    break;
                default:
                    fallbackHtml = `
                        <div class="alert alert-warning text-center" role="alert">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            Componente "${componentName}" não encontrado.
                        </div>
                    `;
            }
            container.innerHTML = fallbackHtml;
            container.classList.add('loaded');
        }
    }
    // Mtodo publico para navegacao programatica
    navigateTo(pageName) {
        if (this.components[pageName] || this.modularPages[pageName]) {
            this.loadPage(pageName);
        } else {
            console.warn(`Página "${pageName}" não encontrada`);
            this.showError(`Página "${pageName}" não encontrada`);
        }
    }
    // Mtodo para obter pagina atual
    getCurrentPage() {
        return this.currentPage;
    }
    // Metodo para recarregar página atual
    reloadCurrentPage() {
        this.loadPage(this.currentPage);
    }

    // Mitodo para adicionar nova seção dinamicamente
    addSectionToPage(pageName, sectionName, sectionPath) {
        if (!this.modularPages[pageName]) {
            this.modularPages[pageName] = [];
        }
        
        this.modularPages[pageName].push(sectionName);
        this.components[sectionName] = sectionPath;
    }

    // parte de debug
    getDebugInfo() {
        return {
            currentPage: this.currentPage,
            components: this.components,
            modularPages: this.modularPages
        };
    }
}

// Inicializar aplicacaoo quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.horizonApp = new HorizonApp();
    
    // Debug mode (remover em produção)
    if (window.location.search.includes('debug=true')) {
        console.log('Debug Info:', window.horizonApp.getDebugInfo());
    }
});

// Exportar para uso global essa parte n sei se funciona
window.HorizonApp = HorizonApp;