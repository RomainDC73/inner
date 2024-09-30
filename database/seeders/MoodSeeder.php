<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mood;

class MoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $moods = ['good', 'meh', 'bad'];

        foreach ($moods as $mood) {
            Mood::firstOrCreate(['name' => $mood]);
        }
    }
}
