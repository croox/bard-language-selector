<?php

namespace Croox\LanguageSelector;

use Statamic\Providers\AddonServiceProvider;
use Statamic\Fieldtypes\Bard\Augmentor;
use Croox\LanguageSelector\Marks\Language;

class ServiceProvider extends AddonServiceProvider
{
    protected $scripts = [
        '/vendor/language-selector/js/language-selector.js'
    ];

    public function bootAddon()
    {
        // Register the mark renderer for front-end rendering
        Augmentor::addExtension('language', new Language);
    }
}
