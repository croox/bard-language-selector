<?php

namespace Croox\LanguageSelector\Marks;

use Statamic\Fieldtypes\Bard\Augmentor;
use Tiptap\Core\Mark;

class Language extends Mark
{
    public static $name = 'language';

    public function renderHTML($mark, $attributes = [])
    {
        return [
            'span',
            ['lang' => $mark->attrs->lang ?? 'en'],
            0
        ];
    }
}
