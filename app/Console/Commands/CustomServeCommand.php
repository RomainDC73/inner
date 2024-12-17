<?php

namespace App\Console\Commands;

use Illuminate\Foundation\Console\ServeCommand;
use Symfony\Component\Console\Input\InputOption;

class CustomServeCommand extends ServeCommand
{
    protected function getOptions()
    {
        // Appliquez votre correction ici.
        return array_merge(parent::getOptions(), [
            ['portOffset', null, InputOption::VALUE_OPTIONAL, 'Adjust port offset'],
        ]);
    }
}
