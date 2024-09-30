<?php

namespace Database\Factories;

use App\Models\Mood;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    protected $model = Post::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array

    {
        $created_at = fake()->dateTimeBetween('-1 year');
        $description = fake()->paragraphs(3, true);
        return [
            'mood_id' => Mood::inRandomOrder()->first()->id,
            'description' => $description,
            'media_path' => $this->faker->imageUrl(),
            'audio_path' => $this->faker->Url(),
            'created_at' => $created_at,
            'updated_at' => $created_at,
            'user_id' => 1,
        ];
    }
}
