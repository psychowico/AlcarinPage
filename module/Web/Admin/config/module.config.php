<?php
return array(
    'module_layouts' => array(
        'Admin' => 'admin-layout',
    ),

    'controllers' => array(
        'invokables' => array(
            'Admin\Controller\Home'  => 'Admin\Controller\AdminHomeController',

            'Admin\Controller\Users' => 'Admin\Controller\UsersController',
            'Admin\Controller\Translations\Translations' => 'Admin\Controller\Translations\TranslationsPanelController',
            'Admin\Controller\Translations\Def' => 'Admin\Controller\Translations\TranslationsDefinitionController',
            'Admin\Controller\Translations\Events'       => 'Admin\Controller\Translations\TranslationEventsController',

            'Admin\Controller\Users\Privilages' => 'Admin\Controller\Users\PrivilagesController',

            'Admin\Controller\Orbis\Orbis' => 'Admin\Controller\OrbisController',
            'Admin\Controller\Orbis\Map' => 'Admin\Controller\Orbis\OrbisMapController',
            'Admin\Controller\Orbis\Gateways' => 'Admin\Controller\Orbis\GatewaysController',
            'Admin\Controller\Orbis\Editor' => 'Admin\Controller\Orbis\EditorController',
        ),
    ),


    'service_manager' => array(
        'factories'    => array(
            'gateways-form' => 'Admin\Factory\GatewaysFormFactory'
        ),
    ),

    'view_helpers' => array(
        'invokables'   => array(
            'uri'          => 'Admin\View\Helper\Uri',
            'help'         => 'Admin\View\Helper\HelpButton',
        ),
    ),

    'game-modules' => array(
        'Admin' => array(
            'description'  => 'Administrative module',
            'game-objects' => array(
                'orbis' => 'Admin\GameObject\Orbis',
                'properties' => 'EngineBase\GameObject\Extension\WorldProperties',
                'translations' => 'Admin\GameObject\DynamicTranslations',
            ),
            'game-objects-ext' => array(
                'Admin\GameObject\DynamicTranslations' => array(
                    'def' => 'Admin\GameObject\Extension\DynamicTranslationsDefinitions',
                ),
                'Admin\GameObject\Extension\OrbisMinimap' => array(
                    'properties' => 'EngineBase\GameObject\Extension\WorldProperties',
                ),
                'Admin\GameObject\Extension\OrbisMap' => array(
                    'properties' => 'EngineBase\GameObject\Extension\WorldProperties',
                ),
                'Admin\GameObject\Orbis' => array(
                    'gateways' => 'Admin\GameObject\Extension\OrbisGateways',
                    'minimap'  => 'Admin\GameObject\Extension\OrbisMinimap',
                    'map'      => 'Admin\GameObject\Extension\OrbisMap',
                ),
                'EngineBase\GameObject\Player' => array(
                    'admin' => 'Admin\GameObject\Extension\PlayerAdmin'
                ),
                'Admin\GameObject\Extension\PlayerAdmin' => array(
                    'privilages' => 'Admin\GameObject\Extension\AdminPrivilages',
                ),
            ),
        ),
    ),

    'router' => array(
        'routes' => array(
            'admin' => array(
                'type'    => 'alcarin',
                'options' => array(
                    'route'    => '/admin',
                    'namespace'=> 'Admin\Controller',
                    'restmode' => true,
                    'defaults' => array(
                        'controller' => 'Home',
                    ),
                ),
            ),
            'orbis' => array(
                'type'    => 'alcarin',
                'options' => array(
                    'route'    => '/admin/orbis',
                    'namespace'=> 'Admin\Controller\Orbis',
                    'restmode' => true,
                    'defaults' => array(
                        'controller' => 'Orbis',
                    ),
                ),
            ),
            'translations' => array(
                'type'    => 'alcarin',
                'options' => array(
                    'route'    => '/admin/translations',
                    'namespace'=> 'Admin\Controller\Translations',
                    'restmode' => true,
                    'defaults' => array(
                        'controller' => 'translations',
                    ),
                ),
            ),
        ),
        /* declaring specific routes subfolders and corresponding namespaces */
        'namespaces' => array(
            'admin/subdefault' => array(
                'users' => 'Admin\Controller\Users',
                'orbis' => 'Admin\Controller\Orbis',
            ),
        ),
    ),

    'view_manager' => array(
        'template_map' => array(
            'admin-layout'           => __DIR__ . '/../view/layout/admin-layout.twig',
        ),
        'template_path_stack' => array(
            'admin' => __DIR__ . '/../view',
        ),
    ),
);
