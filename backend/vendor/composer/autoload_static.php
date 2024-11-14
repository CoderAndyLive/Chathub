<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitd566f1a0ce4f6c3ed94836b84c438f34
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitd566f1a0ce4f6c3ed94836b84c438f34::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitd566f1a0ce4f6c3ed94836b84c438f34::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitd566f1a0ce4f6c3ed94836b84c438f34::$classMap;

        }, null, ClassLoader::class);
    }
}