'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">back-fotonube documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AdminModule-2eff05e2b0e8ea82ad62c1e1fc2159a990c3b54fd94c73980abc7660158e6f2b8ee87ebdb4039853a603534c9e5ea87242cc5e72d399351a101f3b5fd90286d8"' : 'data-bs-target="#xs-controllers-links-module-AdminModule-2eff05e2b0e8ea82ad62c1e1fc2159a990c3b54fd94c73980abc7660158e6f2b8ee87ebdb4039853a603534c9e5ea87242cc5e72d399351a101f3b5fd90286d8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-2eff05e2b0e8ea82ad62c1e1fc2159a990c3b54fd94c73980abc7660158e6f2b8ee87ebdb4039853a603534c9e5ea87242cc5e72d399351a101f3b5fd90286d8"' :
                                            'id="xs-controllers-links-module-AdminModule-2eff05e2b0e8ea82ad62c1e1fc2159a990c3b54fd94c73980abc7660158e6f2b8ee87ebdb4039853a603534c9e5ea87242cc5e72d399351a101f3b5fd90286d8"' }>
                                            <li class="link">
                                                <a href="controllers/AdminAlbumController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminAlbumController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AdminOrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminOrderController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AdminUserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminUserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdminModule-2eff05e2b0e8ea82ad62c1e1fc2159a990c3b54fd94c73980abc7660158e6f2b8ee87ebdb4039853a603534c9e5ea87242cc5e72d399351a101f3b5fd90286d8"' : 'data-bs-target="#xs-injectables-links-module-AdminModule-2eff05e2b0e8ea82ad62c1e1fc2159a990c3b54fd94c73980abc7660158e6f2b8ee87ebdb4039853a603534c9e5ea87242cc5e72d399351a101f3b5fd90286d8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-2eff05e2b0e8ea82ad62c1e1fc2159a990c3b54fd94c73980abc7660158e6f2b8ee87ebdb4039853a603534c9e5ea87242cc5e72d399351a101f3b5fd90286d8"' :
                                        'id="xs-injectables-links-module-AdminModule-2eff05e2b0e8ea82ad62c1e1fc2159a990c3b54fd94c73980abc7660158e6f2b8ee87ebdb4039853a603534c9e5ea87242cc5e72d399351a101f3b5fd90286d8"' }>
                                        <li class="link">
                                            <a href="injectables/AdminAlbumService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminAlbumService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AdminOrderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminOrderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AdminUserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminUserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AlbumModule.html" data-type="entity-link" >AlbumModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AlbumModule-b2c461ea8f1ddd169b4e6facf7eadafee7e6195243882419066d1b3aef7424dcb2933b57bca03e590a8fda0020803335fdc8ba749e096b41ac9cc62d8fd5ae32"' : 'data-bs-target="#xs-controllers-links-module-AlbumModule-b2c461ea8f1ddd169b4e6facf7eadafee7e6195243882419066d1b3aef7424dcb2933b57bca03e590a8fda0020803335fdc8ba749e096b41ac9cc62d8fd5ae32"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AlbumModule-b2c461ea8f1ddd169b4e6facf7eadafee7e6195243882419066d1b3aef7424dcb2933b57bca03e590a8fda0020803335fdc8ba749e096b41ac9cc62d8fd5ae32"' :
                                            'id="xs-controllers-links-module-AlbumModule-b2c461ea8f1ddd169b4e6facf7eadafee7e6195243882419066d1b3aef7424dcb2933b57bca03e590a8fda0020803335fdc8ba749e096b41ac9cc62d8fd5ae32"' }>
                                            <li class="link">
                                                <a href="controllers/AlbumAccessController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlbumAccessController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AlbumController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlbumController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AlbumModule-b2c461ea8f1ddd169b4e6facf7eadafee7e6195243882419066d1b3aef7424dcb2933b57bca03e590a8fda0020803335fdc8ba749e096b41ac9cc62d8fd5ae32"' : 'data-bs-target="#xs-injectables-links-module-AlbumModule-b2c461ea8f1ddd169b4e6facf7eadafee7e6195243882419066d1b3aef7424dcb2933b57bca03e590a8fda0020803335fdc8ba749e096b41ac9cc62d8fd5ae32"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AlbumModule-b2c461ea8f1ddd169b4e6facf7eadafee7e6195243882419066d1b3aef7424dcb2933b57bca03e590a8fda0020803335fdc8ba749e096b41ac9cc62d8fd5ae32"' :
                                        'id="xs-injectables-links-module-AlbumModule-b2c461ea8f1ddd169b4e6facf7eadafee7e6195243882419066d1b3aef7424dcb2933b57bca03e590a8fda0020803335fdc8ba749e096b41ac9cc62d8fd5ae32"' }>
                                        <li class="link">
                                            <a href="injectables/AlbumAccessService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlbumAccessService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AlbumService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlbumService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-fa9cb2b9d6b1742da058a74540bd9156650a2faa23c514efe4e781df491e472dd93cd41fdbbab0c018618ab59c6beeee812acf8764f77e31a08011b7e592a32b"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-fa9cb2b9d6b1742da058a74540bd9156650a2faa23c514efe4e781df491e472dd93cd41fdbbab0c018618ab59c6beeee812acf8764f77e31a08011b7e592a32b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-fa9cb2b9d6b1742da058a74540bd9156650a2faa23c514efe4e781df491e472dd93cd41fdbbab0c018618ab59c6beeee812acf8764f77e31a08011b7e592a32b"' :
                                            'id="xs-controllers-links-module-AuthModule-fa9cb2b9d6b1742da058a74540bd9156650a2faa23c514efe4e781df491e472dd93cd41fdbbab0c018618ab59c6beeee812acf8764f77e31a08011b7e592a32b"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-fa9cb2b9d6b1742da058a74540bd9156650a2faa23c514efe4e781df491e472dd93cd41fdbbab0c018618ab59c6beeee812acf8764f77e31a08011b7e592a32b"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-fa9cb2b9d6b1742da058a74540bd9156650a2faa23c514efe4e781df491e472dd93cd41fdbbab0c018618ab59c6beeee812acf8764f77e31a08011b7e592a32b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-fa9cb2b9d6b1742da058a74540bd9156650a2faa23c514efe4e781df491e472dd93cd41fdbbab0c018618ab59c6beeee812acf8764f77e31a08011b7e592a32b"' :
                                        'id="xs-injectables-links-module-AuthModule-fa9cb2b9d6b1742da058a74540bd9156650a2faa23c514efe4e781df491e472dd93cd41fdbbab0c018618ab59c6beeee812acf8764f77e31a08011b7e592a32b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PasswordResetService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordResetService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-ad12130f9d535d027c413b3cb74b66c383ce822802e76dd5c220bc8938dece4a31068a1a7e3050a28e6703613da668cc2c44ce997e2cb349679a70ad42ca7809"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-ad12130f9d535d027c413b3cb74b66c383ce822802e76dd5c220bc8938dece4a31068a1a7e3050a28e6703613da668cc2c44ce997e2cb349679a70ad42ca7809"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-ad12130f9d535d027c413b3cb74b66c383ce822802e76dd5c220bc8938dece4a31068a1a7e3050a28e6703613da668cc2c44ce997e2cb349679a70ad42ca7809"' :
                                            'id="xs-controllers-links-module-FilesModule-ad12130f9d535d027c413b3cb74b66c383ce822802e76dd5c220bc8938dece4a31068a1a7e3050a28e6703613da668cc2c44ce997e2cb349679a70ad42ca7809"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-ad12130f9d535d027c413b3cb74b66c383ce822802e76dd5c220bc8938dece4a31068a1a7e3050a28e6703613da668cc2c44ce997e2cb349679a70ad42ca7809"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-ad12130f9d535d027c413b3cb74b66c383ce822802e76dd5c220bc8938dece4a31068a1a7e3050a28e6703613da668cc2c44ce997e2cb349679a70ad42ca7809"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-ad12130f9d535d027c413b3cb74b66c383ce822802e76dd5c220bc8938dece4a31068a1a7e3050a28e6703613da668cc2c44ce997e2cb349679a70ad42ca7809"' :
                                        'id="xs-injectables-links-module-FilesModule-ad12130f9d535d027c413b3cb74b66c383ce822802e76dd5c220bc8938dece4a31068a1a7e3050a28e6703613da668cc2c44ce997e2cb349679a70ad42ca7809"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeadModule.html" data-type="entity-link" >LeadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LeadModule-f20e2030e315e72eb5d5ab5ea2e284244adafd79b99071a7238005de708468cb65c73b76bca9930ef5f8a5c19deb87ecd3578d6372c00f50c41ff58c84e6f439"' : 'data-bs-target="#xs-controllers-links-module-LeadModule-f20e2030e315e72eb5d5ab5ea2e284244adafd79b99071a7238005de708468cb65c73b76bca9930ef5f8a5c19deb87ecd3578d6372c00f50c41ff58c84e6f439"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LeadModule-f20e2030e315e72eb5d5ab5ea2e284244adafd79b99071a7238005de708468cb65c73b76bca9930ef5f8a5c19deb87ecd3578d6372c00f50c41ff58c84e6f439"' :
                                            'id="xs-controllers-links-module-LeadModule-f20e2030e315e72eb5d5ab5ea2e284244adafd79b99071a7238005de708468cb65c73b76bca9930ef5f8a5c19deb87ecd3578d6372c00f50c41ff58c84e6f439"' }>
                                            <li class="link">
                                                <a href="controllers/LeadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeadController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LeadModule-f20e2030e315e72eb5d5ab5ea2e284244adafd79b99071a7238005de708468cb65c73b76bca9930ef5f8a5c19deb87ecd3578d6372c00f50c41ff58c84e6f439"' : 'data-bs-target="#xs-injectables-links-module-LeadModule-f20e2030e315e72eb5d5ab5ea2e284244adafd79b99071a7238005de708468cb65c73b76bca9930ef5f8a5c19deb87ecd3578d6372c00f50c41ff58c84e6f439"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LeadModule-f20e2030e315e72eb5d5ab5ea2e284244adafd79b99071a7238005de708468cb65c73b76bca9930ef5f8a5c19deb87ecd3578d6372c00f50c41ff58c84e6f439"' :
                                        'id="xs-injectables-links-module-LeadModule-f20e2030e315e72eb5d5ab5ea2e284244adafd79b99071a7238005de708468cb65c73b76bca9930ef5f8a5c19deb87ecd3578d6372c00f50c41ff58c84e6f439"' }>
                                        <li class="link">
                                            <a href="injectables/LeadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeadService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-2e35df8a7db93852498f881d1c77b0d0a56f84b9fc2ad5260bcbd6e0379b5bba526a29c6cac685d1b9d5807e51b9d56dc90fbd0e6831ec46ad5d9312b18c9204"' : 'data-bs-target="#xs-injectables-links-module-MailModule-2e35df8a7db93852498f881d1c77b0d0a56f84b9fc2ad5260bcbd6e0379b5bba526a29c6cac685d1b9d5807e51b9d56dc90fbd0e6831ec46ad5d9312b18c9204"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-2e35df8a7db93852498f881d1c77b0d0a56f84b9fc2ad5260bcbd6e0379b5bba526a29c6cac685d1b9d5807e51b9d56dc90fbd0e6831ec46ad5d9312b18c9204"' :
                                        'id="xs-injectables-links-module-MailModule-2e35df8a7db93852498f881d1c77b0d0a56f84b9fc2ad5260bcbd6e0379b5bba526a29c6cac685d1b9d5807e51b9d56dc90fbd0e6831ec46ad5d9312b18c9204"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MercadopagoModule.html" data-type="entity-link" >MercadopagoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MercadopagoModule-7bf44a9c308ebd25eded3bbc1c06b8ff6031818d5b683bd11e355f53bd473742a7bcc624222efe8a5517e0608da2e28e8dc4250b0ccc81d5ea5333d2363b1673"' : 'data-bs-target="#xs-controllers-links-module-MercadopagoModule-7bf44a9c308ebd25eded3bbc1c06b8ff6031818d5b683bd11e355f53bd473742a7bcc624222efe8a5517e0608da2e28e8dc4250b0ccc81d5ea5333d2363b1673"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MercadopagoModule-7bf44a9c308ebd25eded3bbc1c06b8ff6031818d5b683bd11e355f53bd473742a7bcc624222efe8a5517e0608da2e28e8dc4250b0ccc81d5ea5333d2363b1673"' :
                                            'id="xs-controllers-links-module-MercadopagoModule-7bf44a9c308ebd25eded3bbc1c06b8ff6031818d5b683bd11e355f53bd473742a7bcc624222efe8a5517e0608da2e28e8dc4250b0ccc81d5ea5333d2363b1673"' }>
                                            <li class="link">
                                                <a href="controllers/MercadopagoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MercadopagoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MercadopagoModule-7bf44a9c308ebd25eded3bbc1c06b8ff6031818d5b683bd11e355f53bd473742a7bcc624222efe8a5517e0608da2e28e8dc4250b0ccc81d5ea5333d2363b1673"' : 'data-bs-target="#xs-injectables-links-module-MercadopagoModule-7bf44a9c308ebd25eded3bbc1c06b8ff6031818d5b683bd11e355f53bd473742a7bcc624222efe8a5517e0608da2e28e8dc4250b0ccc81d5ea5333d2363b1673"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MercadopagoModule-7bf44a9c308ebd25eded3bbc1c06b8ff6031818d5b683bd11e355f53bd473742a7bcc624222efe8a5517e0608da2e28e8dc4250b0ccc81d5ea5333d2363b1673"' :
                                        'id="xs-injectables-links-module-MercadopagoModule-7bf44a9c308ebd25eded3bbc1c06b8ff6031818d5b683bd11e355f53bd473742a7bcc624222efe8a5517e0608da2e28e8dc4250b0ccc81d5ea5333d2363b1673"' }>
                                        <li class="link">
                                            <a href="injectables/MercadopagoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MercadopagoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrdersModule-69b4a58be80a334e132c06d7a7fd1627e5a6537278771e273cdd1743b5be4effcab52baed72c59bc55f993423eeba8562e4f7322d8ad78dce039788e1ece2a3b"' : 'data-bs-target="#xs-controllers-links-module-OrdersModule-69b4a58be80a334e132c06d7a7fd1627e5a6537278771e273cdd1743b5be4effcab52baed72c59bc55f993423eeba8562e4f7322d8ad78dce039788e1ece2a3b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrdersModule-69b4a58be80a334e132c06d7a7fd1627e5a6537278771e273cdd1743b5be4effcab52baed72c59bc55f993423eeba8562e4f7322d8ad78dce039788e1ece2a3b"' :
                                            'id="xs-controllers-links-module-OrdersModule-69b4a58be80a334e132c06d7a7fd1627e5a6537278771e273cdd1743b5be4effcab52baed72c59bc55f993423eeba8562e4f7322d8ad78dce039788e1ece2a3b"' }>
                                            <li class="link">
                                                <a href="controllers/BuyerOrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BuyerOrdersController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PhotographerOrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PhotographerOrdersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrdersModule-69b4a58be80a334e132c06d7a7fd1627e5a6537278771e273cdd1743b5be4effcab52baed72c59bc55f993423eeba8562e4f7322d8ad78dce039788e1ece2a3b"' : 'data-bs-target="#xs-injectables-links-module-OrdersModule-69b4a58be80a334e132c06d7a7fd1627e5a6537278771e273cdd1743b5be4effcab52baed72c59bc55f993423eeba8562e4f7322d8ad78dce039788e1ece2a3b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrdersModule-69b4a58be80a334e132c06d7a7fd1627e5a6537278771e273cdd1743b5be4effcab52baed72c59bc55f993423eeba8562e4f7322d8ad78dce039788e1ece2a3b"' :
                                        'id="xs-injectables-links-module-OrdersModule-69b4a58be80a334e132c06d7a7fd1627e5a6537278771e273cdd1743b5be4effcab52baed72c59bc55f993423eeba8562e4f7322d8ad78dce039788e1ece2a3b"' }>
                                        <li class="link">
                                            <a href="injectables/BuyerOrdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BuyerOrdersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PhotographerOrdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PhotographerOrdersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentModule.html" data-type="entity-link" >PaymentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaymentModule-715840c3f90a1756be59295aaebccd41d4eb9619128d5da6d03e6162427b8576d370685ab20e97177f3aaebd9eadb995fc37ca06a097fe16fc2ce0df8900bc2e"' : 'data-bs-target="#xs-controllers-links-module-PaymentModule-715840c3f90a1756be59295aaebccd41d4eb9619128d5da6d03e6162427b8576d370685ab20e97177f3aaebd9eadb995fc37ca06a097fe16fc2ce0df8900bc2e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentModule-715840c3f90a1756be59295aaebccd41d4eb9619128d5da6d03e6162427b8576d370685ab20e97177f3aaebd9eadb995fc37ca06a097fe16fc2ce0df8900bc2e"' :
                                            'id="xs-controllers-links-module-PaymentModule-715840c3f90a1756be59295aaebccd41d4eb9619128d5da6d03e6162427b8576d370685ab20e97177f3aaebd9eadb995fc37ca06a097fe16fc2ce0df8900bc2e"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymentModule-715840c3f90a1756be59295aaebccd41d4eb9619128d5da6d03e6162427b8576d370685ab20e97177f3aaebd9eadb995fc37ca06a097fe16fc2ce0df8900bc2e"' : 'data-bs-target="#xs-injectables-links-module-PaymentModule-715840c3f90a1756be59295aaebccd41d4eb9619128d5da6d03e6162427b8576d370685ab20e97177f3aaebd9eadb995fc37ca06a097fe16fc2ce0df8900bc2e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentModule-715840c3f90a1756be59295aaebccd41d4eb9619128d5da6d03e6162427b8576d370685ab20e97177f3aaebd9eadb995fc37ca06a097fe16fc2ce0df8900bc2e"' :
                                        'id="xs-injectables-links-module-PaymentModule-715840c3f90a1756be59295aaebccd41d4eb9619128d5da6d03e6162427b8576d370685ab20e97177f3aaebd9eadb995fc37ca06a097fe16fc2ce0df8900bc2e"' }>
                                        <li class="link">
                                            <a href="injectables/PaymentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PhotoModule.html" data-type="entity-link" >PhotoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PhotoModule-21831ed8520af91fdf61e98a3d19ea4b8f2c28c0e83e2bbb0376cb7921bada947c31fb415b558e2061f9ff68a3b7297ccbf2dc94281ca532a375b50e2c2734f6"' : 'data-bs-target="#xs-controllers-links-module-PhotoModule-21831ed8520af91fdf61e98a3d19ea4b8f2c28c0e83e2bbb0376cb7921bada947c31fb415b558e2061f9ff68a3b7297ccbf2dc94281ca532a375b50e2c2734f6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PhotoModule-21831ed8520af91fdf61e98a3d19ea4b8f2c28c0e83e2bbb0376cb7921bada947c31fb415b558e2061f9ff68a3b7297ccbf2dc94281ca532a375b50e2c2734f6"' :
                                            'id="xs-controllers-links-module-PhotoModule-21831ed8520af91fdf61e98a3d19ea4b8f2c28c0e83e2bbb0376cb7921bada947c31fb415b558e2061f9ff68a3b7297ccbf2dc94281ca532a375b50e2c2734f6"' }>
                                            <li class="link">
                                                <a href="controllers/PhotoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PhotoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PhotoModule-21831ed8520af91fdf61e98a3d19ea4b8f2c28c0e83e2bbb0376cb7921bada947c31fb415b558e2061f9ff68a3b7297ccbf2dc94281ca532a375b50e2c2734f6"' : 'data-bs-target="#xs-injectables-links-module-PhotoModule-21831ed8520af91fdf61e98a3d19ea4b8f2c28c0e83e2bbb0376cb7921bada947c31fb415b558e2061f9ff68a3b7297ccbf2dc94281ca532a375b50e2c2734f6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PhotoModule-21831ed8520af91fdf61e98a3d19ea4b8f2c28c0e83e2bbb0376cb7921bada947c31fb415b558e2061f9ff68a3b7297ccbf2dc94281ca532a375b50e2c2734f6"' :
                                        'id="xs-injectables-links-module-PhotoModule-21831ed8520af91fdf61e98a3d19ea4b8f2c28c0e83e2bbb0376cb7921bada947c31fb415b558e2061f9ff68a3b7297ccbf2dc94281ca532a375b50e2c2734f6"' }>
                                        <li class="link">
                                            <a href="injectables/PhotoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PhotoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SeedModule.html" data-type="entity-link" >SeedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SeedModule-aae2b5a371b055359436dd8f2c1e8771ee26516765e3623a8f67969a75e72d718efe5dbe120d533ae045028eafc3e8cf15bcf4c2b5bd3d220347a63fecf7c772"' : 'data-bs-target="#xs-controllers-links-module-SeedModule-aae2b5a371b055359436dd8f2c1e8771ee26516765e3623a8f67969a75e72d718efe5dbe120d533ae045028eafc3e8cf15bcf4c2b5bd3d220347a63fecf7c772"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SeedModule-aae2b5a371b055359436dd8f2c1e8771ee26516765e3623a8f67969a75e72d718efe5dbe120d533ae045028eafc3e8cf15bcf4c2b5bd3d220347a63fecf7c772"' :
                                            'id="xs-controllers-links-module-SeedModule-aae2b5a371b055359436dd8f2c1e8771ee26516765e3623a8f67969a75e72d718efe5dbe120d533ae045028eafc3e8cf15bcf4c2b5bd3d220347a63fecf7c772"' }>
                                            <li class="link">
                                                <a href="controllers/SeedController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeedController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SeedModule-aae2b5a371b055359436dd8f2c1e8771ee26516765e3623a8f67969a75e72d718efe5dbe120d533ae045028eafc3e8cf15bcf4c2b5bd3d220347a63fecf7c772"' : 'data-bs-target="#xs-injectables-links-module-SeedModule-aae2b5a371b055359436dd8f2c1e8771ee26516765e3623a8f67969a75e72d718efe5dbe120d533ae045028eafc3e8cf15bcf4c2b5bd3d220347a63fecf7c772"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SeedModule-aae2b5a371b055359436dd8f2c1e8771ee26516765e3623a8f67969a75e72d718efe5dbe120d533ae045028eafc3e8cf15bcf4c2b5bd3d220347a63fecf7c772"' :
                                        'id="xs-injectables-links-module-SeedModule-aae2b5a371b055359436dd8f2c1e8771ee26516765e3623a8f67969a75e72d718efe5dbe120d533ae045028eafc3e8cf15bcf4c2b5bd3d220347a63fecf7c772"' }>
                                        <li class="link">
                                            <a href="injectables/SeedService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeedService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscriptionModule.html" data-type="entity-link" >SubscriptionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscriptionModule-5595a5cbc88a269164bda0caad6d0d7136abc0cd37fccb1789c953a8cef5b5e35289c17314cbaf58a61a416c7a9e6533824f5150779f5d627d7aa9117c1af03d"' : 'data-bs-target="#xs-controllers-links-module-SubscriptionModule-5595a5cbc88a269164bda0caad6d0d7136abc0cd37fccb1789c953a8cef5b5e35289c17314cbaf58a61a416c7a9e6533824f5150779f5d627d7aa9117c1af03d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscriptionModule-5595a5cbc88a269164bda0caad6d0d7136abc0cd37fccb1789c953a8cef5b5e35289c17314cbaf58a61a416c7a9e6533824f5150779f5d627d7aa9117c1af03d"' :
                                            'id="xs-controllers-links-module-SubscriptionModule-5595a5cbc88a269164bda0caad6d0d7136abc0cd37fccb1789c953a8cef5b5e35289c17314cbaf58a61a416c7a9e6533824f5150779f5d627d7aa9117c1af03d"' }>
                                            <li class="link">
                                                <a href="controllers/SubscriptionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscriptionModule-5595a5cbc88a269164bda0caad6d0d7136abc0cd37fccb1789c953a8cef5b5e35289c17314cbaf58a61a416c7a9e6533824f5150779f5d627d7aa9117c1af03d"' : 'data-bs-target="#xs-injectables-links-module-SubscriptionModule-5595a5cbc88a269164bda0caad6d0d7136abc0cd37fccb1789c953a8cef5b5e35289c17314cbaf58a61a416c7a9e6533824f5150779f5d627d7aa9117c1af03d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscriptionModule-5595a5cbc88a269164bda0caad6d0d7136abc0cd37fccb1789c953a8cef5b5e35289c17314cbaf58a61a416c7a9e6533824f5150779f5d627d7aa9117c1af03d"' :
                                        'id="xs-injectables-links-module-SubscriptionModule-5595a5cbc88a269164bda0caad6d0d7136abc0cd37fccb1789c953a8cef5b5e35289c17314cbaf58a61a416c7a9e6533824f5150779f5d627d7aa9117c1af03d"' }>
                                        <li class="link">
                                            <a href="injectables/SubscriptionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-f19b46b6ea63781192f6811ecb8392cda173a34a08b17f72abae7d29904ee6de388cd9264d4820e8816b7448488fd426d12bd9a76b557522d6b3378df3fe00b4"' : 'data-bs-target="#xs-controllers-links-module-UserModule-f19b46b6ea63781192f6811ecb8392cda173a34a08b17f72abae7d29904ee6de388cd9264d4820e8816b7448488fd426d12bd9a76b557522d6b3378df3fe00b4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-f19b46b6ea63781192f6811ecb8392cda173a34a08b17f72abae7d29904ee6de388cd9264d4820e8816b7448488fd426d12bd9a76b557522d6b3378df3fe00b4"' :
                                            'id="xs-controllers-links-module-UserModule-f19b46b6ea63781192f6811ecb8392cda173a34a08b17f72abae7d29904ee6de388cd9264d4820e8816b7448488fd426d12bd9a76b557522d6b3378df3fe00b4"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-f19b46b6ea63781192f6811ecb8392cda173a34a08b17f72abae7d29904ee6de388cd9264d4820e8816b7448488fd426d12bd9a76b557522d6b3378df3fe00b4"' : 'data-bs-target="#xs-injectables-links-module-UserModule-f19b46b6ea63781192f6811ecb8392cda173a34a08b17f72abae7d29904ee6de388cd9264d4820e8816b7448488fd426d12bd9a76b557522d6b3378df3fe00b4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-f19b46b6ea63781192f6811ecb8392cda173a34a08b17f72abae7d29904ee6de388cd9264d4820e8816b7448488fd426d12bd9a76b557522d6b3378df3fe00b4"' :
                                        'id="xs-injectables-links-module-UserModule-f19b46b6ea63781192f6811ecb8392cda173a34a08b17f72abae7d29904ee6de388cd9264d4820e8816b7448488fd426d12bd9a76b557522d6b3378df3fe00b4"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AdminAlbumController.html" data-type="entity-link" >AdminAlbumController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AdminOrderController.html" data-type="entity-link" >AdminOrderController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AdminUserController.html" data-type="entity-link" >AdminUserController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AlbumAccessController.html" data-type="entity-link" >AlbumAccessController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AlbumController.html" data-type="entity-link" >AlbumController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BuyerOrdersController.html" data-type="entity-link" >BuyerOrdersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LeadController.html" data-type="entity-link" >LeadController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MercadopagoController.html" data-type="entity-link" >MercadopagoController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PaymentController.html" data-type="entity-link" >PaymentController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PhotoController.html" data-type="entity-link" >PhotoController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PhotographerOrdersController.html" data-type="entity-link" >PhotographerOrdersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SeedController.html" data-type="entity-link" >SeedController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscriptionController.html" data-type="entity-link" >SubscriptionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Album.html" data-type="entity-link" >Album</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Lead.html" data-type="entity-link" >Lead</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Order.html" data-type="entity-link" >Order</a>
                                </li>
                                <li class="link">
                                    <a href="entities/OrderItem.html" data-type="entity-link" >OrderItem</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PasswordResetToken.html" data-type="entity-link" >PasswordResetToken</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PaymentAccount.html" data-type="entity-link" >PaymentAccount</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Photo.html" data-type="entity-link" >Photo</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Subscription.html" data-type="entity-link" >Subscription</a>
                                </li>
                                <li class="link">
                                    <a href="entities/SubscriptionOrder.html" data-type="entity-link" >SubscriptionOrder</a>
                                </li>
                                <li class="link">
                                    <a href="entities/SubscriptionPlan.html" data-type="entity-link" >SubscriptionPlan</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminAlbumByIdDto.html" data-type="entity-link" >AdminAlbumByIdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminAlbumDto.html" data-type="entity-link" >AdminAlbumDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminUserDto.html" data-type="entity-link" >AdminUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Album.html" data-type="entity-link" >Album</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlbumSummaryDto.html" data-type="entity-link" >AlbumSummaryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseUserDto.html" data-type="entity-link" >BaseUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAdminDto.html" data-type="entity-link" >CreateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAlbumDto.html" data-type="entity-link" >CreateAlbumDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLeadDto.html" data-type="entity-link" >CreateLeadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMercadopagoDto.html" data-type="entity-link" >CreateMercadopagoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrderDto.html" data-type="entity-link" >CreateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentAccountDto.html" data-type="entity-link" >CreatePaymentAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePhotoDto.html" data-type="entity-link" >CreatePhotoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSeedDto.html" data-type="entity-link" >CreateSeedDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriptionDto.html" data-type="entity-link" >CreateSubscriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriptionOrderDto.html" data-type="entity-link" >CreateSubscriptionOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Mercadopago.html" data-type="entity-link" >Mercadopago</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderItemDto.html" data-type="entity-link" >OrderItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderItemResponseDto.html" data-type="entity-link" >OrderItemResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderResponseDto.html" data-type="entity-link" >OrderResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDto.html" data-type="entity-link" >PaginationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PriceOptionDto.html" data-type="entity-link" >PriceOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Seed.html" data-type="entity-link" >Seed</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAdminDto.html" data-type="entity-link" >UpdateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAlbumDto.html" data-type="entity-link" >UpdateAlbumDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDeliveryStatusDto.html" data-type="entity-link" >UpdateDeliveryStatusDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLeadDto.html" data-type="entity-link" >UpdateLeadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMercadopagoDto.html" data-type="entity-link" >UpdateMercadopagoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrderDto.html" data-type="entity-link" >UpdateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePaymentDto.html" data-type="entity-link" >UpdatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePhotoDto.html" data-type="entity-link" >UpdatePhotoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSeedDto.html" data-type="entity-link" >UpdateSeedDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriptionDto.html" data-type="entity-link" >UpdateSubscriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminAlbumService.html" data-type="entity-link" >AdminAlbumService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdminOrderService.html" data-type="entity-link" >AdminOrderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdminUserService.html" data-type="entity-link" >AdminUserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlbumAccessService.html" data-type="entity-link" >AlbumAccessService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlbumService.html" data-type="entity-link" >AlbumService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BuyerOrdersService.html" data-type="entity-link" >BuyerOrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeadService.html" data-type="entity-link" >LeadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MercadopagoService.html" data-type="entity-link" >MercadopagoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PasswordResetService.html" data-type="entity-link" >PasswordResetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymentService.html" data-type="entity-link" >PaymentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PhotographerOrdersService.html" data-type="entity-link" >PhotographerOrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PhotoService.html" data-type="entity-link" >PhotoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeedService.html" data-type="entity-link" >SeedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscriptionService.html" data-type="entity-link" >SubscriptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AdminAlbumSummaryDto.html" data-type="entity-link" >AdminAlbumSummaryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdminPhotographerByIdDto.html" data-type="entity-link" >AdminPhotographerByIdDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});